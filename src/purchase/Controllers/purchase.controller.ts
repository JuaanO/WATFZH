import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse :HttpResponse = new HttpResponse()
  ) {}
  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchases();
          if (data.length === 0){
            return this.httpResponse.NotFound(res, "The data does not to exist in database");            
          }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
          return this.httpResponse.Error(res, e)
      }
    }

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id as string);
        if (!data) {
          return this.httpResponse.NotFound(res, "The data does not exist");
        }
          return this.httpResponse.Ok(res, data)
        } catch (e) {
          return this.httpResponse.Error(res, e)
      }
    }

  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
        return this.httpResponse.Ok(res, data)
        } catch (e) {
          console.error(e);
        return this.httpResponse.Forbidden(res, e)
      }
    }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.updatePurchase(id as string, req.body);
      if (!data.affected) {
          return this.httpResponse.NotFound(res, "There is an error updating the data");
        }
          return this.httpResponse.Ok(res, data);
        } catch (e) {
        console.error(e);
        return this.httpResponse.Error(res, e);
      }
    }  

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.deletePurchase(id as string);
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