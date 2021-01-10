// SQL error function
class SqlError extends Error {
  status: number;
  result: boolean;
  constructor(message: string) {
    super(message);

    this.name = 'Sql Error';
    this.status = 500;
    this.result = false;
  }
}

exports.throwSqlError = (msg: string) => {
  throw new SqlError(msg);
};
