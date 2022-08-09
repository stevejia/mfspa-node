interface MenuInfoModel {
  menuId: number;
  menuName?: string;
  icon?: string;
  remark: string;
  pId?: number;
  pName?: string;
  priority?: number;
}

interface MenuPageModel {
  menuPageId: number;
  pageName: string;
  remark: string;
  menuId: number;
  pageId: number;
  pageUrl: string;
  checked: boolean;
  isDefault: boolean;
}

export default MenuInfoModel;
export { MenuPageModel };
