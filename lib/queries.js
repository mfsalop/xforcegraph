'use strict'

const connectDB = require ('./db')
const { ObjectId } = require ('mongodb')

module.exports = {
    
    getUsers: async () => {
            let db
            let users = []
            try {
                db = await connectDB()
                users = await db.collection('users').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return users
        },
        getUser: async (root, { id }) => {
            let db 
            let user
            try {
                db = await connectDB ()
                user = await db.collection('users').findOne({_id: ObjectId(id)})
            } catch (error) {
                console.error(error)
            }        
            return user
        }, 

        getProjects: async () => {
            let db
            let projects = []
            try {
                db = await connectDB()
                projects = await db.collection('projects').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return projects
        },
        
        getProject: async (root, { id }) => {
            let db 
            let project
            try {
                db = await connectDB ()
                project = await db.collection('projects').findOne({_id: ObjectId(id)})
            } catch (error) {
                console.error(error)
            }        
            return project
        },

        getProjectsByFilter: async ( root,{ leaderDocument}) => {
            let db;
            let projects = [];
            try{
                db = await connectDB();
                projects = await db.collection(projectsColletionName).find({documentoLider:leaderDocument}).toArray();
            }catch(error){
                errorHandler(error);
            }
            return projects;
        },
        
        getAvances: async () => {
            let db
            let avances = []
            try {
                db = await connectDB()
                avances = await db.collection('proyectos').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return avances
        },

        getUnicProject: async (root, { projectCode, projectName}) => {
            let db;
            let project;
            try{
                db = await connectDB();
                project = await db.collection(projectsColletionName).findOne({$or:[{codigoProyecto: projectCode}, {nombre: projectName}]});
            }catch(error){
                errorHandler(error);
            }
            return project;
        },

        getAvance: async (root, { id }) => {
            let db 
            let avance
            try {
                db = await connectDB ()
                avance = await db.collection('proyectos').findOne({_id: ObjectId(id)})
            } catch (error) {
                console.error(error)
            }        
            return avance
        },

        getInscriptions: async () => {
            let db
            let inscriptions = []
            try {
                db = await connectDB()
                inscriptions = await db.collection('inscription').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return inscriptions
        },

        getInscription: async (root, { id }) => {
            let db 
            let inscription
            try {
                db = await connectDB ()
                avance = await db.collection('inscription').findOne({_id: ObjectId(id)})
            } catch (error) {
                console.error(error)
            }        
            return inscription
        },

        getAdvanceUser: async (root, { UserID }) => {
            let db 
            let avance
            try {
                db = await connectDB ()
                avance = await db.collection('advances').findOne({_id: ObjectId(UserID)})
            } catch (error) {
                console.error(error)
            }        
            return avance
        }

    }