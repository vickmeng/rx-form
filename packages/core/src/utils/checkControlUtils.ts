/**
 * 对control进行各种校验操作 utils
 */
import { isEmpty } from 'lodash';

import { BaseControl } from '../controls/baseControl';
import { FieldControl } from '../controls/fieldControl';
import { ListControl } from '../controls/listControl';
import { GroupControl } from '../controls/groupControl';

/**
 * @deepCheckFirstInvalidControl
 * deep loop and find the first control with error
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
