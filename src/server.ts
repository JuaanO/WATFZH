import express = require("express");
import morgan = require("morgan");
import cors = require("cors");
import { UserRouter } from "./user/user.router";
import { CategoryRouter } from "./category/category.router";
import { ConfigServer } from "./config/config";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { PurchaseRouter } from "./purchase/purchase.router";
import { PurchaseProductRouter } from "./purchase/purchase-product.router";

class ServerBootstrap extends ConfigServer{

    public app: express.Application = express()
    private port: number = this.getNumberEnv('PORT')

    constructor ( ){
        super()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        
        this.dbConnect()

        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use('/api', this.routers())

        this.listen()
    }

    routers(): Array<express.Router>{
        return [
            new UserRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router, 
            new PurchaseRouter().router,
            new PurchaseProductRouter().router
    ];    }

    public listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server listening on port => ${this.port}`)
        })
    }
}

new ServerBootstrap()