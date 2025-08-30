import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schemas";
import { getAllProducts, getProduct, incrementProductView } from "../services/product.service";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image";
import { getOneProductSchema } from "../schemas/get-one-product-schema";
import { getCategory } from "../services/category.service";

export const getProducts: RequestHandler = async (req, res) => {
  const parseResult = getProductSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "Params inválidos" });
    return;
  }

  const { metadata, orderBy, limit } = parseResult.data;
  const parselimit = limit ? parseInt(limit) : undefined;
  const parseMetadata = metadata ? JSON.parse(metadata) : undefined;

  const products = await getAllProducts({
    metadata: parseMetadata,
    orderBy: orderBy,
    limit: parselimit,
  });

  const productsWithAbsoluteUrl = products.map((product) => ({
    ...product,
    image: product.image ? getAbsoluteImageUrl(product.image) : null,
    liked: false, // TODO: Once have like funcionality, fetch this info.
  }));
  res.json({ error: null, products: productsWithAbsoluteUrl });
};

export const getOneProduct: RequestHandler = async (req, res) => {
  const paramsResult = getOneProductSchema.safeParse(req.params);
  if (!paramsResult.success) {
    res.status(400).json({ error: "Parâmetros inválidos" });
    return;
  }

  const { id } = paramsResult.data;
  // Getting product
  const product = await getProduct(parseInt(id));
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }
  const productWithAbsoluteImages = {
    ...product,
    images: product.images.map((img) => getAbsoluteImageUrl(img)),
  };

  // Getting category
  const category = await getCategory(product.categoryId);
  // Incrementing product views count
  await incrementProductView(product.id);

  res.json({ error: null, product: productWithAbsoluteImages, category });
};
