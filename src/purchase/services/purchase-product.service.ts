import { BaseService } from "../../config/base.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";

export class PurchaseProductService extends BaseService <PurchaseProductEntity> {

    constructor (){
        super(PurchaseProductEntity)
    }

    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOne({ where: {Id:id} });
    }

    async createPurchaseProduct(body: PurchaseProductEntity): Promise<PurchaseProductEntity> {
        return (await this.execRepository).save(body);
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ Id:id});
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductEntity): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}