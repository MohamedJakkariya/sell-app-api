import Product from 'api/controllers/Product';
import { Router } from 'express';
const router = Router();

// Set instance of Product
const { createProduct } = new Product();

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create a shop
 * @body : name
 * @requires: Bearer <token>
 */
router.post('/create');

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create product
 * @body : shopId, name, label, labelColor, amount
 * @requires: @body
 */
router.post('/create/product', createProduct);

export default router;
