import {Request, Response} from "express"
import { ProductService } from "../services/product.service"

export class ProductController {

    constructor (private readonly productService :ProductService = new ProductService()){}
    
    async getProduct(req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts()
            res.status(200).json(data)
        } catch (e) {
            console.error(e);
        }
    }
    
    async getProductById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.findProductById(id as string)
            res.status(200).json(data)
        } catch (e) {
            console.error(e);
        }
    }

    async createProduct(req: Request, res: Response){
        try {
            const data = await this.productService.createProduct(req.body)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.updateProduct(id as string, req.body)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }
        
    async deleteProduct(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.deleteProduct(id as string)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }

}

