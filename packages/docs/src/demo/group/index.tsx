import React, { useEffect, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Field, Group } from '@rx-form/react';
import { GroupControl } from '@rx-form/core';

// import { Field, Group, GroupControl } from "../../../packages/index";

const GroupDemo = () => {
  // const groupControlRef = useRef(
  //   new GroupControl({
  //     consignee: new FieldControl("vick"),
  //     address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),
  //   })
  // );

  const groupControlRef = useRef(
    new GroupControl({
      consignee: ['Vick'],
      address: ['No.1,Chaowai Street,Chaoyang District,Beijing City'],
    })
  );

  useEffect(() => {
    const subscription = groupControlRef.current.valueChange.subscribe((v) => {
      // eslint-disable-next-line no-console
      console.log('value changed', v);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Group control={groupControlRef.current}>
      {(props) => {
        return (
          <>
            <Field name="consignee">
              {({ value, setValue }) => {
                return (
                  <TextField
                    label="consignee"
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                );
              }}
            </Field>

            <br />
            <br />

            <Field name="address">
              {({ value, setValue }) => {
                return (
                  <TextField
                    label="address"
                    variant="outlined"
                    multiline
                    maxRows={14}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                );
              }}
            </Field>
            <br />
            <br />

            <Button
              variant="contained"
              color={'primary'}
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log(groupControlRef.current.value);
              }}
            >
              在控制台中打印数据
            </Button>
          </>
        );
      }}
    </Group>
  );
};

export default GroupDemo;
