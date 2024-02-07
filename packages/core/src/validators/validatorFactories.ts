/**
 * @Note
 * Alternative to Validators, you can customize error message prompts
 */
import { ValidatorMessageFactory } from '../types';

import { EMAIL_REGEXP, hasValidLength, isEmptyInputValue, nullValidator } from './index';

export const minValidatorFactory: ValidatorMessageFactory<{
  E: { min: number; actual: any };
  P: { min: number };
}> = (params) => {
  const { min, message } = params;

  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
    return !isNaN(value) && value < min
      ? { min: typeof message === 'string' ? message : message({ min, actual: control.value }) }
      : null;
  };
};

export const maxValidatorFactory: ValidatorMessageFactory<{
  E: { max: number; actual: any };
  P: { max: number };
}> = (params) => {
  const { max, message } = params;

  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = parseFloat(control.value);
    // Controls with NaN values after parsing should be treated as not having a
    // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
    return !isNaN(value) && value > max
      ? { max: typeof message === 'string' ? message : message({ max, actual: control.value }) }
      : null;
  };
};

export const requiredValidatorFactory: ValidatorMessageFactory<{
  E: { required: true };
}> = ({ message }) => {
  return (control) =>
    isEmptyInputValue(control.value)
      ? { required: typeof message === 'string' ? message : message({ required: true }) }
      : null;
};

export const requiredTrueValidatorFactory: ValidatorMessageFactory<{
  E: { required: true };
}> = ({ message }) => {
  return (control) => {
    return control.value === true
      ? null
      : { required: typeof message === 'string' ? message : message({ required: true }) };
  };
};

export const emailValidatorFactory: ValidatorMessageFactory<{
  E: { email: true };
}> = ({ message }) => {
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return EMAIL_REGEXP.test(control.value)
      ? null
      : { email: typeof message === 'string' ? message : message({ email: true }) };
  };
};

export const minLengthValidatorFactory: ValidatorMessageFactory<{
  E: { requiredLength: number; actualLength: number };
  P: { minLength: number };
}> = (params) => {
  const { minLength, message } = params;

  return (control) => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      // don't validate empty values to allow optional controls
      // don't validate values without `length` property
      return null;
    }

    return control.value.length < minLength
      ? {
          minlength:
            typeof message === 'string'
              ? message
              : message({ requiredLength: minLength, actualLength: control.value.length }),
        }
      : null;
  };
};

export const maxLengthValidatorFactory: ValidatorMessageFactory<{
  E: { requiredLength: number; actualLength: number };
  P: { maxLength: number };
}> = (params) => {
  const { maxLength, message } = params;

  return (control) => {
    return hasValidLength(control.value) && control.value.length > maxLength
      ? {
          maxlength:
            typeof message === 'string'
              ? message
              : message({ requiredLength: maxLength, actualLength: control.value.length }),
        }
      : null;
  };
};

export const patternValidatorFactory: ValidatorMessageFactory<{
  E: { requiredPattern: string; actualValue: any };
  P: { pattern: string | RegExp };
}> = (params) => {
  const { message, pattern } = params;
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
    return regex.test(value)
      ? null
      : {
          pattern: typeof message === 'string' ? message : message({ requiredPattern: regexStr, actualValue: value }),
        };
  };
};
