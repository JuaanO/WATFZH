import { IsNotEmpty, IsOptional } from "class-validator";
import { baseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../product/entities/products.entity";

export class PurchaseProductDTO extends baseDTO {
    @IsNotEmpty()
    quantityProduct!: number;

    @IsNotEmpty()
    totalPrice!: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}