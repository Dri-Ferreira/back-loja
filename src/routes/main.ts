import { Router } from "express";
import * as bannerController from '../controllers/banner.controller';
import * as productController from '../controllers/products.controller';
import * as categorytController from '../controllers/category.controller';

export const routes = Router();

routes.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

routes.get('/banners', bannerController.getBanners);
routes.get('/products', productController.getProducts);
routes.get('/products/:id', productController.getOneProduct);
routes.get('/product/:id/related', productController.getRelatedProducts);

routes.get('/category/:slug/metadata', categorytController.getCategoryWithMetadata);