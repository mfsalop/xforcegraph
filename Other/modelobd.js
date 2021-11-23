// NEW BEGINS
//usuarios

db.users.insertMany([
        {
                email:"psoto@udea.edu.co",
                contraseña:"ZCd3ljwpbVsi",
                documentId:"1000",
                documentType:"CID",
                nombre:"Pastora",
                apellido:"Soto",
                rol:"estudiante", //Admin, estudiante, lider
                estado: "autorizado", //autorizado,pendiente,no autorizado
                //codigoProyecto,rolProyecto,fechaIngreso,fechaEgreso    Preguntar al profesor
                //proyectos:[("ING0003",ISODate("2021-10-15"),ISODate("")),("ADM1020",ISODate(2021-10-15),ISODate(""))],
                inscripciones:[
                        {codigoProyecto:"ING0003",inscripcion:"aceptada",fechaIngreso:ISODate("2020-12-03"),fechaEgreso:("")},
                        {codigoProyecto:"ACA47",inscripcion:"rechazada",fechaIngreso:ISODate(""),fechaEgreso:("")}
                ]
        }])

db.proyectos.insertMany([
        {
                codigoProyecto:"ING0003",
                nombre:"Semillero de la vida eterna",
                objetivos:{
                        generales:"Activar los ciclos de regeneracion celular a demanda",
                        especificos:[
                                "Secuencia genetica para la activacion de la regeneracion celular",
                                "Generar un farmaco activador","Entregar los papers bajo licencia libre"
                        ]
                },
                Presupuesto:{
                        total:100000,
                        moneda:"COP",
                        gastado:41500,
                },
                fInicio:ISODate("2020-12-03"),
                fFinal:ISODate("2021-03-10"),
                estadoProyecto:"activo", //activo inactivo
                fase:"iniciado", //iniciado, en desarrollo, finalizado
                avances:{
                        fecha:ISODate(""),
                        descripcion:"",
                        LeadObserv:"",
                }
        }
])

db.roles.insertMany([
        {
                rol:"admin",
                gestionUsuarios:true,
                gestionProyecto:true,
                gestionMiembros:true,
                gestionPerfil:true
        },
        {
                rol:"lider",
                gestionUsuarios:false,
                gestionProyecto:true,
                gestionMiembros:true,
                gestionPerfil:true
        },
        {
                rol:"estudiante",
                gestionUsuarios:false,
                gestionProyecto:false,
                gestionMiembros:false,
                gestionPerfil:true
        }
])

db.estado.insertMany([
        {
                estadoUsuario:["autorizado","pendiente","no autorizado"],
                estadoRol:["admin","lider","estudiante"],
                fase:["iniciado","en desarrollo","finalizado"],
                estadoProyecto:["activo","inactivo"],
                estadoInscripcion:["aceptado","rechazado"]
        }
])