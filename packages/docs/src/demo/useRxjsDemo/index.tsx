import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { debounceTime } from 'rxjs/operators';
import { Field } from '@yzw-rx-form/react';
import { FieldControl } from '@yzw-rx-form/core';

const UseRxjsDemo = () => {
  const controlRef = useRef(new FieldControl<string>(''));

  useEffect(() => {
    const subscription = controlRef.current.valueChange.pipe(debounceTime(500)).subscribe((v) => {
      console.log('value change', v);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Field control={controlRef.current}>
      {({ value, setValue }) => {
        return <TextField label="防抖500ms" value={value} onChange={(e) => setValue(e.target.value)} />;
      }}
    </Field>
  );
};
export default UseRxjsDemo;
