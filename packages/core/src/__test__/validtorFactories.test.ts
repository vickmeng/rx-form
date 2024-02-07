import {
  emailValidatorFactory,
  FieldControl,
  ListControl,
  maxLengthValidatorFactory,
  maxValidatorFactory,
  minLengthValidatorFactory,
  minValidatorFactory,
  patternValidatorFactory,
  requiredTrueValidatorFactory,
  requiredValidatorFactory,
} from '../index';

describe('validatorFactories', () => {
  describe('minValidatorFactory', () => {
    it('should not error on an empty string', () => {
      expect(minValidatorFactory({ message: 'errMsg', min: 2 })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(minValidatorFactory({ message: 'errMsg', min: 2 })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(minValidatorFactory({ message: 'errMsg', min: 2 })(new FieldControl(undefined))).toBeNull();
    });

    it('should return null if NaN after parsing', () => {
      expect(minValidatorFactory({ message: 'errMsg', min: 2 })(new FieldControl('a'))).toBeNull();
    });

    it('should return a validation error on small values', () => {
      expect(minValidatorFactory({ message: 'errMsg', min: 2 })(new FieldControl(1))).toEqual({ min: 'errMsg' });
    });

    it('should return a validation error on small values converted from strings', () => {
      expect(
        minValidatorFactory({ min: 2, message: (errors) => `min=${errors.min},actual=${errors.actual}` })(
          new FieldControl('1')
        )
      ).toEqual({
        min: 'min=2,actual=1',
      });
    });

    it('should not error on small float number validation', () => {
      expect(minValidatorFactory({ min: 1.2, message: 'errMsg' })(new FieldControl(1.25))).toBeNull();
    });

    it('should not error on equal float values', () => {
      expect(minValidatorFactory({ min: 1.25, message: 'errMsg' })(new FieldControl(1.25))).toBeNull();
    });

    it('should return a validation error on big values', () => {
      expect(minValidatorFactory({ min: 1.25, message: 'errMsg' })(new FieldControl(1.2))).toEqual({
        min: 'errMsg',
      });
    });

    it('should not error on big values', () => {
      expect(minValidatorFactory({ min: 2, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });

    it('should not error on equal values', () => {
      expect(minValidatorFactory({ min: 2, message: 'errMsg' })(new FieldControl(2))).toBeNull();
    });

    it('should not error on equal values when value is string', () => {
      expect(minValidatorFactory({ min: 2, message: 'errMsg' })(new FieldControl('2'))).toBeNull();
    });

    it('should return null if min value is undefined', () => {
      expect(minValidatorFactory({ min: undefined, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });

    it('should validate as expected when min value is a string', () => {
      expect(minValidatorFactory({ min: '2' as any, message: 'errMsg' })(new FieldControl(1))).toEqual({
        min: 'errMsg',
      });
    });

    it('should return null if min value is undefined', () => {
      expect(minValidatorFactory({ min: undefined as any, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });

    it('should return null if min value is null', () => {
      expect(minValidatorFactory({ min: null as any, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });
  });

  describe('maxValidatorFactory', () => {
    it('should not error on an empty string', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl(undefined))).toBeNull();
    });

    it('should return null if NaN after parsing', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl('aaa'))).toBeNull();
    });

    it('should not error on small float number validation', () => {
      expect(maxValidatorFactory({ max: 1.2, message: 'errMsg' })(new FieldControl(1.15))).toBeNull();
    });

    it('should not error on equal float values', () => {
      expect(maxValidatorFactory({ max: 1.25, message: 'errMsg' })(new FieldControl(1.25))).toBeNull();
    });

    it('should return a validation error on big values', () => {
      expect(maxValidatorFactory({ max: 1.25, message: 'errMsg' })(new FieldControl(1.3))).toEqual({
        max: 'errMsg',
      });
    });

    it('should return a validation error on big values', () => {
      expect(
        maxValidatorFactory({ max: 2, message: ({ max, actual }) => `max=${max},actual=${actual}` })(
          new FieldControl(3)
        )
      ).toEqual({
        max: 'max=2,actual=3',
      });
    });

    it('should return a validation error on big values converted from strings', () => {
      expect(
        maxValidatorFactory({ max: 2, message: ({ max, actual }) => `max=${max},actual=${actual}` })(
          new FieldControl('3')
        )
      ).toEqual({
        max: 'max=2,actual=3',
      });
    });

    it('should not error on small values', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl(1))).toBeNull();
    });

    it('should not error on equal values', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl(2))).toBeNull();
    });

    it('should not error on equal values when value is string', () => {
      expect(maxValidatorFactory({ max: 2, message: 'errMsg' })(new FieldControl('2'))).toBeNull();
    });

    it('should validate as expected when max value is a string', () => {
      expect(maxValidatorFactory({ max: '2' as any, message: 'errMsg' })(new FieldControl(3))).toEqual({
        max: 'errMsg',
      });
    });

    it('should return null if max value is undefined', () => {
      expect(maxValidatorFactory({ max: undefined as any, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });

    it('should return null if max value is null', () => {
      expect(maxValidatorFactory({ max: null as any, message: 'errMsg' })(new FieldControl(3))).toBeNull();
    });
  });

  describe('requiredValidatorFactory', () => {
    it('should error on an empty string', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl(''))).toEqual({ required: 'errMsg' });
    });

    it('should error on null', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl(null))).toEqual({ required: 'errMsg' });
    });

    it('should not error on undefined', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl(null))).toEqual({ required: 'errMsg' });
    });

    it('should not error on a non-empty string', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl('not empty'))).toBeNull();
    });

    it('should accept zero as valid', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl(0))).toBeNull();
    });

    it('should error on an empty array', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl([]))).toEqual({ required: 'errMsg' });
    });

    it('should not error on a non-empty array', () => {
      expect(requiredValidatorFactory({ message: 'errMsg' })(new FieldControl([1, 2]))).toBeNull();
    });
  });

  describe('requiredTrueValidatorFactory', () => {
    it('should error on false', () => {
      expect(requiredTrueValidatorFactory({ message: 'errMsg' })(new FieldControl(false))).toEqual({
        required: 'errMsg',
      });
    });

    it('should not error on true', () => {
      expect(requiredTrueValidatorFactory({ message: 'errMsg' })(new FieldControl(true))).toBeNull();
    });
  });

  describe('emailValidatorFactory', () => {
    it('should not error on an empty string', () => {
      expect(emailValidatorFactory({ message: 'errMsg' })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(emailValidatorFactory({ message: 'errMsg' })(new FieldControl(null))).toBeNull();
    });

    it('should error on invalid email', () => {
      expect(emailValidatorFactory({ message: 'errMsg' })(new FieldControl('some text'))).toEqual({ email: 'errMsg' });
    });

    it('should not error on valid email', () => {
      expect(emailValidatorFactory({ message: 'errMsg' })(new FieldControl('test@gmail.com'))).toBeNull();
    });
  });

  describe('minLengthValidatorFactory', () => {
    it('should not error on an empty string', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(new FieldControl(undefined))).toBeNull();
    });

    it('should not error on valid strings', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(new FieldControl('aa'))).toBeNull();
    });

    it('should error on short strings', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(new FieldControl('a'))).toEqual({
        minlength: 'errMsg',
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 2 })(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new ListControl([new FieldControl('')]);
      expect(
        minLengthValidatorFactory({
          message: ({ requiredLength, actualLength }) =>
            `requiredLength=${requiredLength},actualLength=${actualLength}`,
          minLength: 2,
        })(fa)
      ).toEqual({
        minlength: 'requiredLength=2,actualLength=1',
      });
    });

    it('should always return null with numeric values', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(0))).toBeNull();
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(1))).toBeNull();
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(-1))).toBeNull();
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(+1))).toBeNull();
    });

    it('should trigger validation for an object that contains numeric length property', () => {
      const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(value))).toBeNull();
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 10 })(new FieldControl(value))).toEqual({
        minlength: 'errMsg',
      });
    });

    it('should return null when passing a boolean', () => {
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(true))).toBeNull();
      expect(minLengthValidatorFactory({ message: 'errMsg', minLength: 1 })(new FieldControl(false))).toBeNull();
    });
  });

  describe('maxLength', () => {
    it('should not error on an empty string', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 2 })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 2 })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 2 })(new FieldControl(undefined))).toBeNull();
    });

    it('should not error on valid strings', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 2 })(new FieldControl('aa'))).toBeNull();
    });

    it('should error on long strings', () => {
      expect(
        maxLengthValidatorFactory({
          message: ({ actualLength, requiredLength }) =>
            `requiredLength=${requiredLength},actualLength=${actualLength}`,
          maxLength: 2,
        })(new FieldControl('aaa'))
      ).toEqual({
        maxlength: 'requiredLength=2,actualLength=3',
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 2 })(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(fa)).toEqual({
        maxlength: 'errMsg',
      });
    });

    it('should always return null with numeric values', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(0))).toBeNull();
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(1))).toBeNull();
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(-1))).toBeNull();
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(+1))).toBeNull();
    });

    it('should trigger validation for an object that contains numeric length property', () => {
      const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 10 })(new FieldControl(value))).toBeNull();
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(value))).toEqual({
        maxlength: 'errMsg',
      });
    });

    it('should return null when passing a boolean', () => {
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(true))).toBeNull();
      expect(maxLengthValidatorFactory({ message: 'errMsg', maxLength: 1 })(new FieldControl(false))).toBeNull();
    });
  });

  describe('pattern', () => {
    it('should not error on an empty string', () => {
      expect(patternValidatorFactory({ pattern: '[a-zA-Z ]+', message: 'errMsg' })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(patternValidatorFactory({ pattern: '[a-zA-Z ]+', message: 'errMsg' })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(
        patternValidatorFactory({ pattern: '[a-zA-Z ]+', message: 'errMsg' })(new FieldControl(undefined))
      ).toBeNull();
    });

    it('should not error on null value and "null" pattern', () => {
      expect(patternValidatorFactory({ pattern: 'null', message: 'errMsg' })(new FieldControl(null))).toBeNull();
    });

    it('should not error on valid strings', () =>
      expect(
        patternValidatorFactory({ pattern: '[a-zA-Z ]+', message: 'errMsg' })(new FieldControl('aaAA'))
      ).toBeNull());

    it('should error on failure to match string', () => {
      expect(
        patternValidatorFactory({
          pattern: '[a-zA-Z ]+',
          message: ({ actualValue, requiredPattern }) =>
            `requiredPattern=${requiredPattern},actualValue=${actualValue}`,
        })(new FieldControl('aaa0'))
      ).toEqual({
        pattern: 'requiredPattern=^[a-zA-Z ]+$,actualValue=aaa0',
      });
    });

    it('should accept RegExp object', () => {
      const pattern = /[a-zA-Z ]+/;
      expect(patternValidatorFactory({ pattern, message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull();
    });

    it('should error on failure to match RegExp object', () => {
      const pattern = /^[a-zA-Z ]*$/;
      expect(patternValidatorFactory({ pattern, message: 'errMsg' })(new FieldControl('aaa0'))).toEqual({
        pattern: 'errMsg',
      });
    });

    it('should not error on "null" pattern', () =>
      expect(patternValidatorFactory({ pattern: null!, message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());

    it('should not error on "undefined" pattern', () =>
      expect(patternValidatorFactory({ pattern: undefined!, message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing both boundary symbols', () =>
      expect(patternValidatorFactory({ pattern: '^[aA]*$', message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing only start boundary symbols', () =>
      expect(patternValidatorFactory({ pattern: '^[aA]*', message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing only end boundary symbols', () =>
      expect(patternValidatorFactory({ pattern: '[aA]*$', message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string not containing any boundary symbols', () =>
      expect(patternValidatorFactory({ pattern: '[aA]*', message: 'errMsg' })(new FieldControl('aaAA'))).toBeNull());
  });
});
