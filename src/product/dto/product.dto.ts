import { IsNotEmpty } from "class-validator";
import { baseDTO } from "../../config/base.dto";
import { CategoryEntity } from "../../category/entities/categories.entity";

export class CustomerDTO extends baseDTO {

    @IsNotEmpty()
    productName!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    category!: CategoryEntity;
}