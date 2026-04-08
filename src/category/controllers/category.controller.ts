import {Request, Response} from "express"
import { CategoryService } from "../services/category.service"
import { HttpResponse } from "../../shared/response/http.response";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm/browser";

export class CategoryController {

    constructor (
        private readonly categoryService :CategoryService = new CategoryService(),
        private readonly httpResponse :HttpResponse = new HttpResponse()
    ){}
    
    async getCategories(req: Request, res: Response){
        try {
            const data = await this.categoryService.findAllCategories()
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "The requested data doesn't exist in database")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }    
    async getCategoryById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.categoryService.findCategoryById(id as string)
            if(!data){
                return this.httpResponse.NotFound(res, "The data doesn't exist in database")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }    
    async createCategory(req: Request, res: Response){
        try {
            const data = await this.categoryService.createCategory(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }    
    async updateCategory(req: Request, res: Response){
        const {id} = req.params
        try {
            const data :UpdateResult = await this.categoryService.updateCategory(id as string, req.body)
            if(!data.affected){
                return this.httpResponse.NotFound(res, "There is an error updating the data");
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
        
    async deleteCategory(req: Request, res: Response){
        const {id} = req.params
        try {
            const data :DeleteResult = await this.categoryService.deleteCategory(id as string)
            if(!data.affected){
                return this.httpResponse.NotFound(res, "There is an error deleting the data");                
            }
             return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

}

