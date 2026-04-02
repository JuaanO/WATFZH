import express = require("express");
import morgan = require("morgan");
import cors = require("cors");

class ServerBootstrap {

    public app: express.Application = express()
    private port: number = 9000

    constructor (){
        
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(morgan('dev'))
        this.app.use(cors())

        this.app.get('/api/hello', (req, res) =>{
            res.status(200).json({
                message: 'Hello World!!'
            })
        })
        this.listen()
    }

    public listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server listening on port => ${this.port}`)
        })
    }
}

new ServerBootstrap()