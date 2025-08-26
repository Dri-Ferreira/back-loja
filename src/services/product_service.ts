import { prisma } from "../libs/prisma"; // Adjust the path if your prisma client is elsewhere

type ProductFilters = {
  metadata?: { [key: string]: string };
  orderBy?: string;
  limit?: number;
};

export const getAllProducts = async (filters: ProductFilters) => {
  // Organize ORDER
  let orderBy = {};
  switch (filters.orderBy) {
    case "views":
    default:
      orderBy = { viewsCount: "desc" };
      break;
    case "selling":
      orderBy = { salesCount: "desc" };
      break;
    case "price":
      orderBy = { price: "asc" };
      break;
  }

  // Organize Metadata
  let where: any = {};
  if(filters.metadata && typeof filters.metadata === 'object') {
    let metaFilters = [];
    for(let categoryMetadataId in filters.metadata) {
      const value = filters.metadata[categoryMetadataId];
      if( typeof value !== 'string' ) continue;
      const valuesIds = value.split('|').map(v => v.trim()).filter(Boolean);
      if(valuesIds.length === 0) continue;
      metaFilters.push({
        metadata: {
          some: {
            categoryMetadataId,
            metadataValueId:{ in: valuesIds}
          }
        }
      })
    }  
    if(metaFilters.length > 0) {
      where.AND = metaFilters;
    }
  }

  const product = await prisma.product.findMany({
    select: {
      id: true,
      label: true,
      price: true,
      images: {
        take: 1,
        orderBy: { id: "asc" },
      },
    },
    where,
    orderBy,
    take: filters.limit ?? undefined,
  });
  return product.map((product) => ({
    ...product,
    image: product.images[0]
      ? `media/products/${product.images[0].imageUrl}`
      : null,
    images: undefined,
  }));
};
