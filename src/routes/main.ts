import { Router } from "express";
import * as bannerController from '../controllers/banner_controller';
import * as productController from '../controllers/products_controller';

export const routes = Router();

routes.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

routes.get('/banners', bannerController.getBanners);
routes.get('/products', productController.getProducts);
routes.get('/products/:id', productController.getOneProduct);