import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import { AsyncValidateUsername } from "../../demo/asyncValdate";

const AsyncValidatePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        异步校验
      </Typography>

      <Typography paragraph>
        试想一个常见场景，当我们想要在某平台注册注册一个账号,我们要求的账号唯一性。此时我们需要在提交注册之前发起一个请求校验账号是否已被占用。
        这时我们就用到了异步校验功能。
      </Typography>

      <Typography paragraph>
        我们为control绑定一组asyncValidators作为异步校验规则，也许是要到调用某一个接口。当接口返回并且通过校验再进行下一步操作，案例如下：
      </Typography>

      <DemoCard
        demo={<AsyncValidateUsername />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { InputAdornment, TextField, Button } from "@material-ui/core";\n' +
          'import { Sync, CheckCircle, ErrorOutline } from "@material-ui/icons";\n' +
          'import { take } from "rxjs/operators";\n' +
          "\n" +
          'import "./index.less";\n' +
          'import { FieldControl, Field,AsyncValidatorFn,useControlValid } from "react-observable-form";\n' +
          'import { requiredValidator } from "react-observable-form/validators";\n' +
          "\n" +
          "const asyncValidator: AsyncValidatorFn<string> = (control) => {\n" +
          "  return new Promise((resolve) => {\n" +
          "    setTimeout(() => {\n" +
          '      if (control.value === "existed") {\n' +
          "        resolve({ existed: true });\n" +
          "      } else {\n" +
          "        resolve(null);\n" +
          "      }\n" +
          "    }, 2000);\n" +
          "  });\n" +
          "};\n" +
          "\n" +
          "export const AsyncValidateUsername = () => {\n" +
          "  const controlRef = useRef(\n" +
          '    new FieldControl<string>("", {\n' +
          "      validators: [requiredValidator],\n" +
          "      asyncValidators: [asyncValidator],\n" +
          "      autoAsyncValidate: false,\n" +
          "      autoMarkAsDirty: false,\n" +
          "    })\n" +
          "  );\n" +
          "\n" +
          "  const valid = useControlValid(controlRef.current);\n" +
          "\n" +
          "  const onSubmit = () => {\n" +
          "    const handleSubmit = () => {\n" +
          "      // eslint-disable-next-line no-console\n" +
          '      console.log("提交成功", {\n' +
          "        username: usernameControl.value,\n" +
          "      });\n" +
          "    };\n" +
          "\n" +
          "    const usernameControl = controlRef.current;\n" +
          "\n" +
          "    if (usernameControl.valid === true) {\n" +
          "      handleSubmit();\n" +
          "    }\n" +
          "\n" +
          '    if (usernameControl.valid === "pending") {\n' +
          "      usernameControl.validChange.pipe(take(1)).subscribe((valid) => {\n" +
          "        if (valid) {\n" +
          "          handleSubmit();\n" +
          "        }\n" +
          "      });\n" +
          "    }\n" +
          "  };\n" +
          "\n" +
          "  return (\n" +
          "    <>\n" +
          "      <Field control={controlRef.current}>\n" +
          "        {({ value, setValue, markAsDirty, asyncValidateAndUpdateErrors, valid, dirty }) => {\n" +
          "          return (\n" +
          "            <TextField\n" +
          '              label="username"\n' +
          "              value={value}\n" +
          "              onChange={(e) => setValue(e.target.value)}\n" +
          "              onBlur={(e) => {\n" +
          "                markAsDirty();\n" +
          "                asyncValidateAndUpdateErrors();\n" +
          "              }}\n" +
          "              InputProps={{\n" +
          "                endAdornment: (\n" +
          '                  <InputAdornment position="end">\n' +
          "                    <>\n" +
          '                      {valid === "pending" && <Sync className={"pending-icon"} />}\n' +
          '                      {dirty && valid === true && <CheckCircle className={"success-icon"} />}\n' +
          '                      {dirty && valid === false && <ErrorOutline className={"failed-icon"} />}\n' +
          "                    </>\n" +
          "                  </InputAdornment>\n" +
          "                ),\n" +
          "              }}\n" +
          "            />\n" +
          "          );\n" +
          "        }}\n" +
          "      </Field>\n" +
          "\n" +
          "      <div>\n" +
          "        <Button disabled={valid === false} onClick={onSubmit}>\n" +
          "          submit\n" +
          "        </Button>\n" +
          "      </div>\n" +
          "    </>\n" +
          "  );\n" +
          "};\n"
        }
      />
    </div>
  );
};

export default AsyncValidatePage;
