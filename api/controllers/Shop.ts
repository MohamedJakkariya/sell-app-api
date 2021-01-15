import BadRequest from 'api/Errors/BadRequest';
import chalk from 'chalk';
import pool from 'config';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Logger from 'js-logger';
import { ICreateShop } from 'types/shopApi';
import db from '../../db';
import utils from '../utils';

export default class Shop {
  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  createShop = async (req: Request, res: Response) => {
    try {
      // get a pool connection
      const connection = await db.poolConnect(pool);

      try {
        // extract the body
        const { name, address, city, postalCode, state, country }: ICreateShop = req.body;

        // extract the user id
        const userId = req.body.id;

        // basic validations
        if (!name || !address || !city || !postalCode || !state || !country || !userId)
          throw new BadRequest('Missng Fields');

        // Insert a new shop
        const insertShopId = await db.insertOne(connection, {
          table_name: 'shops',
          data: {
            userId,
            name,
            isActive: 1
          }
        });

        // Insert shop address
        const insertShopAddressId = await db.insertOne(connection, {
          table_name: 'shopaddress',
          data: {
            shopId: insertShopId,
            address,
            city,
            state,
            country,
            postalCode
          }
        });

        // Send response
        return res.status(200).json({
          result: true,
          shopId: insertShopId,
          shopAddressId: insertShopAddressId,
          name,
          message: 'youre shop is cretaed successfully'
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
      else Logger.info(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  updateShop = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['name'],
      tableName: 'shops',
      id: req.body.id,
      updatingFields: req.body.updatingFields
    });
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  deleteShop = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['isActive'],
      tableName: 'shops',
      id: req.body.id,
      updatingFields: req.body.updatingFields
    });
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  updateShopAddress = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['address', 'city', 'state', 'country', 'postalCode'],
      tableName: 'shopaddress',
      id: req.body.id,
      updatingFields: req.body.updatingFields
    });
  };

  /**
   * @param req it's automatically passed my express
   * @param res it's automatically passed my express
   */
  deleteShopAddress = async (req: Request, res: Response) => {
    await utils.updator(req, res, {
      fieldChecks: ['isActive'],
      tableName: 'shopaddress',
      id: +req.body.id,
      updatingFields: req.body.updatingFields
    });
  };
}
