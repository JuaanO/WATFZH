import { IsNotEmpty } from "class-validator";
import { baseDTO } from "../../config/base.dto";

export class CategoryDTO extends baseDTO {

    @IsNotEmpty()
    categoryName!:string
}