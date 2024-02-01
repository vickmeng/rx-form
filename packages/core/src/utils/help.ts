import { isEmpty } from 'lodash';

import { CreateControlParams, Errors, ValidatorFn } from '../types';
import { AbstractControl } from '../controls/abstractControl';
import { FieldControl } from '../controls/fieldControl';
import { GroupControl } from '../controls/groupControl';
import { ListControl } from '../controls/listControl';

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
/**
 * 深度递归深度寻找control以及其子control的第一个有error的control
 */
export const deepCheckFirstInvalidControl = (controls: AbstractControl[]) => {
  let res;
  const loop = (_controls: AbstractControl[]) => {
    _controls.find((_control) => {
      if (!isEmpty(_control.errors)) {
        res = _control;
        return true;
      } else if (_control instanceof GroupControl) {
        return loop(Object.values(_control.controls));
      } else if (_control instanceof ListControl) {
        return loop(_control.controls);
      } else {
        return false;
      }
    });
  };
  loop(controls);

  return res;
};
