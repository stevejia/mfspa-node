import PageInfoModel from "../pageInfo/model";

interface GroupInfoModel {
  groupId?: number | null;
  groupName?: string;
  remark?: string;
  pageCount?: number;
}

export default GroupInfoModel;
