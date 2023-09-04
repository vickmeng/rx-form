import { isEmpty } from 'lodash';

import { CreateControlParams, Errors, ValidatorFn } from '../types';
import { AbstractControl } from '../controls/abstractControl';
import { FieldControl } from '../controls/fieldControl';

export const getErrorsBy = (control: AbstractControl, validators: ValidatorFn[]) => {
  const errors: Errors = validators.reduce((acc, cur) => {
    const error = cur(control);
    if (error) {
      acc = { ...acc, ...error };
    }
    return acc;
  }, {});

  return isEmpty(errors) ? null : errors;
};

/**
 * createControl
 * Accept the Control instance as input and return it itself; otherwise, accept the parameters to construct a FieldControl and return the constructed FieldControl
 */
export const createControl = (params: CreateControlParams) => {
  if (params instanceof AbstractControl) {
    return params;
  } else {
    return new FieldControl(...params);
  }
};
