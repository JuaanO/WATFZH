import {Request, Response} from "express"
import { ProductService } from "../services/product.service"
import { HttpResponse } from "../../shared/response/http.response";

export class ProductController {

    constructor (
        private readonly productService :ProductService = new ProductService(),
        private readonly httpResponse :HttpResponse = new HttpResponse()
    ){}
    
    async getProduct(req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts()
            if (data.length === 0){
                return this.httpResponse.NotFound(res, "The data does not to exist in database");            
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
    
    async getProductById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.findProductById(id as string)
            if (!data) {
                return this.httpResponse.NotFound(res, "The data does not exist");
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createProduct(req: Request, res: Response){
        try {
            const data = await this.productService.createProduct(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            console.error(e);
            return this.httpResponse.Forbidden(res, e)
        }
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.updateProduct(id as string, req.body)
            if (!data.affected) {
                    return this.httpResponse.NotFound(res, "There is an error updating the data");
                }
                return this.httpResponse.Ok(res, data);
            } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }  
        
    async deleteProduct(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.productService.deleteProduct(id as string)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "There is an error deleting the data");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}

