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

    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input)
        let db 
        let course
        try {
            db = await connectDB()
            course = await db.collection('Courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }
        return newCourse
    },

    editCourse: async (root, {_id, input}) => {
        let db 
        let course 
        try {
            db = await connectDB()
            await db.collection('Courses').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
            )
            course = await db.collection('Courses').findOne (
                {_id: ObjectId(_id)}
            )
        } catch (error) {
            console.error (error)
        }
        return course
    }
}