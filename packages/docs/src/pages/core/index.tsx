import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Core = () => {
  return (
    <div className="page">
      <Typography paragraph variant={"h2"}>
        核心概念
      </Typography>

      <Typography paragraph>react-observable-form主要包含两个概念：Controller与Component。</Typography>

      <Typography paragraph variant={"h4"}>
        Controllers
      </Typography>

      <Typography paragraph>
        Controller是数据的源头，它为视图提供一系列可观察对象，以及操作数据的方法，使用者可以通过订阅这些可观察对象获得如：value，errors等状态。
      </Typography>

      <Typography paragraph>我们有如下三种class创建Controller：</Typography>

      <Typography paragraph>
        <ul>
          <li>FieldControl：用以创建单一元素的控制器</li>
          <li>GroupControl：用以创建群组元素的控制器</li>
          <li>ListControl：用以创建列表元素的控制器</li>
        </ul>
      </Typography>

      <Typography paragraph variant={"h4"}>
        Components
      </Typography>

      <Typography paragraph>
        就是React组件，作为Controller的订阅者，可以获取其订阅的Controller的值向下传递，也提供方法让下级组件将状态上传，从而实现受控组件。
      </Typography>

      <Typography paragraph>我们有如下三种Components：</Typography>

      <Typography paragraph>
        <ul>
          <li> {"<Field/>"}：FieldControl的订阅器</li>
          <li> {"<Group/>"}：GroupControl的订阅器</li>
          <li> {"<List/>"}：ListControl的订阅器</li>
        </ul>
      </Typography>

      <br />

      <Typography paragraph>
        可以查看<Link to={"/field"}>基础使用</Link>更直观得进行学习
      </Typography>
    </div>
  );
};

export default Core;
