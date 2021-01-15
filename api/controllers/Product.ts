import { Request, Response } from 'express';
import chalk from 'chalk';
import Logger from 'js-logger';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import pool from '../../config';
import db from '../../db';
import { ICreateProductItem } from 'types/shopApi';

import BadRequest from 'api/Errors/BadRequest';

export default class Product {
  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  createProduct = async (req: Request, res: Response) => {
    try {
      // get a pool connection
      const connection = await db.poolConnect(pool);

      try {
        // extract the body of payload
        const { shopId, name, label, labelColor, amount }: ICreateProductItem = req.body;

        //   Check basic validations
        if (!shopId || !name || !label || !amount) throw new BadRequest('Missing Fields');

        // Insert a single product into db
        await db.insertOne(connection, {
          table_name: 'products',
          data: {
            shopId: +shopId,
            name,
            label,
            labelColor,
            amount: +amount
          }
        });

        // send response
        return res.status(200).json({
          result: true,
          message: 'product added successfully'
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
  updateProduct = async (req: Request, res: Response) => {
    try {
      // get a pool connection
      const connection = await db.poolConnect(pool);

      try {
        // extract the body of payload
        const { shopId, name, label, labelColor, amount }: IUpdateProductItem = req.body;

        //   Check basic validations
        if (!shopId || !name || !label || !amount) throw new BadRequest('Missing Fields');

        // Insert a single product into db
        await db.insertOne(connection, {
          table_name: 'products',
          data: {
            shopId: +shopId,
            name,
            label,
            labelColor,
            amount: +amount
          }
        });

        // send response
        return res.status(200).json({
          result: true,
          message: 'product added successfully'
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
}
