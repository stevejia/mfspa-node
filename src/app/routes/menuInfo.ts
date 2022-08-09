import { Router } from "express";

import { menuInfoService } from "../services";
import MenuInfoModel from "../services/menuInfo/model";
import jsonResult from "./utils/result";
const url = require("url");
const router = Router();
router.get("/get", async (req, res) => {
  const menuList = await menuInfoService.queryMenuInfo();
  const treeNodes = getTreeNodes(menuList);
  res.send(jsonResult({ menuList, treeNodes }));
});

router.get("/getmenus", async (req, res) => {
  const menuList = await menuInfoService.queryMenus();
  res.send(jsonResult({ menuList }));
});

router.delete("/delete", async (req, res) => {
  let { query: MenuInfo } = url.parse(req.url, true);
  await menuInfoService.deleteMenuInfo(MenuInfo);
  res.send(jsonResult());
});

router.post("/update", async (req, res) => {
  // const { menuData } = req.body;
  const body = req.body;
  const params = {} as any;
  getParams(body, params);
  
  await menuInfoService.insertOrUpdate(params.menuData);
  res.send(jsonResult());
});

router.get("/getpages", async (req, res) => {
  const menuPages = await menuInfoService.queryMenuPages("menu_page");
  res.send(jsonResult({ menuPages }));
});

router.post("/updatepages", async (req, res) => {
  const body = req.body;
  const params = {} as any;
  getParams(body, params);
  console.log(params);
  await menuInfoService.insertOrUpdate(params.menuPages, "menu_page");
  res.send(jsonResult());
});

interface TreeNode {
  title?: string;
  icon?: string;
  key: number;
  children: TreeNode[];
  level: number;
  isLeaf?: boolean;
}

const getParams = (body: any, params: any) => {
  Object.keys(body).forEach((key) => {
    const keys = key.replace(/\[/g, ".[").split(".");
    let item = params;
    for (let i = 0; i < keys.length; i++) {
      const curKey = keys[i];
      const realCurKey = curKey.replace(/\[/g, "").replace(/\]/g, "");
      const nextKey = keys[i + 1];
      if (nextKey) {
        if (!item[realCurKey]) {
          if (nextKey.indexOf("[") > -1) {
            item[realCurKey] = [];
          } else {
            item[realCurKey] = {};
          }
        }
        item = item[realCurKey];
      } else {
        item[realCurKey] = body[key];
      }
    }
  });
};

const getTreeNodes = (menuList: MenuInfoModel[]) => {
  menuList = menuList.sort((a, b) => {
    const { priority: ap = 0, pId: am = 0 } = a;
    const { priority: bp = 0, pId: bm = 0 } = b;
    if (bm === am) {
      return bp - ap;
    }
    return bm - am;
  });
  const firstNodes = menuList.filter((menu) => !menu.pId);
  const treeNodes: TreeNode[] = [];
  _getTreeNodes(treeNodes, firstNodes, menuList, 1);
  return treeNodes;
};

const _getTreeNodes = (
  childNodes: TreeNode[],
  children: MenuInfoModel[],
  allNodes: MenuInfoModel[],
  level: number
): void => {
  children.forEach((menu) => {
    const node = {
      title: menu.menuName,
      key: menu.menuId,
      icon: menu.icon,
      children: [],
      level,
      isLeaf: level >= 2,
    };
    childNodes.push(node);
    console.log(level, menu.menuName);
    const children = allNodes.filter((an) => an.pId === node.key);
    _getTreeNodes(node.children, children, allNodes, node.level + 1);
  });
};

export default router;
