import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchase-product.service";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse :HttpResponse = new HttpResponse()
  ) {}
  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts();
          if (data.length === 0){
            return this.httpResponse.NotFound(res, "The data does not to exist in database");            
          }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
          return this.httpResponse.Error(res, e)
      }
    }

  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id as string);
        if (!data) {
          return this.httpResponse.NotFound(res, "The data does not exist");
        }
          return this.httpResponse.Ok(res, data)
        } catch (e) {
          return this.httpResponse.Error(res, e)
      }
    }
      
  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body
      );
        return this.httpResponse.Ok(res, data)
        } catch (e) {
          console.error(e);
        return this.httpResponse.Forbidden(res, e)
      }
    }

  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.updatePurchaseProduct(id as string,req.body);
      if (!data.affected) {
          return this.httpResponse.NotFound(res, "There is an error updating the data");
        }
          return this.httpResponse.Ok(res, data);
        } catch (e) {
        console.error(e);
        return this.httpResponse.Error(res, e);
      }
    }  

  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.deletePurchaseProduct(id as string);
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