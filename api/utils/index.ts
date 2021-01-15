import { Request, Response } from 'express';

import BadRequest from 'api/Errors/BadRequest';
import db from '../../db';
import Logger from 'js-logger';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import chalk from 'chalk';
import pool from 'config';

/**
 *
 * @param req : Express.Request
 * @param res : Express.Response
 * @param options : { tableName, fieldChecks, updatingFields, id }
 */
const updator = async (
  req: Request,
  res: Response,
  options: {
    tableName: string;
    fieldChecks: string[];
    updatingFields: {};
    id: number;
  }
) => {
  try {
    // get a pool connection
    const connection = await db.poolConnect(pool);

    try {
      //   Extract options
      const { tableName, fieldChecks, id, updatingFields } = options;

      //   Check basic validations
      if (!id || !updatingFields) throw new BadRequest('Missing Fields');

      // Allowed updating keys
      const checkKeys: string[] = fieldChecks;
      const existKeys = Object.getOwnPropertyNames(updatingFields);

      // Validate the each keys
      if (!existKeys.every(key => checkKeys.includes(key)) || isEmpty(updatingFields))
        throw new BadRequest('Invalid or empty keys are present in the updating fields');

      // Insert a single product into db
      await db.updateOne(connection, {
        table_name: tableName,
        updating_fields: `${Object.keys(updatingFields).join(' = ?,')} = ?`,
        updating_values: Object.values(updatingFields),
        key: 'id',
        value: id
      });

      // send response
      return res.status(200).json({
        result: true,
        message: `${tableName.slice(0, -1)} updated successfully`
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
 *
 * @param req : Express.Request
 * @param res : Express.Response
 * @param options : {
 *      tableName, id, projection
 *  }
 */
const fetchor = async (
  req: Request,
  res: Response,
  options: {
    tableName: string;
    id: number;
    projection: string;
  }
) => {
  try {
    // get a pool connection
    const connection = await db.poolConnect(pool);

    try {
      //   Extract options
      const { tableName, id, projection } = options;

      //   Check basic validations
      if (!id) throw new BadRequest('Missing Fields');

      // Fetch data from db
      const data = await db.getOne(connection, {
        table_name: tableName,
        projection,
        condition: 'isActive = 1 and shopId = ?',
        values: [id]
      });

      // send response
      return res.status(200).json({
        result: true,
        data
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
 * @desc to fastest way to detect empty object
 * @params an object
 */
const isEmpty = (obj: object) => {
  for (const _i in obj) return false;
  return true;
};

const _ = {
  updator,
  isEmpty,
  fetchor
};

export default _;
