import Product from 'api/controllers/Product';
import Shop from 'api/controllers/Shop';
import { Router } from 'express';
const router = Router();

// Set instance of Product
const { createProduct } = new Product();
const { createShop } = new Shop();

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create a shop
 * @requires: Bearer <token>
 * @body {
 *    "name": "",
 *    "address": "",
 *    "city": "",
 *    "country": "",
 *    "state": "",
 *    "postalCode": ""
 * }
 */
router.post('/create', createShop);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create product
 * @requires: -
 * @body : shopId, name, label, labelColor, amount
 */
router.post('/create/product', createProduct);

export default router;
