import Product from 'api/controllers/Product';
import Sell from 'api/controllers/Sell';
import Shop from 'api/controllers/Shop';
import { Router } from 'express';
const router = Router();

// Set instance of Product
const { createProduct } = new Product();
const { createShop } = new Shop();
const { createSell } = new Sell();

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create a shop
 * @requires: Bearer <token>
 * @body { "name", "address", "city", "country", "state", "postalCode" }
 */
router.post('/create', createShop);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create product
 * @requires: -
 * @body : { "shopId", "name", "label", "labelColor", "amount" }
 */
router.post('/create/product', createProduct);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create a sell on that shop
 * @requires: -
 * @body : { "shopId", "description", "isPaid", "due" }
 */
router.post('/create/sell', createSell);

export default router;
