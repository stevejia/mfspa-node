interface AppInfoModel {
  appId?: number | null;
  appName?: string;
  appVersion?: string;
  createTime?: any;
  currentUsed?: 0 | 1;
  url?: string;
}

export default AppInfoModel;
