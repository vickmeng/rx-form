import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import UnitValidateDemo from "../../demo/unitValidate";

const UniteValidatePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        联合校验
      </Typography>

      <Typography paragraph>
        说一个经典的场景：注册账号的时候往往需要输入两次密码以免输入失误。当我两次输入的密码不一致的时候，是不能通过校验的。
      </Typography>

      <Typography paragraph>此时,第一条密码没有问题，第二条密码也没有问题，但是两条密码组合在一起就出错了。</Typography>
      <Typography paragraph>那么我们要在更上层的Group中对这两条密码进行校验。实现如下：</Typography>

      <DemoCard
        demo={<UnitValidateDemo />}
        code={
          'import React from "react";\n' +
          'import { TextField, FormHelperText } from "@material-ui/core";\n' +
          "\n" +
          'import { Error,ErrorInternalProps, Field, Group, GroupControl,ValidatorFn } from "react-observable-form";\n' +
          'import { requiredValidator } from "react-observable-form/validators";\n' +
          "\n" +
          "interface FormValue {\n" +
          "  passWord: string;\n" +
          "  confirmPassWord: string;\n" +
          "}\n" +
          "\n" +
          "const confirmPasswordValidator: ValidatorFn<FormValue> = (control) => {\n" +
          "  return control.value.confirmPassWord === control.value.passWord ? null : { confirmPassword: true };\n" +
          "};\n" +
          "\n" +
          "const formGroup = new GroupControl(\n" +
          "  {\n" +
          '    passWord: ["", { validators: [requiredValidator] }],\n' +
          '    confirmPassWord: ["", { validators: [requiredValidator] }],\n' +
          "  },\n" +
          "  { validators: [confirmPasswordValidator] }\n" +
          ");\n" +
          "\n" +
          "const RequiredErrorMessage = (props: ErrorInternalProps) => (\n" +
          '  <>{props.dirty && props.errors?.required && <FormHelperText error>{"必填项"}</FormHelperText>}</>\n' +
          ");\n" +
          "\n" +
          "const UnitValidateDemo = () => {\n" +
          "  return (\n" +
          "    <>\n" +
          "      <Group control={formGroup}>\n" +
          "        {(props) => {\n" +
          "          return (\n" +
          "            <>\n" +
          '              <Field name="passWord">\n' +
          "                {({ value, setValue }) => {\n" +
          "                  return (\n" +
          "                    <TextField\n" +
          '                      label="密码"\n' +
          '                      variant="outlined"\n' +
          "                      value={value}\n" +
          "                      onChange={(e) => setValue(e.target.value)}\n" +
          "                    />\n" +
          "                  );\n" +
          "                }}\n" +
          "              </Field>\n" +
          '              <Error name="passWord">{RequiredErrorMessage}</Error>\n' +
          "\n" +
          "              <br />\n" +
          "              <br />\n" +
          "\n" +
          '              <Field name="confirmPassWord">\n' +
          "                {({ value, setValue }) => {\n" +
          "                  return (\n" +
          "                    <TextField\n" +
          '                      label="再次确认密码"\n' +
          '                      variant="outlined"\n' +
          "                      value={value}\n" +
          "                      onChange={(e) => setValue(e.target.value)}\n" +
          "                    />\n" +
          "                  );\n" +
          "                }}\n" +
          "              </Field>\n" +
          '              <Error name="confirmPassWord">{RequiredErrorMessage}</Error>\n' +
          "            </>\n" +
          "          );\n" +
          "        }}\n" +
          "      </Group>\n" +
          "\n" +
          "      <Error control={formGroup}>\n" +
          "        {(props) => (\n" +
          "          <>{props.dirty && props.errors?.confirmPassword && <FormHelperText error>两次密码不一致</FormHelperText>}</>\n" +
          "        )}\n" +
          "      </Error>\n" +
          "    </>\n" +
          "  );\n" +
          "};"
        }
      />
    </div>
  );
};

export default UniteValidatePage;
