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
/**
 * 深度递归深度寻找control以及其子control的第一个有error的control
 */
// @ts-ignore
export const deepCheckFirstInvalidControl = (controls: AbstractControl[]) => {
  let res;

  const loop = (_controls: AbstractControl[]) => {
    _controls.find((_control) => {
      if (!isEmpty(_control.errors)) {
        res = _control;
        return true;
      }

      if (_control instanceof FieldControl) {
        return false;
        // 这里只能是ListControl
        // TODO 引入ListControl就报错 可能是循环引用的问题
        // @ts-ignore
      } else if (Array.isArray(_control.controls)) {
        // @ts-ignore
        return loop(_control.controls);
      } else {
        // 这里只能是GroupControl
        // TODO 引入GroupControl就报错
        // @ts-ignore
        return loop(Object.values(_control.controls as AbstractControl[]));
      }
    });
  };
  loop(controls);

  return res;
};
