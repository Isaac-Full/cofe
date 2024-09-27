import express, {json} from 'express'
import dbConnection from '../config/database.js'
import 'dotenv/config'
import cafeRoutes from '../ROUTES/cafeRoutes.js'


class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnection()
        this.pathCafe = '/api/Ventas'
        this.route()

    }

    async dbConnection(){
        await dbConnection()
    }

    route(){
    this.app.use(json())  //esto hace que se reconozca en el postman que es json 
    this.app.use(this.pathCafe, cafeRoutes)
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor conectado papi :3 ${process.env.PORT}`)
        })
    }
}


export default Server