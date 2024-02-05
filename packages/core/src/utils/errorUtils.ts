import { isEmpty } from 'lodash';

import { AbstractControlSubset, Errors, ValidatorFn } from '../types';

export const getErrorsBy = <V = any>(control: AbstractControlSubset<V>, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(control);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};
