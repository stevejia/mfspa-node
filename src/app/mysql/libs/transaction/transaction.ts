import Connection from "../connection/connection";

class Transaction extends Connection {
  //开启事务
  async begin(action: string, ...args: Array<any>) {
    // 开启事务前，先执行数据库连接
    console.log("开启事务前，连接数据库");
    const connection = await this.getConnection();
    console.log("数据库连接成功");
    this.connection = connection;
    try {
      const beginTransaction = this.promisify("beginTransaction", connection);
      console.log("开始执行事务", beginTransaction);

      await beginTransaction();
      console.log("开始执行数据库操作");
      const actionFunc = this.promisify(action, connection);
      const result = await actionFunc(...args);

      const commitFunc = this.promisify("commit", connection);

      await commitFunc();
      this.releaseConnection();
      return result;
    } catch (error) {
      const rollbackFunc = this.promisify("rollback", connection);
      await rollbackFunc();
      this.releaseConnection();
      throw error;
    }
  }

  /**
   * 事务终止
   */
  async end() {}

  /**
   * 事务提交
   */
  async commit() {}

  /**
   * 事务回滚
   */
  async rollback() {}
}

export default Transaction;
