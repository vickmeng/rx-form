import React from 'react';
import { render } from '@testing-library/react';
import { GroupControl } from '@yzw-rx-form/core';

import { Field } from '../items/field';
import { Group } from '../items/group';

describe('<Group/>', () => {
  it('should render <Group/>', () => {
    const groupControl = new GroupControl({
      name: ['TOM'],
      address: ['No.1,Chaowai Street,Chaoyang District,Beijing City'],
    });
    const { asFragment } = render(
      <Group control={groupControl}>
        {(props) => (
          <>
            <Field<string> name="name">{({ value }) => <input value={value} />}</Field>
            <Field<string> name="address">{({ value }) => <input value={value} />}</Field>
          </>
        )}
      </Group>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
