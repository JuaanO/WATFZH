import { IsNotEmpty } from "class-validator";
import { baseDTO } from "../../config/base.dto";
import { UserEntity } from "../../user/entities/user.entity";

export class CustomerDTO extends baseDTO {

    @IsNotEmpty()
    address!:string
    
    @IsNotEmpty()
    dni!:number
    
    @IsNotEmpty()
    user!:UserEntity
}