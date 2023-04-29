import {
  minValidator,
  maxValidator,
  requiredValidator,
  requiredTrueValidator,
  emailValidator,
  minLengthValidator,
  maxLengthValidator,
  patternValidator,
} from '../validators';
import { FieldControl } from '../controls/fieldControl';
import { ListControl } from '../controls/listControl';

describe('validators', () => {
  describe('minValidator', () => {
    it('should not error on an empty string', () => {
      expect(minValidator(2)(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(minValidator(2)(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(minValidator(2)(new FieldControl(undefined))).toBeNull();
    });

    it('should return null if NaN after parsing', () => {
      expect(minValidator(2)(new FieldControl('a'))).toBeNull();
    });

    it('should return a validation error on small values', () => {
      expect(minValidator(2)(new FieldControl(1))).toEqual({ min: { min: 2, actual: 1 } });
    });

    it('should return a validation error on small values converted from strings', () => {
      expect(minValidator(2)(new FieldControl('1'))).toEqual({ min: { min: 2, actual: '1' } });
    });

    it('should not error on small float number validation', () => {
      expect(minValidator(1.2)(new FieldControl(1.25))).toBeNull();
    });

    it('should not error on equal float values', () => {
      expect(minValidator(1.25)(new FieldControl(1.25))).toBeNull();
    });

    it('should return a validation error on big values', () => {
      expect(minValidator(1.25)(new FieldControl(1.2))).toEqual({
        min: { min: 1.25, actual: 1.2 },
      });
    });

    it('should not error on big values', () => {
      expect(minValidator(2)(new FieldControl(3))).toBeNull();
    });

    it('should not error on equal values', () => {
      expect(minValidator(2)(new FieldControl(2))).toBeNull();
    });

    it('should not error on equal values when value is string', () => {
      expect(minValidator(2)(new FieldControl('2'))).toBeNull();
    });

    it('should validate as expected when min value is a string', () => {
      expect(minValidator('2' as any)(new FieldControl(1))).toEqual({
        min: { min: '2', actual: 1 },
      });
    });

    it('should return null if min value is undefined', () => {
      expect(minValidator(undefined as any)(new FieldControl(3))).toBeNull();
    });

    it('should return null if min value is null', () => {
      expect(minValidator(null as any)(new FieldControl(3))).toBeNull();
    });
  });

  describe('maxValidator', () => {
    it('should not error on an empty string', () => {
      expect(maxValidator(2)(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(maxValidator(2)(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(maxValidator(2)(new FieldControl(undefined))).toBeNull();
    });

    it('should return null if NaN after parsing', () => {
      expect(maxValidator(2)(new FieldControl('aaa'))).toBeNull();
    });

    it('should not error on small float number validation', () => {
      expect(maxValidator(1.2)(new FieldControl(1.15))).toBeNull();
    });

    it('should not error on equal float values', () => {
      expect(maxValidator(1.25)(new FieldControl(1.25))).toBeNull();
    });

    it('should return a validation error on big values', () => {
      expect(maxValidator(1.25)(new FieldControl(1.3))).toEqual({
        max: { max: 1.25, actual: 1.3 },
      });
    });

    it('should return a validation error on big values', () => {
      expect(maxValidator(2)(new FieldControl(3))).toEqual({ max: { max: 2, actual: 3 } });
    });

    it('should return a validation error on big values converted from strings', () => {
      expect(maxValidator(2)(new FieldControl('3'))).toEqual({ max: { max: 2, actual: '3' } });
    });

    it('should not error on small values', () => {
      expect(maxValidator(2)(new FieldControl(1))).toBeNull();
    });

    it('should not error on equal values', () => {
      expect(maxValidator(2)(new FieldControl(2))).toBeNull();
    });

    it('should not error on equal values when value is string', () => {
      expect(maxValidator(2)(new FieldControl('2'))).toBeNull();
    });

    it('should validate as expected when max value is a string', () => {
      expect(maxValidator('2' as any)(new FieldControl(3))).toEqual({
        max: { max: '2', actual: 3 },
      });
    });

    it('should return null if max value is undefined', () => {
      expect(maxValidator(undefined as any)(new FieldControl(3))).toBeNull();
    });

    it('should return null if max value is null', () => {
      expect(maxValidator(null as any)(new FieldControl(3))).toBeNull();
    });
  });

  describe('requiredValidator', () => {
    it('should error on an empty string', () => {
      expect(requiredValidator(new FieldControl(''))).toEqual({ required: true });
    });

    it('should error on null', () => {
      expect(requiredValidator(new FieldControl(null))).toEqual({ required: true });
    });

    it('should not error on undefined', () => {
      expect(requiredValidator(new FieldControl(undefined))).toEqual({ required: true });
    });

    it('should not error on a non-empty string', () => {
      expect(requiredValidator(new FieldControl('not empty'))).toBeNull();
    });

    it('should accept zero as valid', () => {
      expect(requiredValidator(new FieldControl(0))).toBeNull();
    });

    it('should error on an empty array', () =>
      expect(requiredValidator(new FieldControl([]))).toEqual({ required: true }));

    it('should not error on a non-empty array', () => expect(requiredValidator(new FieldControl([1, 2]))).toBeNull());
  });

  describe('requiredTrueValidator', () => {
    it('should error on false', () => {
      expect(requiredTrueValidator(new FieldControl(false))).toEqual({ required: true });
    });

    it('should not error on true', () => {
      expect(requiredTrueValidator(new FieldControl(true))).toBeNull();
    });
  });

  describe('email', () => {
    it('should not error on an empty string', () => {
      expect(emailValidator(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(emailValidator(new FieldControl(null))).toBeNull();
    });

    it('should error on invalid email', () => {
      expect(emailValidator(new FieldControl('some text'))).toEqual({ email: true });
    });

    it('should not error on valid email', () => {
      expect(emailValidator(new FieldControl('test@gmail.com'))).toBeNull();
    });
  });

  describe('minLength', () => {
    it('should not error on an empty string', () => {
      expect(minLengthValidator(2)(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(minLengthValidator(2)(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(minLengthValidator(2)(new FieldControl(undefined))).toBeNull();
    });

    it('should not error on valid strings', () => {
      expect(minLengthValidator(2)(new FieldControl('aa'))).toBeNull();
    });

    it('should error on short strings', () => {
      expect(minLengthValidator(2)(new FieldControl('a'))).toEqual({
        minlength: { requiredLength: 2, actualLength: 1 },
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(minLengthValidator(2)(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new ListControl([new FieldControl('')]);
      expect(minLengthValidator(2)(fa)).toEqual({
        minlength: { requiredLength: 2, actualLength: 1 },
      });
    });

    it('should always return null with numeric values', () => {
      expect(minLengthValidator(1)(new FieldControl(0))).toBeNull();
      expect(minLengthValidator(1)(new FieldControl(1))).toBeNull();
      expect(minLengthValidator(1)(new FieldControl(-1))).toBeNull();
      expect(minLengthValidator(1)(new FieldControl(+1))).toBeNull();
    });

    it('should trigger validation for an object that contains numeric length property', () => {
      const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
      expect(minLengthValidator(1)(new FieldControl(value))).toBeNull();
      expect(minLengthValidator(10)(new FieldControl(value))).toEqual({
        minlength: { requiredLength: 10, actualLength: 5 },
      });
    });

    it('should return null when passing a boolean', () => {
      expect(minLengthValidator(1)(new FieldControl(true))).toBeNull();
      expect(minLengthValidator(1)(new FieldControl(false))).toBeNull();
    });
  });

  describe('maxLength', () => {
    it('should not error on an empty string', () => {
      expect(maxLengthValidator(2)(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(maxLengthValidator(2)(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(maxLengthValidator(2)(new FieldControl(undefined))).toBeNull();
    });

    it('should not error on valid strings', () => {
      expect(maxLengthValidator(2)(new FieldControl('aa'))).toBeNull();
    });

    it('should error on long strings', () => {
      expect(maxLengthValidator(2)(new FieldControl('aaa'))).toEqual({
        maxlength: { requiredLength: 2, actualLength: 3 },
      });
    });

    it('should not error when FormArray has valid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(maxLengthValidator(2)(fa)).toBeNull();
    });

    it('should error when FormArray has invalid length', () => {
      const fa = new ListControl([new FieldControl(''), new FieldControl('')]);
      expect(maxLengthValidator(1)(fa)).toEqual({
        maxlength: { requiredLength: 1, actualLength: 2 },
      });
    });

    it('should always return null with numeric values', () => {
      expect(maxLengthValidator(1)(new FieldControl(0))).toBeNull();
      expect(maxLengthValidator(1)(new FieldControl(1))).toBeNull();
      expect(maxLengthValidator(1)(new FieldControl(-1))).toBeNull();
      expect(maxLengthValidator(1)(new FieldControl(+1))).toBeNull();
    });

    it('should trigger validation for an object that contains numeric length property', () => {
      const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
      expect(maxLengthValidator(10)(new FieldControl(value))).toBeNull();
      expect(maxLengthValidator(1)(new FieldControl(value))).toEqual({
        maxlength: { requiredLength: 1, actualLength: 5 },
      });
    });

    it('should return null when passing a boolean', () => {
      expect(maxLengthValidator(1)(new FieldControl(true))).toBeNull();
      expect(maxLengthValidator(1)(new FieldControl(false))).toBeNull();
    });
  });

  describe('pattern', () => {
    it('should not error on an empty string', () => {
      expect(patternValidator('[a-zA-Z ]+')(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(patternValidator('[a-zA-Z ]+')(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(patternValidator('[a-zA-Z ]+')(new FieldControl(undefined))).toBeNull();
    });

    it('should not error on null value and "null" pattern', () => {
      expect(patternValidator('null')(new FieldControl(null))).toBeNull();
    });

    it('should not error on valid strings', () =>
      expect(patternValidator('[a-zA-Z ]*')(new FieldControl('aaAA'))).toBeNull());

    it('should error on failure to match string', () => {
      expect(patternValidator('[a-zA-Z ]*')(new FieldControl('aaa0'))).toEqual({
        pattern: { requiredPattern: '^[a-zA-Z ]*$', actualValue: 'aaa0' },
      });
    });

    it('should accept RegExp object', () => {
      const pattern = /[a-zA-Z ]+/;
      expect(patternValidator(pattern)(new FieldControl('aaAA'))).toBeNull();
    });

    it('should error on failure to match RegExp object', () => {
      const pattern = /^[a-zA-Z ]*$/;
      expect(patternValidator(pattern)(new FieldControl('aaa0'))).toEqual({
        pattern: { requiredPattern: '/^[a-zA-Z ]*$/', actualValue: 'aaa0' },
      });
    });

    it('should not error on "null" pattern', () =>
      expect(patternValidator(null!)(new FieldControl('aaAA'))).toBeNull());

    it('should not error on "undefined" pattern', () =>
      expect(patternValidator(undefined!)(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing both boundary symbols', () =>
      expect(patternValidator('^[aA]*$')(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing only start boundary symbols', () =>
      expect(patternValidator('^[aA]*')(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string containing only end boundary symbols', () =>
      expect(patternValidator('[aA]*$')(new FieldControl('aaAA'))).toBeNull());

    it('should work with pattern string not containing any boundary symbols', () =>
      expect(patternValidator('[aA]*')(new FieldControl('aaAA'))).toBeNull());
  });
});
