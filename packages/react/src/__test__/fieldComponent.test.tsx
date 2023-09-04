import { render } from '@testing-library/react';
import React from 'react';
import { FieldControl } from '@rx-form/core';

import { Field } from '../index';

describe('<Field/>', () => {
  it('should render <Field/>', () => {
    const fieldControl = new FieldControl('Tom');

    const { asFragment } = render(
      <Field control={fieldControl}>
        {({ value }) => {
          return <input value={value} readOnly />;
        }}
      </Field>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
