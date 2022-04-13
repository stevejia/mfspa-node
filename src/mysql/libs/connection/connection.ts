import mysql from "mysql";
import Promisify from "../utils/promisify";
import connectionConfig from "./connectionConfig";

const pool = mysql.createPool(connectionConfig);

class Connection extends Promisify {
  connection: mysql.PoolConnection = null as any;
  // 开启事务前，先执行数据库连接
  async getConnection() {
    const getConn = this.promisify("getConnection", pool);

    return new Promise<mysql.PoolConnection>((resolve, reject) => {
      pool.getConnection((err: any, connection: mysql.PoolConnection) => {
        if (!!err) {
          reject(err);
          return;
        }
        this.connection = connection;
        resolve(connection);
      });
    });
  }
  // 释放连接池
  releaseConnection() {
    this.connection && this.connection.release();
  }
}

export default Connection;
