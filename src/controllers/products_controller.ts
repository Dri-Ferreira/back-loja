import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schemas";
import { getAllProducts } from "../services/product_service";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image";

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

  const productsWithAbsoluteUrl = products.map(product => ({
    ...product,
    image: product.image ? getAbsoluteImageUrl(product.image) : null,
    liked: false, // TODO: Once have like funcionality, fetch this info.
  }));
  res.json({ error: null, products: productsWithAbsoluteUrl });
};
