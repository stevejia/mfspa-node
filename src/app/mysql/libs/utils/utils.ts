/**
 * 判断对象是否为空或者空字符串
 * @param emptyLike 要校验的对象
 * @returns boolean
 */
export const isNullOrEmpty = (emptyLike: any) => {
  if (emptyLike === undefined) {
    return true;
  }
  if (emptyLike === null) {
    return true;
  }

  if (typeof emptyLike === "string" && !emptyLike) {
    return true;
  }
  return false;
};
