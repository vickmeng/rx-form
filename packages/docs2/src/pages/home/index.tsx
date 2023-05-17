import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import GitHubIcon from "@material-ui/icons/GitHub";

import { BasicWithAntd, BasicWithMui } from "../../demo/basic";
import UseRxjsDemo from "../../demo/useRxjsDemo";
import flowImg from "../../assets/img/flow.png";
import reactImg from "../../assets/img/react.svg";
import rxImg from "../../assets/img/rx.png";

import "./index.less";

const Home = () => {
  return (
    <main className={"home"}>
      <div className={"banner"}>
        <img src={rxImg} className={"rxImg"} />
        <img src={reactImg} className={"reactImg"} />

        <nav>
          <div>
            <Link className="link" to="/quick-start">
              文档
            </Link>
            <a className="link" href="https://github.com/RxJS-CN" target="_blank" rel="noreferrer">
              RxJS 中文社区
            </a>
          </div>
          <div>
            <a href="https://github.com/vickmeng/react-observable-form">
              <GitHubIcon />
            </a>
          </div>
        </nav>

        <h1>React Observable Form</h1>
        <h2>可自由订阅状态变化的React响应式表单方案</h2>
        <div>
          <Link className="quick-start link" to="/quick-start">
            快速开始
          </Link>
        </div>
      </div>

      <section>
        <h2>自由订阅</h2>
        <p>随时随处订阅表单元素状态变化</p>
        <img src={flowImg} width={500} />
      </section>

      <section>
        <h2>RxJs</h2>
        <p>享受RxJs所有Operators</p>

        <div className="demo-wrapper">
          <div className="code">
            <SyntaxHighlighter language="javascript" style={atomOneLight}>
              {"valueChange\n" +
                ".pipe(debounceTime(500))\n" +
                ".subscribe((v) => {\n" +
                '  console.log("value change", v);\n' +
                "});"}
            </SyntaxHighlighter>
          </div>
          <div className="demo">
            <UseRxjsDemo />
          </div>
        </div>
      </section>

      <section>
        <h2>高性能</h2>
        <p>视图状态分离，精确渲染组件</p>
      </section>

      <section>
        <h2>友好集成</h2>
        <p>自由桥接流行的组件库</p>

        <div className="third">
          <div className="third--demo antd">
            <BasicWithAntd />
          </div>

          <div className="divide vertical" />

          <div className="third--demo mui">
            <BasicWithMui />
          </div>
        </div>
      </section>

      <footer>遵循 MIT 开源协议 &nbsp;&nbsp; Copyright © Rxjs-CN</footer>
    </main>
  );
};

export default Home;
