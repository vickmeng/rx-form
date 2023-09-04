import React from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { GroupControl } from '@rx-form/core';
import { Field, Group } from '@rx-form/react';

const group = new GroupControl({
  married: ['unmarried'],
  spouse: ['', { disabled: true }],
});

const married = group.get('married');
const spouse = group.get('spouse');

married.valueChange.subscribe((v) => {
  if (v === 'married') {
    spouse.enable();
  } else {
    spouse.setValue('');
    spouse.disable();
  }
});

export const DisableDemo = () => {
  return (
    <Group control={group}>
      {() => {
        return (
          <>
            <FormLabel component="legend">婚姻状况</FormLabel>
            <Field name="married">
              {({ value, setValue }) => {
                return (
                  <>
                    <RadioGroup
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    >
                      <FormControlLabel value="unmarried" control={<Radio />} label="未婚" />
                      <FormControlLabel value="married" control={<Radio />} label="已婚" />
                    </RadioGroup>
                  </>
                );
              }}
            </Field>

            <br />

            <Field name="spouse">
              {({ value, setValue, disabled }) => {
                return (
                  <TextField
                    label="配偶姓名"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                );
              }}
            </Field>
          </>
        );
      }}
    </Group>
  );
};
