import { DeleteResult, UpdateResult} from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductEntity } from "../../product/entities/products.entity";
import { CustomerDTO } from "../dto/product.dto";

export class ProductService extends BaseService <ProductEntity>{

    constructor(){
        super(ProductEntity)
    }

    async findAllProducts():Promise <ProductEntity[]> {
        return (await this.execRepository).find()
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOne({ where: {Id:id} });
    }

    async createProduct(body :CustomerDTO):Promise <ProductEntity> {
        return (await this.execRepository).save(body)
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({Id: id });
    }

    async updateProduct(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
  }
}
