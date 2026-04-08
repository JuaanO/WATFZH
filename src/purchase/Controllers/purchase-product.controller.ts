import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchase-product.service";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService()
  ) {}
  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts();
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id as string);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body
      );
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.updatePurchaseProduct(id as string,req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.deletePurchaseProduct(id as string);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
}