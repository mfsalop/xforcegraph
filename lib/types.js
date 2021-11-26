'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    Project: {
        advanceProject: async ({ advanceProject }) => {
            let db
            let advanceData
            let ids
            try{
                db = await connectDB()
                ids = advanceProject ? advanceProject.map(id => ObjectId(id)): [] 
                advanceData = ids.length > 0 
                ? await db.collection('advances').find(
                    { _id: { $in: ids }}
                ).toArray()
                : []
            } catch (error){
                console.error(error)
            }
            return advanceData
        }
    }
}





'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    Course: {
        people: async ({ people }) => {
            let db
            let peopleData
            let ids
            try{
                db = await connectDb()
                ids = people ? people.map(id => ObjectId(id)): [] 
                peopleData = ids.length > 0 
                ? await db.collection('students').find(
                    { _id: { $in: ids }}
                ).toArray()
                : []
            } catch (error){
                console.error(error)
            }
            return peopleData
        }
    }
}