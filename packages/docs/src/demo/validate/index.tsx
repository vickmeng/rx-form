import React, { useRef } from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { Field, Error } from '@yzw-rx-form/react';
import { FieldControl, maxLengthValidator, requiredValidator } from '@yzw-rx-form/core';

export const ValidateDemo = () => {
  const controlRef = useRef(
    new FieldControl('这是一条过长的姓名', { dirty: true, validators: [requiredValidator, maxLengthValidator(4)] })
  );

  return (
    <>
      <Field control={controlRef.current}>
        {({ value, setValue, dirty, errors }) => {
          return (
            <>
              <TextField
                variant="outlined"
                label={'姓名'}
                // 同样可以在<Field/>中消费errors
                error={Boolean(dirty && errors)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </>
          );
        }}
      </Field>
      <Error control={controlRef.current}>
        {({ dirty, errors }) => {
          return (
            <>
              {dirty && (
                <>
                  {errors?.required && <FormHelperText error>请填写姓名</FormHelperText>}

                  {errors?.maxlength && (
                    <FormHelperText error>
                      姓名不可大于{errors.maxlength.requiredLength}位，当前为{errors.maxlength.actualLength}位
                    </FormHelperText>
                  )}
                </>
              )}
            </>
          );
        }}
      </Error>
    </>
  );
};

export default ValidateDemo;
