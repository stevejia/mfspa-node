class Promisify {
  promisifyFunMap: { [key: string]: Function } = {};
  promisify(funcName: string, context: any) {
    let promisifyFunc = this.promisifyFunMap[funcName];
    if (promisifyFunc) {
      return promisifyFunc;
    }
    const func = context[funcName];
    promisifyFunc = (...args: Array<any>) => {
      return new Promise((resolve, reject) => {
        args = args.concat(function (err: any, result: any) {
          console.log("异步函数执行完成", err, result);
          if (err) return reject(err);
          resolve(result);
        });
        console.log(args);
        func.apply(context, args);
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    };
    return promisifyFunc;
  }
}

export default Promisify;
