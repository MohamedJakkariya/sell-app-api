import Product from 'api/controllers/Product';
import Sell from 'api/controllers/Sell';
import Shop from 'api/controllers/Shop';
import { Router } from 'express';
const router = Router();

// Set instance of Product
const { createProduct, updateProduct, deleteProduct, fetchAllProducts } = new Product();
const { createShop, updateShop, updateShopAddress, deleteShopAddress, deleteShop } = new Shop();
const { createSell, updateSell, deleteSell, fetchAllSells } = new Sell();

/**
 * ==================================================================================
 *                          TO CREATE(INSERT) THE DATA TO THE TABLE
 * ==================================================================================
 */

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
 * @body : { "shopId", "description", "isPaid", "due", "amount", "productList" }
 */
router.post('/create/sell', createSell);

/**
 * ==================================================================================
 *                          TO FETCH THE DATA FROM THE TABLE
 * ==================================================================================
 */

/**
 * @type : GET
 * @access : -
 * @description : This route is used to get all the products of the shop
 * @requires: -
 * @params : shopId
 */
router.get('/fetch/products/:shopId', fetchAllProducts);

/**
 * @type : GET
 * @access : -
 * @description : This route is used to get all the sells of the shop
 * @requires: -
 * @params : shopId
 */
router.get('/fetch/sells/:shopId', fetchAllSells);

/**
 * ==================================================================================
 *                          TO UPDATE THE TABLE
 * ==================================================================================
 */

/**
 * @type : POST
 * @access : -
 * @description : This route is used to update the shop info
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *            "name"
 *      }
 *   }
 */
router.patch('/update', updateShop);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to update the shop address info
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *            "address",
 *            "country",
 *            "city",
 *            "postalCode",
 *            "isActive",
 *      }
 *   }
 */
router.patch('/update/address', updateShopAddress);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to update the sell informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "description",
 *          "isPaid",
 *          "amount",
 *          "due"
 *      }
 *   }
 */
router.patch('/update/sell', updateSell);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to update the product informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "name",
 *          "label",
 *          "labelColor",
 *          "amount",
 *          "remStock",
 *          "totalStock",
 *          "isActive"
 *      }
 *   }
 */
router.patch('/update/product', updateProduct);

/**
 * ==================================================================================
 *                          TO DELETE THE DATA FROM THE TABLE
 * ==================================================================================
 */

/**
 * @type : POST
 * @access : -
 * @description : This route is used to delete the shop informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "isActive"
 *      }
 *   }
 */
router.delete('/delete', deleteShop);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to delete the sell informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "isActive"
 *      }
 *   }
 */
router.delete('/delete/sell', deleteSell);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to delete the product informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "isActive"
 *      }
 *   }
 */
router.delete('/delete/product', deleteProduct);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to delete the shop address informations
 * @requires: -
 * @body : {
 *    "id",
 *     "updatingFields" : {
 *          "isActive"
 *      }
 *   }
 */
router.delete('/delete/address', deleteShopAddress);

export default router;
