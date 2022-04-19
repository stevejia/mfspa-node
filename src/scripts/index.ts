const curry = (fn: Function, ...args: Array<any>) => {
  console.log(args.length, fn.length);
  const curriedFunc = (...args2: Array<any>) => {
    const allArgs = args.concat(args2);
    return curry(fn, ...allArgs);
  };

  curriedFunc.end = () => {
    return fn(...args);
  };
  return curriedFunc;
};

const add = (...args: Array<any>) => {
  args = args || [];
  let sum: number | null = null;
  args.forEach((arg) => (sum += arg));
  console.log("sum", sum);
  return sum;
};

const addFn = curry(add);

console.log(addFn(3333, 4444)(444)(6666).end());
