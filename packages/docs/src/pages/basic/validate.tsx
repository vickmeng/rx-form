import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import DemoCard from "../../components/demoCard";
import ValidateDemo from "../../demo/validate";

const ValidatePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        校验
      </Typography>

      <Typography paragraph>
        我们可以在初始化时通过validators参数为controller设计校验规则，也可以通过controller暴露的setValidators方法方法动态修改校验规则。
        controller会根据validators的顺序依次进行校验，我们可以在<Link to="/">动态表单</Link>中了解更多内容。
      </Typography>

      <Typography paragraph>
        validators接受一组符合ValidatorFn类型的方法，开发者可以由此定义校验规则，同时,react-observable-form也为开发者准备了一些常用的校验方法可供参考与是用,
        <a>可在此处查看</a>。这部分实现大量的参考了@angular/core的forms模块。
      </Typography>

      <Typography paragraph>
        为了让不同类型组件职能更单纯，我们提供了专门的{`<Errors/>`}
        组件处理错误信息，也可以在其他任意的组件中消费错误，如下：
      </Typography>

      <DemoCard
        demo={<ValidateDemo />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { TextField, FormHelperText } from "@material-ui/core";\n' +
          "\n" +
          'import { maxLengthValidator, requiredValidator } from "react-observable-form/validators";\n' +
          'import { Error,Field,FieldControl } from "react-observable-form";\n' +
          "\n" +
          "export const ValidateDemo = () => {\n" +
          "  const controlRef = useRef(\n" +
          '    new FieldControl("这是一条过长的姓名", { dirty: true, validators: [requiredValidator, maxLengthValidator(4)] })\n' +
          "  );\n" +
          "\n" +
          "  return (\n" +
          "    <>\n" +
          "      <Field control={controlRef.current}>\n" +
          "        {({ value, setValue, dirty, errors }) => {\n" +
          "          return (\n" +
          "            <>\n" +
          "              <TextField\n" +
          '                variant="outlined"\n' +
          '                label={"姓名"}\n' +
          "                // 同样可以在<Field/>中消费errors\n" +
          "                error={Boolean(dirty && errors)}\n" +
          "                value={value}\n" +
          "                onChange={(e) => setValue(e.target.value)}\n" +
          "              />\n" +
          "            </>\n" +
          "          );\n" +
          "        }}\n" +
          "      </Field>\n" +
          "      <Error control={controlRef.current}>\n" +
          "        {({ dirty, errors }) => {\n" +
          "          return (\n" +
          "            <>\n" +
          "              {dirty && (\n" +
          "                <>\n" +
          "                  {errors?.required && <FormHelperText error>请填写姓名</FormHelperText>}\n" +
          "\n" +
          "                  {errors?.maxlength && (\n" +
          "                    <FormHelperText error>\n" +
          "                      姓名不可大于{errors.maxlength.requiredLength}位，当前为{errors.maxlength.actualLength}位\n" +
          "                    </FormHelperText>\n" +
          "                  )}\n" +
          "                </>\n" +
          "              )}\n" +
          "            </>\n" +
          "          );\n" +
          "        }}\n" +
          "      </Error>\n" +
          "    </>\n" +
          "  );\n" +
          "};"
        }
      />
    </div>
  );
};

export default ValidatePage;
