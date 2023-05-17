import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import DemoCard from "../../components/demoCard";
import { BasicWithMui } from "../../demo/basic";
import TsCode from "../../components/tsCode";

const FieldPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        单一元素
      </Typography>

      <Typography paragraph>
        我们用Field指代单一元素，它是最小的数据源。往往绑定一个单独的受控组件，比如一个输入框，一个树形选择器。
      </Typography>

      <Typography paragraph>首先，我们创建一个FieldController作为数据源。</Typography>
      <Typography paragraph>
        兵无常势，水无常形。
        <b>
          你可以根据需要把FieldController放在任何一个可方便获取的位置,可以是组件外，{"<Context/>"}
          中，或者各种状态管理工具，但请避免重复创造实例。
        </b>{" "}
        本例中我们放在useRef里。
      </Typography>

      <TsCode>{'const controlRef = useRef(new FieldControl<string>(""));'}</TsCode>

      <br />

      <Typography paragraph>
        FieldControl接受两个参数，第一个参数是默认值，第二个参数是其他初始化配置。可以在<Link to="/">API</Link>
        中获取更多信息。接下来利用{"<Field/>"}订阅FieldController。
      </Typography>

      <TsCode>{"<Field control={controlRef.current}></Field>"}</TsCode>

      <br />

      <Typography paragraph>
        将FieldController传入{"<Field/>"}，{"<Field/>"}会在初始化时自动订阅FieldController的状态，同时在销毁时取消订阅。
      </Typography>

      <Typography paragraph>接下来，将{"<Field/>"}得到的数据传递给视图</Typography>

      <TsCode>
        {"<Field control={controlRef.current}>\n" +
          "    {({ value, setValue }) => {\n" +
          '        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n' +
          "    }}\n" +
          "</Field>"}
      </TsCode>

      <br />

      <Typography paragraph>
        {"<Field/>"}
        接受函数作为children，向下传递状态与控制状态的方法。本例将value传入给视图组件，并暴露setValue方法，提供修改value的能力。
        <b>如果使用者觉得这个函数有些啰嗦，开发团队期待你使用如HOC等任何的编程技巧简化代码。</b>
      </Typography>

      <br />

      <Typography paragraph>本例采用material-ui作为视图库。完整代码如下：</Typography>

      <DemoCard
        code={
          'import { useRef } from "react";\n' +
          'import { TextField } from "@material-ui/core";\n' +
          'import { Field, FieldControl } from "react-observable-form";' +
          "\n" +
          "\n" +
          "export const BasicWithMui = () => {\n" +
          '  const controlRef = useRef(new FieldControl<string>(""));\n' +
          "\n" +
          "  return (\n" +
          "    <Field control={controlRef.current}>\n" +
          "      {({ value, setValue }) => {\n" +
          '        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n' +
          "      }}\n" +
          "    </Field>\n" +
          "  );\n" +
          "};\n"
        }
        demo={<BasicWithMui />}
      />
    </div>
  );
};

export default FieldPage;
