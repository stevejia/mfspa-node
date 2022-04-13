import Transaction from "../transaction/transaction";
import { isNullOrEmpty } from "../utils/utils";

class Mapper<T> extends Transaction {
  tableName: string;
  constructor(tableName: string) {
    super();
    this.tableName = tableName;
  }
  async query(queryString: string) {
    console.log(queryString);
    const result = await this.begin("query", queryString);
    console.log(result);
    return result;
  }
  async insert(item: T | Array<T>) {
    const insertItems = !(item instanceof Array) ? [item] : item;
    const insertQuery = this.getInsertQueryString(insertItems, this.tableName);
    console.log(insertQuery);
    const result = await this.begin("query", ...insertQuery);
    console.log(result);
  }

  getInsertQueryString(insertItems: Array<T>, tableName: string) {
    //获取属性名称
    let keys: string[] = [];
    let values: Array<Array<any>> = [];
    insertItems.map((item: T) => {
      keys = Object.keys(item);
      let itemValues = Object.values(item);
      // itemValues = itemValues?.map((iVal) => {
      //   return isNullOrEmpty(iVal) ? "null" : iVal;
      // });

      values.push(itemValues);
    });
    // const valuesStr = values
    //   .map((value: Array<any>) => `(${value.join(", ")})`)
    //   .join(", ");
    // const queryString = `insert into ${tableName}(${keys.join(
    //   ","
    // )}) values ${valuesStr} on duplicate key update ${keys
    //   .map((key) => `${key} = values(${key})`)
    //   .join(", ")} `;
    const queryString = `insert into ${tableName}(${keys.join(
      ","
    )}) values ? on duplicate key update ${keys
      .map((key) => `${key} = values(${key})`)
      .join(", ")} `;
    return [queryString, [values]];
  }

  async update() {}
  async delete() {}
}

interface ConditionalQueryModel {
  conditions: Array<ConditionalItem>;
  addCondition: (
    key: string,
    operator: Condition,
    ...value: Array<any>
  ) => void;
  getQueryString: (tableName: string) => string;
}

class ConditionalQuery implements ConditionalQueryModel {
  conditions: Array<ConditionalItem> = [];
  constructor(conditions?: Array<ConditionalItem>) {
    this.conditions = conditions || [];
  }

  addCondition(key: string, operator: Condition, ...value: Array<any>) {
    if (value.length > 1) {
      this.conditions.push(new ConditionalItem(key, operator, value));
    } else {
      const val = value?.[0];
      if (!isNullOrEmpty(val)) {
        this.conditions.push(new ConditionalItem(key, operator, value[0]));
      }
    }
  }

  getQueryString(tableName: string) {
    let queryStr = `select * from ${tableName}`;
    const conditionsArr: string[] = [];
    this.conditions.forEach((condition) => {
      conditionsArr.push(this.getConditionString(condition));
    });
    if (conditionsArr.length > 0) {
      queryStr += ` where ${conditionsArr.join("and")}`;
    }
    return queryStr;
  }
  private getConditionString(cond: ConditionalItem) {
    const { key, value, condition } = cond;
    switch (condition) {
      case Condition.Equals:
        return `${key} = ${value}`;
      case Condition.NotEquals:
        return `${key} != ${value}`;
      case Condition.GreaterThan:
        return `${key} > ${value}`;
      case Condition.GreaterThanOrEquals:
        return `${key} >= ${value}`;
      case Condition.LessThan:
        return `${key} < ${value}`;
      case Condition.LessThanOrEquals:
        return `${key} <= ${value}`;
      case Condition.Like:
        return `${key} like ${value}`;
      case Condition.NotLike:
        return `${key} not like ${value}`;
      case Condition.In:
        return `${key} in (${value})`;
      case Condition.NotIn:
        return `${key} not in (${value})`;
      case Condition.Between:
        return `${key} between ${value[0]} ${value[1]}`;
      case Condition.NotBetween:
        return `${key} not between ${value[0]} ${value[1]}`;
      case Condition.IsNull:
        return `${key} is null`;
      case Condition.IsNotNull:
        return `${key} is not null`;
      case Condition.IsEmpty:
        return `${key} is empty`;
      case Condition.IsNotEmpty:
        return `${key} is not empty`;
      default:
        return "";
    }
  }
}

export default Mapper;

class ConditionalItem {
  condition: Condition;
  key: string;
  value: any;

  constructor(key: string, condition: Condition, value: any) {
    this.condition = condition;
    this.key = key;
    this.value = value;
  }
}

enum Condition {
  Equals = 1,
  Contains = 2,
  Between = 3,
  GreaterThan = 4,
  LessThan = 5,
  GreaterThanOrEquals = 6,
  LessThanOrEquals = 7,
  In = 8,
  NotIn = 9,
  IsNull = 10,
  IsNotNull = 11,
  Like = 12,
  NotLike = 13,
  StartsWith = 14,
  EndsWith = 15,
  NotEquals = 16,
  NotContains = 17,
  NotBetween = 18,
  NotStartsWith = 19,
  NotEndsWith = 20,
  NotIsNull = 21,
  IsEmpty = 22,
  IsNotEmpty = 23,
}

export { ConditionalQuery, Condition };
