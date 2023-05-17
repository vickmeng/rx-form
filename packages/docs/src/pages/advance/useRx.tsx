import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import UseRxjsDemo from "../../demo/useRxjsDemo";

const UseRxPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        与Rxjs
      </Typography>

      <Typography paragraph>
        Controller提供的每一个可订阅对象都是Rxjs提供的Subscription，我们可以使用Rxjs Operators协助处理数据流。
      </Typography>

      <Typography paragraph>举个例子，利用debounceTime对搜索框进行防抖处理，请在控制台中查看效果：</Typography>

      <DemoCard
        demo={<UseRxjsDemo />}
        code={
          'import React, { useEffect, useRef } from "react";\n' +
          'import { TextField } from "@material-ui/core";\n' +
          'import { debounceTime } from "rxjs/operators";\n' +
          "\n" +
          "const UseRxjsDemo = () => {\n" +
          '  const controlRef = useRef(new FieldControl<string>(""));\n' +
          "\n" +
          "  useEffect(() => {\n" +
          "    const subscription = controlRef.current.valueChange.pipe(debounceTime(500)).subscribe((v) => {\n" +
          '      console.log("value change", v);\n' +
          "    });\n" +
          "\n" +
          "    return () => {\n" +
          "      subscription.unsubscribe();\n" +
          "    };\n" +
          "  }, []);\n" +
          "\n" +
          "  return (\n" +
          "    <Field control={controlRef.current}>\n" +
          "      {({ value, setValue }) => {\n" +
          '        return <TextField label="防抖500ms" value={value} onChange={(e) => setValue(e.target.value)} />;\n' +
          "      }}\n" +
          "    </Field>\n" +
          "  );\n" +
          "}"
        }
      />
    </div>
  );
};

export default UseRxPage;
