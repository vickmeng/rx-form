import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import { DisableDemo } from "../../demo/disable";

const DynamicPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        动态表单
      </Typography>

      <Typography paragraph>
        controller提供了大量的方法对对状态进行控制，我们可以通过调用这些方法实现动态表单效果。
      </Typography>

      <Typography paragraph>
        试想一个场景，我们设计一个婚姻状况的调查问卷。如果是已婚人士，需要填写配偶的姓名，否则清空配偶姓名栏目，并禁止输入。思路如下：
      </Typography>

      <Typography paragraph>首先我们从GroupController中获取婚姻状况的FieldController，并订阅其变化。</Typography>

      <Typography paragraph>
        当发现婚姻状况变为未婚时，获取配偶姓名的FieldController。通过setValue方法将value清空，再通过disable将其禁用，反之，利用enable方法将其开放使用。效果如下：
      </Typography>

      <DemoCard
        demo={<DisableDemo />}
        code={
          'import React from "react";\n' +
          'import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";\n' +
          'import { GroupControl,Field,Group } from "react-observable-form";\n' +
          "\n" +
          "const group = new GroupControl({\n" +
          '  married: ["unmarried"],\n' +
          '  spouse: ["", { disabled: true }],\n' +
          "});\n" +
          "\n" +
          'const married = group.get("married");\n' +
          'const spouse = group.get("spouse");\n' +
          "\n" +
          "married.valueChange.subscribe((v) => {\n" +
          '  if (v === "married") {\n' +
          "    spouse.enable();\n" +
          "  } else {\n" +
          '    spouse.setValue("");\n' +
          "    spouse.disable();\n" +
          "  }\n" +
          "});\n" +
          "\n" +
          "export const DisableDemo = () => {\n" +
          "  return (\n" +
          "    <Group control={group}>\n" +
          "      {() => {\n" +
          "        return (\n" +
          "          <>\n" +
          '            <FormLabel component="legend">婚姻状况</FormLabel>\n' +
          '            <Field name="married">\n' +
          "              {({ value, setValue }) => {\n" +
          "                return (\n" +
          "                  <>\n" +
          "                    <RadioGroup\n" +
          "                      value={value}\n" +
          "                      onChange={(e) => {\n" +
          "                        setValue(e.target.value);\n" +
          "                      }}\n" +
          "                    >\n" +
          '                      <FormControlLabel value="unmarried" control={<Radio />} label="未婚" />\n' +
          '                      <FormControlLabel value="married" control={<Radio />} label="已婚" />\n' +
          "                    </RadioGroup>\n" +
          "                  </>\n" +
          "                );\n" +
          "              }}\n" +
          "            </Field>\n" +
          "\n" +
          "            <br />\n" +
          "\n" +
          '            <Field name="spouse">\n' +
          "              {({ value, setValue, disabled }) => {\n" +
          "                return (\n" +
          "                  <TextField\n" +
          '                    label="配偶姓名"\n' +
          "                    disabled={disabled}\n" +
          "                    value={value}\n" +
          "                    onChange={(e) => setValue(e.target.value)}\n" +
          "                  />\n" +
          "                );\n" +
          "              }}\n" +
          "            </Field>\n" +
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

export default DynamicPage;
