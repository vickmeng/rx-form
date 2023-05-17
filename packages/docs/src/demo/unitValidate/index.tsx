import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { Field, Group, Error } from '@yzw-rx-form/react';
import { ValidatorFn, GroupControl, requiredValidator, ErrorInternalProps } from '@yzw-rx-form/core';

interface FormValue {
  passWord: string;
  confirmPassWord: string;
}

const confirmPassword: ValidatorFn<FormValue> = (control) => {
  return control.value.confirmPassWord === control.value.passWord ? null : { confirmPassword: true };
};

const formGroup = new GroupControl(
  {
    passWord: ['', { validators: [requiredValidator] }],
    confirmPassWord: ['', { validators: [requiredValidator] }],
  },
  { validators: [confirmPassword] }
);

const RequiredErrorMessage = (props: ErrorInternalProps) => (
  <>{props.dirty && props.errors?.required && <FormHelperText error>{'必填项'}</FormHelperText>}</>
);

const UnitValidateDemo = () => {
  return (
    <>
      <Group control={formGroup}>
        {(props) => {
          return (
            <>
              <Field name="passWord">
                {({ value, setValue }) => {
                  return (
                    <TextField
                      label="密码"
                      variant="outlined"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  );
                }}
              </Field>
              <Error name="passWord">{RequiredErrorMessage}</Error>

              <br />
              <br />

              <Field name="confirmPassWord">
                {({ value, setValue }) => {
                  return (
                    <TextField
                      label="再次确认密码"
                      variant="outlined"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  );
                }}
              </Field>
              <Error name="confirmPassWord">{RequiredErrorMessage}</Error>
            </>
          );
        }}
      </Group>

      <Error control={formGroup}>
        {(props) => (
          <>{props.dirty && props.errors?.confirmPassword && <FormHelperText error>两次密码不一致</FormHelperText>}</>
        )}
      </Error>
    </>
  );
};

export default UnitValidateDemo;
