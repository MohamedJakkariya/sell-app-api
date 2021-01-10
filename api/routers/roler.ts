import { Router } from 'express';
const router = Router();

/**
 * @type : POST
 * @access : owner
 * @requires: -
 * @body : email, password
 * @description : This route is used to login a owner.
 */
router.post('/login');

/**
 * @type : POST
 * @access : owner
 * @requires: -
 * @body : email, password, cPassword
 * @description : This route is used to create a owner.
 */
router.post('/register');

export default router;
