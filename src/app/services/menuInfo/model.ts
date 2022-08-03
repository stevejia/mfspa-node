interface MenuInfoModel {
  menuId: number;
  menuName?: string;
  icon?: string;
  remark: string;
  pId?: number;
  pName?: string;
}

interface MenuPageModel {
  menuPageId: number;
  pageName: string;
  remark: string;
  menuId: number;
  pageId: number;
  pageUrl: string;
}

export default MenuInfoModel;
export { MenuPageModel };
