import { Router } from "express";
import * as bannerController from '../controllers/banner.controller';
import * as productController from '../controllers/products.controller';
import * as categorytController from '../controllers/category.controller';
import * as cartController from '../controllers/cart.controller';
import * as userController from '../controllers/user.controller';


export const routes = Router();

routes.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

routes.get('/banners', bannerController.getBanners);
routes.get('/products', productController.getProducts);
routes.get('/products/:id', productController.getOneProduct);
routes.get('/product/:id/related', productController.getRelatedProducts);
routes.get('/category/:slug/metadata', categorytController.getCategoryWithMetadata);


routes.post('/cart/mount', cartController.cartMount);
routes.get('/cart/shipping', cartController.calculateShipping);
routes.post('/user/register',userController.registerUser);