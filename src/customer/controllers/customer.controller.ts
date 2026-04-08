import {Request, Response} from "express"
import { CustomerService } from "../services/customer.service"

export class CustomerController {

    constructor (private readonly customerService :CustomerService = new CustomerService()){}
    
    async getCustomer(req: Request, res: Response){
        try {
            const data = await this.customerService.findAllCustomer()
            res.status(200).json(data)
        } catch (e) {
            console.error(e);
        }
    }
    
    async getCustomerById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.findCustomerById(id as string)
            res.status(200).json(data)
        } catch (e) {
            console.error(e);
        }
    }

    async createCustomer(req: Request, res: Response){
        try {
            const data = await this.customerService.createCustomer(req.body)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }

    async updateCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.updateCustomer(id as string, req.body)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }
        
    async deleteCustomer(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.customerService.deleteCustomer(id as string)
            res.status(200).json(data)
            
        } catch (e) {
            console.error(e);
        }
    }

}

