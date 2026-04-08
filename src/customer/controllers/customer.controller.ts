import {Request, Response} from "express"
import { CustomerService } from "../services/customer.service"
import { HttpResponse } from "../../shared/response/http.response"

export class CustomerController {

    constructor (
        private readonly customerService :CustomerService = new CustomerService(),
        private readonly httpResponse :HttpResponse = new HttpResponse() 
    ){}
    
    async getCustomer(req: Request, res: Response){
        try {
            const data = await this.customerService.findAllCustomer()
            if (data.length === 0){
                return this.httpResponse.NotFound(res, "The data does not to exist in database");            
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
    
    async getCustomerById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.findCustomerById(id as string)
            if (!data) {
                return this.httpResponse.NotFound(res, "The data does not exist");
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createCustomer(req: Request, res: Response){
        try {
            const data = await this.customerService.createCustomer(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            console.error(e);
            return this.httpResponse.Forbidden(res, e)
        }
    }

    async updateCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.updateCustomer(id as string, req.body)
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "There is an error updating the data");
                }
                return this.httpResponse.Ok(res, data);
            } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }  
        
    async deleteCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.deleteCustomer(id as string)
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

