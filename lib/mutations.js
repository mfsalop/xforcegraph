'use strict'

const connectDB = require ('./db')
const { ObjectId } = require ('mongodb')
const errorHandler = require ('./errorHandler')

module.exports = {

    registerUser: async (root, {input}) => {
        const defaults = {
            estado: 'Pendiente',
        }
        const newUser = Object.assign(defaults, input)
        let db 
        let user 
        try {
            db = await connectDB()
            user = await db.collection('users').insertOne(input)
            input._id = user.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return newUser
    },

    editUserState: async (root, {_id, input}) => {
        let db 
        let user 
        try {
            db = await connectDB()
            await db.collection('users').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
            )
            user  = await db.collection('users').findOne (
                {_id: ObjectId(_id)}
            )
        } catch (error) {
            errorHandler(error)
        }
        return user
    },

    editUserInfo: async (root, {_id, input}) => {
        let db 
        let user 
        try {
            db = await connectDB()
            await db.collection('users').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
            )
            user  = await db.collection('users').findOne (
                {_id: ObjectId(_id)}
            )
        } catch (error) {
            errorHandler(error)
        }
        return user
    },

    registerProject: async (root, {input}) => {
        const defaults = {
            estadoProyecto: null,
            fase: 'Inactivo',
        }
        const newProject = Object.assign(defaults, input)
        let db 
        let project 
        try {
            db = await connectDB()
            project = await db.collection('projects').insertOne(input)
            input._id = project.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return newProject
    },

    editProject: async (root, {_id, input}) => {
        let db 
        let project 
        try {
            db = await connectDB()
            await db.collection('projects').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
            )
            project  = await db.collection('projects').findOne (
                {_id: ObjectId(_id)}
            )
        } catch (error) {
            errorHandler(error)
        }
        return project
    },

    inscriptionProject: async (root, {input}) => {
        const defaults = {
            inscripcionStatus: null,
            fechaIngreso: null,
            fechaEgreso: null
        }
        const newInscription = Object.assign(defaults, input)
        let db 
        let inscription 
        try {
            db = await connectDB()
            inscription = await db.collection('inscriptions').insertOne(input)
            input._id = inscription.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return newInscription
    },

    editInscriptionState: async (root, {_id, input}) => {
        let db 
        let inscription 
        try {
            db = await connectDB()
            await db.collection('inscriptions').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
            )
            inscription  = await db.collection('inscriptions').findOne (
                {_id: ObjectId(_id)}
            )
        } catch (error) {
            errorHandler(error)
        }
        return inscription
    },

    addInscriptiontoUser: async (root, { userID, inscriptionID }) => {
        let db
        let user
        let inscription

        try {
            db = await connectDB()
            user = await db.collection('users').findOne(
                { _id: ObjectId(userID) })
                
                inscription = await db.collection('inscriptions').findOne(
                    { _id: ObjectId(inscriptionID) })

            if (!user || !inscription) throw new Error('El proyecto o avance no existe')
            await db.collection('users').updateOne(
                { _id: ObjectId(userID) },
                { $addToSet: { inscriptionUser: ObjectId(inscriptionID) } }
            )
        } catch (error) {
            errorHandler(error)
        }
        return user
    },

    addAdvance: async (root, {input}) => {
       
        const newAdvance = Object.assign(input)
        let db 
        let advance 
        try {
            db = await connectDB()
            advance = await db.collection('advances').insertOne(input)
            input._id = advance.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return newAdvance
    },

    addAdvancetoProject: async (root, { projectID, advanceID }) => {
        let db
        let project
        let advance

        try {
            db = await connectDB()
            project = await db.collection('projects').findOne(
                { _id: ObjectId(projectID) })

            advance = await db.collection('advances').findOne(
                { _id: ObjectId(advanceID) })

            if (!project || !advance) throw new Error('El proyecto o avance no existe')
            await db.collection('projects').updateOne(
                { _id: ObjectId(projectID) },
                { $addToSet: { advanceProject: ObjectId(advanceID) } }
            )
        } catch (error) {
            errorHandler(error)
        }
        return project
    }
}