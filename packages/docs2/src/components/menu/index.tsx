import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import "./index.less";

interface IRoute {
  text: string;
  link: string;
}

interface ISubMenu {
  title: string;
  routes: IRoute[];
}

const BASIC: ISubMenu = {
  title: "基础使用",
  routes: [
    {
      text: "单一元素",
      link: "/field",
    },
    {
      text: "群组",
      link: "/group",
    },
    {
      text: "列表",
      link: "/list",
    },
    {
      text: "校验",
      link: "/validate",
    },
  ],
};

const ADVANCE: ISubMenu = {
  title: "高级使用",
  routes: [
    {
      text: "订阅变化",
      link: "/subscribe",
    },
    {
      text: "动态表单",
      link: "/dynamic",
    },
    {
      text: "联合校验",
      link: "/uniteValidate",
    },
    {
      text: "复杂嵌套",
      link: "/nest",
    },
    {
      text: "异步校验",
      link: "/asyncValidate",
    },
    {
      text: "与Rxjs",
      link: "/useRx",
    },
  ],
};

const API: ISubMenu = {
  title: "API",
  routes: [
    {
      text: "<Field/>",
      link: "fieldApi",
    },
    {
      text: "<Group/>",
      link: "groupApi",
    },
    {
      text: "<List/>",
      link: "listApi",
    },
    {
      text: "<Error/>",
      link: "errorApi",
    },
    {
      text: "FieldControl",
      link: "fieldControlApi",
    },
    {
      text: "GroupControl",
      link: "groupControlApi",
    },
    {
      text: "ListControl",
      link: "listControlApi",
    },
  ],
};

const SubMenu = ({ menu }: { menu: ISubMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={menu.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={"submenu--list"}>
          {menu.routes.map((route) => {
            return (
              <Link to={route.link} key={route.text}>
                <ListItem button className={"nested"}>
                  <ListItemText primary={route.text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

const Menu = () => {
  return (
    <aside className={"menu"}>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <Link to="/">
          <ListItem button>
            <ListItemText primary="首页" />
          </ListItem>
        </Link>
        <Link to="/quick-start">
          <ListItem button>
            <ListItemText primary="快速开始" />
          </ListItem>
        </Link>

        <Link to="/core">
          <ListItem button>
            <ListItemText primary="核心概念" />
          </ListItem>
        </Link>

        <SubMenu menu={BASIC} />
        <SubMenu menu={ADVANCE} />
        <SubMenu menu={API} />

        <Link to="/resources">
          <ListItem button>
            <ListItemText primary="更多选择" />
          </ListItem>
        </Link>
      </List>
    </aside>
  );
};

export default Menu;
