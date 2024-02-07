import { FieldControl, minValidatorFactory } from '../index';

describe('validatorFactories', () => {
  describe('minValidatorFactory', () => {
    it('should not error on an empty string', () => {
      expect(minValidatorFactory({ message: 'errorMsg', min: 2 })(new FieldControl(''))).toBeNull();
    });

    it('should not error on null', () => {
      expect(minValidatorFactory({ message: 'errorMsg', min: 2 })(new FieldControl(null))).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(minValidatorFactory({ message: 'errorMsg', min: 2 })(new FieldControl(undefined))).toBeNull();
    });

    it('should return null if NaN after parsing', () => {
      expect(minValidatorFactory({ message: 'errorMsg', min: 2 })(new FieldControl('a'))).toBeNull();
    });

    it('should return a validation error on small values', () => {
      expect(minValidatorFactory({ message: 'errorMsg', min: 2 })(new FieldControl(1))).toEqual({ min: 'errorMsg' });
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
      expect(minValidatorFactory({ min: 1.2, message: 'errorMsg' })(new FieldControl(1.25))).toBeNull();
    });

    it('should not error on equal float values', () => {
      expect(minValidatorFactory({ min: 1.25, message: 'errorMsg' })(new FieldControl(1.25))).toBeNull();
    });

    it('should return a validation error on big values', () => {
      expect(minValidatorFactory({ min: 1.25, message: 'errorMsg' })(new FieldControl(1.2))).toEqual({
        min: 'errorMsg',
      });
    });

    it('should not error on big values', () => {
      expect(minValidatorFactory({ min: 2, message: 'errorMsg' })(new FieldControl(3))).toBeNull();
    });

    it('should not error on equal values', () => {
      expect(minValidatorFactory({ min: 2, message: 'errorMsg' })(new FieldControl(2))).toBeNull();
    });

    it('should not error on equal values when value is string', () => {
      expect(minValidatorFactory({ min: 2, message: 'errorMsg' })(new FieldControl('2'))).toBeNull();
    });
    it('should return null if min value is undefined', () => {
      expect(minValidatorFactory({ min: undefined, message: 'errorMsg' })(new FieldControl(3))).toBeNull();
    });
  });
});
