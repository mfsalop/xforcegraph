'use strict'

const connectDB = require ('./db')
const { ObjectId } = require ('mongodb')

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
            console.error (error)
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
            console.error (error)
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
            console.error (error)
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
            console.error (error)
        }
        return newProject
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
            console.error (error)
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
            console.error(error)
        }
        return project
    }
}