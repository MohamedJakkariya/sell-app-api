import { Router, Request, Response } from 'express';
const router = Router();

import chalk from 'chalk';
import Logger from 'js-logger';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import pool from '../../config';
import db from '../../db';

/**
 * @type : POST
 * @access : -
 * @description : This route is used to create product
 * @body : shopId, name, label, labelColor, amount, remStock, totalStock
 * @requires: @body
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    // get a pool connection
    const connection = await db.poolConnect(pool);

    try {
      // make your code here
    } finally {
      connection.release();
    }
  } catch (err) {
    // 500
    if (err.code)
      Logger.info(chalk`code : {red ${err.code}}\nmessage : {yellow ${err.sqlMessage}}\nsql : {green ${err.sql}}`);
    else Logger.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
