import { Request, Response } from 'express';
import chalk from 'chalk';
import Logger from 'js-logger';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import pool from '../../config';
import db from '../../db';
import { ICreateSell } from 'types/shopApi';

import BadRequest from 'api/Errors/BadRequest';
import { nanoid } from 'nanoid';
import utils from '../utils';

export default class Sell {
  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  createSell = async (req: Request, res: Response) => {
    try {
      // get a pool connection
      const connection = await db.poolConnect(pool);

      try {
        // extract the body of payload
        const { shopId, description, due, amount, isPaid, productList }: ICreateSell = req.body;

        //   Check basic validations
        if (!shopId || !isPaid || !productList || !amount) throw new BadRequest('Missing Fields');

        productList.map(product => {
          if (!product.productId) throw new BadRequest('Missing product id');
        });

        const sellSkusId = nanoid(4).toLowerCase();

        // Insert a sell into db
        const sell = await db.insertOne(connection, {
          table_name: 'sells',
          data: {
            shopId: +shopId,
            skus: sellSkusId,
            description,
            amount: +amount,
            isPaid: +isPaid,
            due: due ? +due : null
          }
        });

        await db.insertIntoMultiData(connection, {
          table_name: 'sellproductlist',
          data: productList
        });

        // send response
        return res.status(200).json({
          result: true,
          message: 'sell added successfully',
          sellId: sell.insertId,
          skus: sellSkusId
        });
      } finally {
        connection.release();
      }
    } catch (err) {
      // 400
      if (err instanceof BadRequest)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ result: false, error: getReasonPhrase(StatusCodes.BAD_REQUEST), message: err.message });

      // 500
      if (err.code)
        Logger.info(chalk`code : {red ${err.code}}\nmessage : {yellow ${err.sqlMessage}}\nsql : {green ${err.sql}}`);
      else Logger.error(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  updateSell = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['description', 'isPaid', 'amount', 'due'],
      tableName: 'sells',
      id: req.body.id,
      updatingFields: req.body.updatingFields
    });
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  deleteSell = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['isActive'],
      tableName: 'sells',
      id: req.body.id,
      updatingFields: req.body.updatingFields
    });
  };
}
