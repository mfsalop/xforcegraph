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
    }, 

    User: {
        inscriptionUser: async ({ inscriptionUser }) => {
            let db
            let inscriptionData
            let ids
            try{
                db = await connectDB()
                ids = inscriptionUser ? inscriptionUser.map(id => ObjectId(id)): [] 
                inscriptionData = ids.length > 0 
                ? await db.collection('inscriptions').find(
                    { _id: { $in: ids }}
                ).toArray()
                : []
            } catch (error){
                console.error(error)
            }
            return inscriptionData
        }
    }
}

