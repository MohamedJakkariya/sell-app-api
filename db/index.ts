const Logger = require('js-logger');
/**
 * @format
 * @params : Options
 * @type :   Object
 * @desc :   Get all data from the given tables
 * @return : Promise
 */
exports.poolConnect = (pool: { getConnection: (arg0: (err: any, connection: any) => void) => void }) => {
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
exports.getAll = (
  connection: { query: (arg0: string, arg1: (err: any, results: any) => void) => void },
  options: { projections: any; table_names: any }
) => {
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
exports.getOne = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any, result: any) => void) => void },
  options: { projection: any; table_name: any; condition: any; values: any }
) => {
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
 * @desc :   Get all data from the given tables
 */
exports.insertOne = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any, results: any) => void) => void },
  options: { table_name: any; data: any }
) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${options.table_name} SET ?`, options.data, (err, results) => {
      if (err) return reject(err);

      Logger.log(`Inserted id ${results.insertId}!`);
      return resolve(results);
    });
  });
};

/**
 * @params : Options<Object>
 * @return : <Promise>
 * @desc :   Get all data from the given tables
 */
exports.deleteOne = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any, result: any) => void) => void },
  options: { table_name: any; condition: any; value: any }
) => {
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
exports.getMulti = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any, results: any) => void) => void },
  options: { projections: any; table_names: any; conditions: any; values: any }
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select ${options.projections}  from ${options.table_names} where ${options.conditions} 
    `,
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
exports.updateOne = (
  connection: { query: (arg0: string, arg1: any[], arg2: (err: any, results: any) => void) => void },
  options: { table_name: any; updating_fields: any; key: any; updating_values: any; value: any }
) => {
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
exports.foreignKeyMode = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any) => void) => void },
  mode: number
) => {
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
exports.rollback = (connection: { rollback: (arg0: () => never) => any }, err: any) =>
  connection.rollback(() => {
    throw err;
  });

/**
 * @desc :   Complete the transaction
 * @return : boolean or err stack
 */
exports.commit = (connection: { commit: (arg0: (err: any) => any) => void; rollback: (arg0: () => never) => any }) => {
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
exports.insertIntoMultiTables = (
  connection: { query: (arg0: string, arg1: any[], arg2: (err: any, results: any) => void) => void },
  options: any[]
) => {
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
exports.insertIntoMultiData = (
  connection: { query: (arg0: string, arg1: any, arg2: (err: any, results: any) => void) => void },
  options: { data: string | any[]; table_name: any }
) => {
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
