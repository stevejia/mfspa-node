const jsonResult = (
  data: any = null,
  errMsg: string | null | undefined = null,
  errCode: number = 0
) => {
  return {
    data,
    errMsg,
    errCode,
  };
};

export default jsonResult;
