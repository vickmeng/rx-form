import React, { useRef } from 'react';
import { Avatar, Button, TextField } from '@material-ui/core';

import './index.less';
import { Field } from '@yzw-rx-form/react';
import { ListControl } from '@yzw-rx-form/core';

const ListDemo = () => {
  const controlRef = useRef(new ListControl([['Vick'], ['Tom'], ['Jack'], ['Lulu']]));

  return (
    <>
      <ul className="list-demo__ul">
        <List control={controlRef.current}>
          {({ childControls, ...rest }) => {
            return (
              <>
                {childControls.map((control, i) => {
                  return (
                    <li key={`key${i}`}>
                      <Avatar>{i + 1}</Avatar>
                      <Field name={`${i}`}>
                        {({ value, setValue }) => {
                          return <TextField label="姓名" value={value} onChange={(e) => setValue(e.target.value)} />;
                        }}
                      </Field>
                    </li>
                  );
                })}
              </>
            );
          }}
        </List>
      </ul>

      <Button
        variant="contained"
        color={'primary'}
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(controlRef.current.value);
        }}
      >
        在控制台中打印数据
      </Button>
    </>
  );
};

export default ListDemo;