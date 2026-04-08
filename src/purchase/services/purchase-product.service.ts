import { BaseService } from "../../config/base.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { ProductService } from "../../product/services/product.service";

export class PurchaseProductService extends BaseService <PurchaseProductEntity> {

    constructor (
        private readonly productService : ProductService = new ProductService()
    ){
        super(PurchaseProductEntity)
    }

    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOne({ where: {Id:id} });
    }

    async createPurchaseProduct(body: PurchaseProductEntity): Promise<PurchaseProductEntity> {
        const newProductPrice = (await this.execRepository).create(body)
        const prod = await this.productService.findProductById(newProductPrice.Id)
        newProductPrice.totalPrice = prod!.price * newProductPrice.quantityProduct
        return (await this.execRepository).save(newProductPrice);
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ Id:id});
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductEntity): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}