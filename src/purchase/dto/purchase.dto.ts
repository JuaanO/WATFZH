import { baseDTO } from "../../config/base.dto";
import { IsNotEmpty } from "class-validator";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class PurchaseDTO extends baseDTO {

    @IsNotEmpty()
    status!: string;

    @IsNotEmpty()
    paymentMethod!: string;

    @IsNotEmpty()
    customer!: CustomerEntity;
}