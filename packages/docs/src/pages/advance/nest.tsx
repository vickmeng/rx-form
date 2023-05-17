import React from "react";
import { Typography } from "@material-ui/core";

import nestImg from "../../assets/img/nest.png";
import DemoCard from "../../components/demoCard";
import NestedDemo from "../../demo/NestedDemo";

const NestPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        复杂嵌套
      </Typography>

      <Typography paragraph>
        我们在基础使用中尝试过将Field嵌入Group与List，事实上不止Field，Group/List也可以作为Group/List的子Controller，
        我们可以基于此作出更复杂的设计。
      </Typography>

      <Typography paragraph>
        试想一个场景：我们做一张统计家庭成员的表单，需要填写本人姓名，动态添加家庭成员，每个家庭成员需要填写姓名与联系电话。我们设计出如下的嵌套关系：
      </Typography>

      <img src={nestImg} width={600} />

      <Typography paragraph>实现如下：</Typography>

      <DemoCard
        demo={<NestedDemo />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { Button, FormHelperText, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";\n' +
          "\n" +
          'import { Error,List,Field,ListControl,GroupControl,Group } from "react-observable-form";\n' +
          'import { requiredValidator } from "react-observable-form/validators";\n' +
          "\n" +
          "const createFamilyMemberGroup = () => {\n" +
          "  return new GroupControl({\n" +
          '    name: [""],\n' +
          '    tel: [""],\n' +
          "  });\n" +
          "};\n" +
          "\n" +
          "const NestedDemo = () => {\n" +
          "  const fromGroupRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      name: ["", { validators: [requiredValidator] }],\n' +
          "      familyMembers: new ListControl([createFamilyMemberGroup()], {\n" +
          "        validators: [requiredValidator],\n" +
          "      }),\n" +
          "    })\n" +
          "  );\n" +
          "\n" +
          "  return (\n" +
          "    <>\n" +
          "      <Group control={fromGroupRef.current}>\n" +
          "        {(v) => (\n" +
          "          <>\n" +
          '            <Field name="name">\n' +
          "              {({ value, setValue }) => {\n" +
          '                return <TextField label="本人姓名" value={value} onChange={(e) => setValue(e.target.value)} />;\n' +
          "              }}\n" +
          "            </Field>\n" +
          "            <br />\n" +
          "            <br />\n" +
          "            家庭成员：\n" +
          "            <Table>\n" +
          "              <TableHead>\n" +
          "                <TableRow>\n" +
          "                  <TableCell>姓名</TableCell>\n" +
          "                  <TableCell>联系电话</TableCell>\n" +
          "                  <TableCell>操作</TableCell>\n" +
          "                </TableRow>\n" +
          "              </TableHead>\n" +
          "\n" +
          "              <TableBody>\n" +
          '                <List name="familyMembers">\n' +
          "                  {({ controls }) => {\n" +
          "                    return (\n" +
          "                      <>\n" +
          "                        {controls.map((control, i) => {\n" +
          "                          return (\n" +
          "                            <Group name={`${i}`} key={`${i}`}>\n" +
          "                              {() => {\n" +
          "                                return (\n" +
          "                                  <TableRow>\n" +
          "                                    <TableCell>\n" +
          '                                      <Field name="name">\n' +
          "                                        {({ value, setValue }) => {\n" +
          "                                          return (\n" +
          "                                            <TextField\n" +
          '                                              label="姓名"\n' +
          "                                              value={value}\n" +
          "                                              onChange={(e) => setValue(e.target.value)}\n" +
          "                                            />\n" +
          "                                          );\n" +
          "                                        }}\n" +
          "                                      </Field>\n" +
          "                                    </TableCell>\n" +
          "                                    <TableCell>\n" +
          '                                      <Field name="tel">\n' +
          "                                        {({ value, setValue }) => {\n" +
          "                                          return (\n" +
          "                                            <TextField\n" +
          '                                              label="联系电话"\n' +
          "                                              value={value}\n" +
          "                                              onChange={(e) => setValue(e.target.value)}\n" +
          "                                            />\n" +
          "                                          );\n" +
          "                                        }}\n" +
          "                                      </Field>\n" +
          "                                    </TableCell>\n" +
          "                                    <TableCell>\n" +
          "                                      <Button\n" +
          '                                        color="primary"\n' +
          "                                        onClick={() => {\n" +
          '                                          fromGroupRef.current.get<ListControl>("familyMembers").remove(i);\n' +
          "                                        }}\n" +
          "                                      >\n" +
          "                                        删除\n" +
          "                                      </Button>\n" +
          "                                    </TableCell>\n" +
          "                                  </TableRow>\n" +
          "                                );\n" +
          "                              }}\n" +
          "                            </Group>\n" +
          "                          );\n" +
          "                        })}\n" +
          "                      </>\n" +
          "                    );\n" +
          "                  }}\n" +
          "                </List>\n" +
          "              </TableBody>\n" +
          "            </Table>\n" +
          '            <Error name="familyMembers">\n' +
          "              {({ errors, dirty }) => (\n" +
          "                <>{errors?.required && <FormHelperText error>至少填一名家庭成员</FormHelperText>}</>\n" +
          "              )}\n" +
          "            </Error>\n" +
          "            <br />\n" +
          "            <Button\n" +
          '              variant="contained"\n' +
          '              color="primary"\n' +
          "              onClick={() => {\n" +
          '                fromGroupRef.current.get<ListControl>("familyMembers").push(createFamilyMemberGroup());\n' +
          "              }}\n" +
          "            >\n" +
          "              加一名成员\n" +
          "            </Button>\n" +
          "          </>\n" +
          "        )}\n" +
          "      </Group>\n" +
          "      <br />\n" +
          "      <br />\n" +
          "      <Button\n" +
          '        variant="contained"\n' +
          '        color="primary"\n' +
          "        onClick={() => {\n" +
          "          console.log(fromGroupRef.current.value);\n" +
          "        }}\n" +
          "      >\n" +
          "        在控制台中打印数据\n" +
          "      </Button>\n" +
          "    </>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default NestedDemo;\n"
        }
      />
    </div>
  );
};

export default NestPage;
