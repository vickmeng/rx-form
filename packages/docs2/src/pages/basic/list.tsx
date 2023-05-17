import { Typography } from "@material-ui/core";
import React from "react";

import DemoCard from "../../components/demoCard";
import ListDemo from "../../demo/listDemo";

const ListPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        列表
      </Typography>

      <Typography paragraph>
        我们用List指代列表，与Group的用法很接近，它是由index为key，以其他controller为value组成的数组型数据源。
      </Typography>

      <Typography paragraph>我们直接用一个例子进行描述：</Typography>

      <DemoCard
        demo={<ListDemo />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { Avatar, Button, TextField } from "@material-ui/core";\n' +
          'import { Field,ListControl,List } from "react-observable-form";\n' +
          'import "./index.less";\n' +
          "\n" +
          "const ListDemo = () => {\n" +
          '  const controlRef = useRef(new ListControl([["Vick"], ["Tom"], ["Jack"], ["Lulu"]]));\n' +
          "\n" +
          "  return (\n" +
          "    <>\n" +
          '      <ul className="list-demo__ul">\n' +
          "        <List control={controlRef.current}>\n" +
          "          {({ controls, ...rest }) => {\n" +
          "            return (\n" +
          "              <>\n" +
          "                {controls.map((control, i) => {\n" +
          "                  return (\n" +
          "                    <li key={`key${i}`}>\n" +
          "                      <Avatar>{i + 1}</Avatar>\n" +
          "                      <Field name={`${i}`}>\n" +
          "                        {({ value, setValue }) => {\n" +
          '                          return <TextField label="姓名" value={value} onChange={(e) => setValue(e.target.value)} />;\n' +
          "                        }}\n" +
          "                      </Field>\n" +
          "                    </li>\n" +
          "                  );\n" +
          "                })}\n" +
          "              </>\n" +
          "            );\n" +
          "          }}\n" +
          "        </List>\n" +
          "      </ul>\n" +
          "\n" +
          "      <Button\n" +
          '        variant="contained"\n' +
          '        color={"primary"}\n' +
          "        onClick={() => {\n" +
          "          console.log(controlRef.current.value);\n" +
          "        }}\n" +
          "      >\n" +
          "        在控制台中打印数据\n" +
          "      </Button>\n" +
          "    </>\n" +
          "  );\n" +
          "};"
        }
      />
    </div>
  );
};

export default ListPage;
