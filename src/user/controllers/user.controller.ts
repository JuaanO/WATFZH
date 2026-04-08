import {Request, Response} from "express"
import { UserService } from "../services/user.service"
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {

    constructor (
        private readonly userService : UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}
    
    async getUsers(req: Request, res: Response){
        try {
            const data = await this.userService.findAllUser()
            if (data.length === 0){
                return this.httpResponse.NotFound(res, "The data does not to exist");
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
    
    async getUserById(req: Request, res: Response){
        const {id} = req.params
        try {
            const data = await this.userService.findUserById(id as string)
            if (!data) {
                return this.httpResponse.NotFound(res, "The data does not exist");
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async createUser(req: Request, res: Response){
        try {
            const data = await this.userService.createUser(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            console.error(e);
            return this.httpResponse.Forbidden(res, e)
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            const data: UpdateResult = await this.userService.updateUser(id as string,req.body);
        if (!data.affected) {
            return this.httpResponse.NotFound(res, "There is an error updating the data");
        }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }  

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.userService.deleteUser(id as string);
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

