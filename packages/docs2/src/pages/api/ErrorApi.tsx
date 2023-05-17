import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

const ErrorApiPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        {"<Error<V> ...props/>"}
      </Typography>

      <Typography paragraph variant={"h4"}>
        props:{"FieldProps<V>"}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>参数</TableCell>
              <TableCell>说明</TableCell>
              <TableCell>类型</TableCell>
              <TableCell>必需</TableCell>
              <TableCell>默认</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                name
              </TableCell>
              <TableCell component="th" scope="row">
                字段名，与control互斥
              </TableCell>
              <TableCell component="th" scope="row">
                string
              </TableCell>
              <TableCell component="th" scope="row">
                否
              </TableCell>
              <TableCell component="th" scope="row">
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                control
              </TableCell>
              <TableCell component="th" scope="row">
                绑定的controller，与name互斥
              </TableCell>
              <TableCell component="th" scope="row">
                {"FieldControl<V = any>"}
              </TableCell>
              <TableCell component="th" scope="row">
                否
              </TableCell>
              <TableCell component="th" scope="row">
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                children
              </TableCell>
              <TableCell component="th" scope="row">
                内容
              </TableCell>
              <TableCell component="th" scope="row">
                (props: <a href={"#ErrorInternalProps"}>{"ErrorInternalProps"}</a>) {`=>`} ReactElement
              </TableCell>
              <TableCell component="th" scope="row">
                是
              </TableCell>
              <TableCell component="th" scope="row">
                -
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      <Typography paragraph variant={"h4"} id={"ErrorInternalProps"}>
        {"ErrorInternalProps"}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>参数</TableCell>
              <TableCell>说明</TableCell>
              <TableCell>类型</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                name
              </TableCell>
              <TableCell component="th" scope="row">
                字段名
              </TableCell>
              <TableCell component="th" scope="row">
                string?
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                pristine
              </TableCell>
              <TableCell component="th" scope="row">
                值未被修改过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                dirty
              </TableCell>
              <TableCell component="th" scope="row">
                值被修改过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                errors
              </TableCell>
              <TableCell component="th" scope="row">
                错误描述
              </TableCell>
              <TableCell component="th" scope="row">
                {"{[key: string]: any}  |  null"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ErrorApiPage;
