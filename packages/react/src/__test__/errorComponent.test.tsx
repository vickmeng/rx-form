import React from 'react';
import { render } from '@testing-library/react';
import { requiredValidator, FieldControl } from '@rx-form/core';

import { Error } from '../index';

describe('<Error/>', () => {
  it('should render correctly', () => {
    const fieldControl = new FieldControl('', { validators: [requiredValidator] });

    const { asFragment } = render(
      <Error control={fieldControl}>{({ errors }) => <>{errors?.required && '必填'}</>}</Error>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
