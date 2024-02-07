/**
 * @Note
 * Please prioritize the use of ValidatorFactory
 */

import { ValidatorFn } from '../types';

export const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isEmptyInputValue = (value: any) => value == null || value.length === 0;

export function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}

/**
 * Validator that requires the control's value to be greater than or equal to the provided number.
 */
export const minValidator = (min: number): ValidatorFn => {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
    return !isNaN(value) && value < min ? { min: { min, actual: control.value } } : null;
  };
};

/**
 * Validator that requires the control's value to be less than or equal to the provided number.
 * See `Validators.max` for additional information.
 */
export const maxValidator = (max: number): ValidatorFn => {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
    return !isNaN(value) && value > max ? { max: { max, actual: control.value } } : null;
  };
};

/**
 * Validator that requires the control have a non-empty value.
 * See `Validators.required` for additional information.
 */
export const requiredValidator: ValidatorFn = (control) =>
  isEmptyInputValue(control.value) ? { required: true } : null;

/**
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 */
export const requiredTrueValidator: ValidatorFn = (control) => {
  return control.value === true ? null : { required: true };
};

/**
 * Validator that requires the control's value pass an email validation test.
 */
export const emailValidator: ValidatorFn = (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
};

/**
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length. See `Validators.minLength` for additional information.
 */
export const minLengthValidator = (minLength: number): ValidatorFn => {
  return (control) => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return control.value.length < minLength
      ? { minlength: { requiredLength: minLength, actualLength: control.value.length } }
      : null;
  };
};

/**
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length. See `Validators.maxLength` for additional information.
 */
export const maxLengthValidator = (maxLength: number): ValidatorFn => {
  return (control) => {
    return hasValidLength(control.value) && control.value.length > maxLength
      ? { maxlength: { requiredLength: maxLength, actualLength: control.value.length } }
      : null;
  };
};

/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */
export const nullValidator: ValidatorFn = (control) => {
  return null;
};

/**
 * Validator that requires the control's value to match a regex pattern.
 */
export const patternValidator = (pattern: string | RegExp): ValidatorFn => {
  if (!pattern) return nullValidator;
  let regex: RegExp;
  let regexStr: string;
  if (typeof pattern === 'string') {
    regexStr = '';

    if (pattern.charAt(0) !== '^') regexStr += '^';

    regexStr += pattern;

    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value: string = control.value;
    return regex.test(value) ? null : { pattern: { requiredPattern: regexStr, actualValue: value } };
  };
};
