import React from 'react';
import { Input } from 'antd';
import { Field } from '@rx-form/react';
import { FieldControl } from '@rx-form/core';

const formControl = new FieldControl<string>('vick');

const UseAntd = () => {
  return (
    <>
      <label className="form-label">name</label>
      <Field control={formControl}>
        {({ value, setValue }) => {
          return (
            <Input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
            />
          );
        }}
      </Field>
    </>
  );
};

export default UseAntd;
