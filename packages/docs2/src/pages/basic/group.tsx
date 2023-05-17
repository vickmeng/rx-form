import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import DemoCard from "../../components/demoCard";
import GroupDemo from "../../demo/group";
import TsCode from "../../components/tsCode";

const GroupPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        群组
      </Typography>

      <Typography paragraph>
        我们用Group指代群组，它是由name为key，以其他controller为value组成的hash型数据源，一张表单往往就是一个Group。
      </Typography>

      <Typography paragraph>
        我们现在创建一个包含"consignee"，"address"两个参数的群组。过程和创建单一元素是很接近的。
      </Typography>

      <Typography paragraph>
        首先，我们创造一个GroupController，其中包含"consignee"，"address"两个key，我们为这两个属性赋予两个FieldController,
        GroupController会自动订阅下级的Controllers:
      </Typography>

      <TsCode>
        {"  const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: new FieldControl("vick"),\n' +
          '      address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n' +
          "    })\n" +
          "  );"}
      </TsCode>

      <Typography paragraph>也可以采用简写形式:</Typography>

      <TsCode>
        {" const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: ["vick"],\n' +
          '      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n' +
          "    })\n" +
          "  );"}
      </TsCode>

      <Typography paragraph>然后，利用{"<Group/>"}订阅GroupController</Typography>

      <TsCode>
        {"<Group control={groupControlRef.current}>\n" +
          "    {(props) => {\n" +
          "        return (\n" +
          "          <>\n" +
          "             //TODO\n" +
          "          </>\n" +
          "        );\n" +
          "      }}\n" +
          "</Group>"}
      </TsCode>

      <Typography paragraph>
        至此Group的工作完成，接下来要将Group的Controller与视图关联。
        由于本例中的Group包含的Controller均为FieldController， 我们采用{"<Field/>"}与其匹配，更复杂的例子可在
        <Link to={"/"}>高级使用</Link>中查看
      </Typography>

      <Typography paragraph>{"<Field/>"}可以通过name可以匹配外部GroupController的下级Controller</Typography>

      <TsCode>
        {"<Group control={groupControlRef.current}>\n" +
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
          "            <br />\n" +
          "            <br />\n" +
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
          "          </>\n" +
          "        );\n" +
          "      }}\n" +
          "    </Group>"}
      </TsCode>

      <TsCode>{'<Field name="consignee"/> 相当于 <Field control="一个FieldController"/>'}</TsCode>

      <Typography paragraph>{"<Field/>"}完整例子如下</Typography>

      <DemoCard
        demo={<GroupDemo />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { TextField } from "@material-ui/core";\n' +
          'import { Field, Group, GroupControl } from "react-observable-form";\n' +
          "\n" +
          "const GroupDemo = () => {\n" +
          "  // const groupControlRef = useRef(\n" +
          "  //   new GroupControl({\n" +
          '  //     consignee: new FieldControl("vick"),\n' +
          '  //     address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n' +
          "  //   })\n" +
          "  // );\n" +
          "\n" +
          "  const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: ["vick"],\n' +
          '      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n' +
          "    })\n" +
          "  );\n" +
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
          "            <Button\n" +
          '              variant="contained"\n' +
          '              color={"primary"}\n' +
          "              onClick={() => {\n" +
          "                console.log(groupControlRef.current.value);\n" +
          "              }}\n" +
          "            >\n" +
          "              打印数据\n" +
          "            </Button>\n" +
          "          </>\n" +
          "        );\n" +
          "      }}\n" +
          "    </Group>\n" +
          "  );\n" +
          "};"
        }
      />
    </div>
  );
};

export default GroupPage;
