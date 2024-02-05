import { isEmpty } from 'lodash';

import { CreateControlParams } from '../types';
import { AbstractControl } from '../controls/abstractControl';
import { FieldControl } from '../controls/fieldControl';
import { ListControl } from '../controls/listControl';
import { GroupControl } from '../controls/groupControl';

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
  let res: AbstractControl | undefined;

  const loop = (_controls: AbstractControl[]) => {
    _controls.find((_control) => {
      if (!isEmpty(_control.errors)) {
        res = _control;
        return true;
      }

      if (_control instanceof FieldControl) {
        return false;
      } else if (_control instanceof ListControl) {
        return loop(_control.controls);
      } else {
        return loop(Object.values((_control as GroupControl).controls));
      }
    });
  };
  loop(controls);

  return res;
};
