import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import React from "react";

const GroupControlApiPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        {`Class GroupControl`}
      </Typography>

      <Typography paragraph variant={"h4"}>
        Constructor
      </Typography>

      <Typography paragraph variant={"h4"}>
        属性
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
                value
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）值
              </TableCell>
              <TableCell component="th" scope="row">
                {"{[key: string]: any}"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                controls
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）子controller集合
              </TableCell>
              <TableCell component="th" scope="row">
                {"{[key: string]: AbstractControl<any>}"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                errors
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）错误
              </TableCell>
              <TableCell component="th" scope="row">
                {"{[key: string]: any} | null"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                valid
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）校验通过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                invalid
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）校验未通过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                disabled
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）禁用
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                enabled
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）可用
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
                （只读）被污染过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                pristine
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）未被污染过
              </TableCell>
              <TableCell component="th" scope="row">
                boolean
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                valueChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅值变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<{[key: string]: any}>"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                errorsChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅错误变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<{[key: string]: any} | null>"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                disabledChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅禁用状态变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<boolean>"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                dirtyChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅污染状态变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<boolean>"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                validChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅校验状态变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<boolean>"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                controlsChange
              </TableCell>
              <TableCell component="th" scope="row">
                （只读）订阅子controllers变化的可订阅对象
              </TableCell>
              <TableCell component="th" scope="row">
                {"Observable<{[key: string]: AbstractControl<any>}>"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                setValue
              </TableCell>
              <TableCell component="th" scope="row">
                更新值
              </TableCell>
              <TableCell component="th" scope="row">
                {"(value:{[key: string]: any})=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                setErrors
              </TableCell>
              <TableCell component="th" scope="row">
                更新错误
              </TableCell>
              <TableCell component="th" scope="row">
                {"(value:{[key: string]: any} | null)=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                setValidators
              </TableCell>
              <TableCell component="th" scope="row">
                更新校验规则
              </TableCell>
              <TableCell component="th" scope="row">
                {"(validators:ValidatorFn[])=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                disable
              </TableCell>
              <TableCell component="th" scope="row">
                设置为禁用
              </TableCell>
              <TableCell component="th" scope="row">
                {"()=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                enable
              </TableCell>
              <TableCell component="th" scope="row">
                设置为未禁用
              </TableCell>
              <TableCell component="th" scope="row">
                {"()=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                setValid
              </TableCell>
              <TableCell component="th" scope="row">
                更新校验状态的方法
              </TableCell>
              <TableCell component="th" scope="row">
                {"(valid:boolean)=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                markAsDirty
              </TableCell>
              <TableCell component="th" scope="row">
                更新为被污染的方法
              </TableCell>
              <TableCell component="th" scope="row">
                {"()=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                markAsPristine
              </TableCell>
              <TableCell component="th" scope="row">
                更新未被污染的方法
              </TableCell>
              <TableCell component="th" scope="row">
                {"()=>void"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                reset
              </TableCell>
              <TableCell component="th" scope="row">
                重置值
              </TableCell>
              <TableCell component="th" scope="row">
                {"()=>void"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GroupControlApiPage;
