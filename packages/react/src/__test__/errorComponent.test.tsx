import React from 'react';
import { render } from '@testing-library/react';
import { requiredValidator, FieldControl } from '@yzw-rx-form/core';

import { Error } from '../items/error';

describe('<Error/>', () => {
  it('should render correctly', () => {
    const fieldControl = new FieldControl('', { validators: [requiredValidator] });

    const { asFragment } = render(
      <Error control={fieldControl}>{({ errors }) => <>{errors?.required && '必填'}</>}</Error>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
