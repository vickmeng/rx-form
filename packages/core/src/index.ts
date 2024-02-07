/**
 * Controls
 */

export { FieldControl } from './controls/fieldControl';
export { GroupControl } from './controls/groupControl';
export { ListControl } from './controls/listControl';
export { BaseControl } from './controls/baseControl';

export type {
  FormControlOptions,
  FormGroupOptions,
  FormListOptions,
  FormGroupControlsConfig,
  FormListControlsConfig,
  ValidatorFn,
  AbstractControl,
  // AsyncValidatorFn,
  Errors,
  GroupChildControls,
  ListChildControls,
  Valid,
  GroupValue,
} from './types';

/**
 * validators
 */

export {
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  requiredValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  requiredTrueValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  minValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  maxValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  emailValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  minLengthValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  maxLengthValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  nullValidator,
  /**
   * @deprecated
   * 不建议直接使用 请移步ValidatorFactory
   */
  patternValidator,
} from './validators';

export {
  requiredValidatorFactory,
  requiredTrueValidatorFactory,
  minValidatorFactory,
  maxValidatorFactory,
  emailValidatorFactory,
  minLengthValidatorFactory,
  maxLengthValidatorFactory,
  patternValidatorFactory,
} from './validators/validatorMessageFactories';

export { deepCheckFirstInvalidControl } from './utils/checkControlUtils';
