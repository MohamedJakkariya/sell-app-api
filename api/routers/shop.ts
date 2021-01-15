import Product from 'api/controllers/Product';
import Sell from 'api/controllers/Sell';
import Shop from 'api/controllers/Shop';
import { Router } from 'express';
const router = Router();

// Set instance of Product
const { createProduct, updateProduct, deleteProduct } = new Product();
const { createShop, updateShop, updateShopAddress, deleteShopAddress, deleteShop } = new Shop();
const { createSell, updateSell, deleteSell } = new Sell();

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
router.post('/update', updateShop);

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
router.post('/update/address', updateShopAddress);

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
router.post('/update/sell', updateSell);

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
router.post('/update/product', updateProduct);

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
router.post('/delete', deleteShop);

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
router.post('/delete/sell', deleteSell);

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
router.post('/delete/product', deleteProduct);

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
router.post('/delete/address', deleteShopAddress);

export default router;
