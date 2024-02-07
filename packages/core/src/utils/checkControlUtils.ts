/**
 * 对control进行各种校验操作 utils
 */
import { isEmpty } from 'lodash';

import { BaseControl } from '../controls/baseControl';
import { FieldControl } from '../controls/fieldControl';
import { ListControl } from '../controls/listControl';
import { GroupControl } from '../controls/groupControl';

/**
 * deepCheckFirstInvalidControl
 * 深度递归深度寻找control以及其子control的第一个有error的control
 */
export const deepCheckFirstInvalidControl = (controls: BaseControl[]) => {
  let res: BaseControl | undefined;

  const loop = (_controls: BaseControl[]) => {
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
