import Logger from 'js-logger';
import mysql from 'mysql';

/**
 * @format
 * @params : Options
 * @type :   Object
 * @desc :   Get all data from the given tables
 * @return : Promise
 */
const poolConnect = (pool: mysql.Pool): Promise<mysql.PoolConnection> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err); // not connected!

      return resolve(connection);
    });
  });
};

/**
 * @params : Options<object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const getAll = (
  connection: mysql.PoolConnection,
  options: { projections: string; table_names: string }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT ${options.projections} FROM ${options.table_names}`, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const getOne = (
  connection: mysql.PoolConnection,
  options: { projection: string; table_name: string; condition: string; values: [] | number | string }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${options.projection} FROM ${options.table_name} WHERE ${options.condition}`,
      options.values,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Insert a data to the table and returned the insertedId
 */
const insertOne = (
  connection: mysql.PoolConnection,
  options: { table_name: string; data: object }
): Promise<{ insertId: number }> => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${options.table_name} SET ?`, options.data, (err, results) => {
      if (err) return reject(err);

      Logger.log(`Inserted id ${results.insertId}!`);
      return resolve(results.insertId);
    });
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const deleteOne = (
  connection: mysql.PoolConnection,
  options: { table_name: string; condition: string; value: [] | number | string }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${options.table_name} WHERE ${options.condition}`, options.value, (err, result) => {
      if (err) return reject(err);

      Logger.log('Deleted successfully!');
      return resolve(result);
    });
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const getMulti = (
  connection: mysql.PoolConnection,
  options: { projections: string; table_names: string; conditions: string; values: [] | number | string }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select ${options.projections}  from ${options.table_names} where ${options.conditions}`,
      options.values,
      (err, results) => {
        if (err) return reject(err);

        return resolve(results);
      }
    );
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const updateOne = (
  connection: mysql.PoolConnection,
  options: {
    table_name: string;
    updating_fields: string;
    key: string;
    updating_values: (string | number | boolean | undefined)[];
    value: (number | string)[] | number | string;
  }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${options.table_name} SET ${options.updating_fields} WHERE ${options.key} = ?`,
      [...options.updating_values, options.value],
      (err, results) => {
        if (err) return reject(err);

        Logger.log(`Updated successfully - affected rows - ${results.affectedRows}`);
        return resolve(results);
      }
    );
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
const foreignKeyMode = (connection: mysql.PoolConnection, mode: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connection.query(`SET FOREIGN_KEY_CHECKS = ?`, mode, err => {
      if (err) return reject(err);

      Logger.info(mode === 0 ? 'Foreign key Disabled' : 'Foreign key Enabled');
      return resolve(true);
    });
  });
};

/**
 * @params : err<string>
 * @return : Error<stack>
 * @desc :   Return err depends on call back
 */
const rollback = (connection: mysql.PoolConnection, err: any) =>
  connection.rollback(() => {
    throw err;
  });

/**
 * @desc :   Complete the transaction
 * @return : boolean or err stack
 */
const commit = (connection: mysql.PoolConnection) => {
  connection.commit(err => {
    if (err)
      return connection.rollback(() => {
        throw err;
      });

    Logger.info('Transaction complete!');
    return true;
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Insert data into multiple tables
 */
const insertIntoMultiTables = (connection: mysql.PoolConnection, options: any[]): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    const baseQ = `INSERT INTO ? SET ? ; `;

    let genQ = baseQ.repeat(options.length);

    const data: any[] = [];

    // make our query with data array
    options.forEach(v => {
      genQ = genQ.replace('INSERT INTO ?', `INSERT INTO ${v.table_name}`);
      data.push(v.data);
    });

    // Make an multiple query at a time
    connection.query(`${genQ}`, data, (err, results) => {
      if (err) return reject(err);

      Logger.log(`Inserted id ${results.insertId}!`);
      return resolve(results);
    });
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Insert multiple data into same tables
 */
const insertIntoMultiData = (
  connection: mysql.PoolConnection,
  options: { data: {}[]; table_name: string }
): Promise<mysql.Query> => {
  return new Promise((resolve, reject) => {
    const baseQ = `INSERT INTO SET ? ; `;

    let genQ = baseQ.repeat(options.data.length);

    // genQ = replaceAll(genQ, 'INSERT INTO ?', `INSERT INTO ${options.table_name}`);
    genQ = genQ.replace(/INSERT INTO/g, `INSERT INTO ${options.table_name}`);
    // Make an multiple query at a time
    connection.query(`${genQ}`, options.data, (err, results) => {
      if (err) return reject(err);

      results.forEach((i: { insertId: any }) => Logger.log(`Inserted id ${i.insertId}!`));
      return resolve(results);
    });
  });
};

const _ = {
  poolConnect,
  getOne,
  getAll,
  insertOne,
  insertIntoMultiData,
  insertIntoMultiTables,
  deleteOne,
  getMulti,
  rollback,
  commit,
  foreignKeyMode,
  updateOne
};

export default _;
