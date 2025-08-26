
import { RequestHandler } from 'express';
import { getAllBanners } from '../services/banner_services';
import { getAbsoluteImageUrl } from '../utils/get-absolute-image';

 export const getBanners: RequestHandler = async (req, res) => {
    const banners = await getAllBanners();
    const bannersWithAbsoluteUrl = banners.map(banner => ({
        ...banner,
        image: getAbsoluteImageUrl(banner.image)
    }));
	res.json({error: null, banners: bannersWithAbsoluteUrl});
 }