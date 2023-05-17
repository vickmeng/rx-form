import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import GroupDemo from "../../demo/group";
import DemoCard from "../../components/demoCard";

const SubscribePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        订阅变化
      </Typography>

      <Typography paragraph>
        让开发者自由订阅表单状态变化是开发react-observable-form的初衷，react-observable-form使用Rxjs提供订阅功能。
        开发者可以订阅value，disabled，dirty，errors，validate等等不同的状态变化并作出响应。
        比如对表单元素进行操作，以达到动态表单的效果，再比如，表单某个值发生变化时实时发送请求。
      </Typography>

      <Typography paragraph>
        我们仍然以group为例，controller提供valueChange提供开发者进行对value变化的订阅。此处完全使用Rxjs的api，
        如果你对Rxjs并不了解，也并不会影响你的使用。更多的可订阅对象请在<Link to={"/"}>API</Link>中了解。
      </Typography>

      <Typography paragraph>
        如果开发者觉得订阅valueChange很麻烦，建议自行封装hook简化逻辑，<b>但是你一定要清楚Rxjs做了什么</b>。
      </Typography>

      <Typography paragraph>请打开控制台查看value变化：</Typography>

      <DemoCard
        demo={<GroupDemo />}
        code={
          'import React, { useEffect, useRef } from "react";\n' +
          'import { Button, TextField } from "@material-ui/core";\n' +
          "\n" +
          'import { Field, Group, GroupControl } from "react-observable-forms";\n' +
          "\n" +
          "const GroupDemo = () => {\n" +
          "  const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: ["Vick"],\n' +
          '      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n' +
          "    })\n" +
          "  );\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    const subscription = groupControlRef.current.valueChange.subscribe((v) => {\n" +
          '      console.log("value changed", v);\n' +
          "    });\n" +
          "\n" +
          "    return () => {\n" +
          "      subscription.unsubscribe();\n" +
          "    };\n" +
          "  }, []);\n" +
          "\n" +
          "  return (\n" +
          "    <Group control={groupControlRef.current}>\n" +
          "      {(props) => {\n" +
          "        return (\n" +
          "          <>\n" +
          '            <Field name="consignee">\n' +
          "              {({ value, setValue }) => {\n" +
          "                return (\n" +
          "                  <TextField\n" +
          '                    label="consignee"\n' +
          '                    variant="outlined"\n' +
          "                    value={value}\n" +
          "                    onChange={(e) => setValue(e.target.value)}\n" +
          "                  />\n" +
          "                );\n" +
          "              }}\n" +
          "            </Field>\n" +
          "\n" +
          '            <Field name="address">\n' +
          "              {({ value, setValue }) => {\n" +
          "                return (\n" +
          "                  <TextField\n" +
          '                    label="address"\n' +
          '                    variant="outlined"\n' +
          "                    multiline\n" +
          "                    maxRows={14}\n" +
          "                    value={value}\n" +
          "                    onChange={(e) => setValue(e.target.value)}\n" +
          "                  />\n" +
          "                );\n" +
          "              }}\n" +
          "            </Field>\n" +
          "\n" +
          "            <Button\n" +
          '              variant="contained"\n' +
          '              color={"primary"}\n' +
          "              onClick={() => {\n" +
          "                console.log(groupControlRef.current.value);\n" +
          "              }}\n" +
          "            >\n" +
          "              在控制台中打印数据\n" +
          "            </Button>\n" +
          "          </>\n" +
          "        );\n" +
          "      }}\n" +
          "    </Group>\n" +
          "  );\n" +
          "};\n"
        }
      />
    </div>
  );
};

export default SubscribePage;
