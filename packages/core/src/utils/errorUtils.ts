import { isEmpty } from 'lodash';

import { Errors, ValidatorFn } from '../types';
import { BaseControl } from '../controls/baseControl';

export const getErrorsBy = <V = any>(control: BaseControl<V>, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(control);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};