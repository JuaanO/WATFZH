import { IsEmpty, IsNotEmpty } from "class-validator";
import { baseDTO } from "../../config/base.dto";

export class UserDTO extends baseDTO {

    @IsNotEmpty()
    username!: string

    @IsNotEmpty()
    name!: string

    @IsNotEmpty()
    lastname!: string

    @IsNotEmpty()
    jobPosition?: string

    @IsNotEmpty()
    numberPhone!: number

    @IsNotEmpty()
    city!: string

    @IsNotEmpty()
    province!: string 
    
    @IsEmpty()
    email!: string

    @IsNotEmpty()
    password!: string

}