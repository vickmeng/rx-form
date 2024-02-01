import {
  ListControl,
  GroupControl,
  requiredValidatorFactory,
  FieldControl,
  deepCheckFirstInvalidControl,
} from '../index';

describe('help', () => {
  describe('deepCheckFirstInvalidControl', () => {
    it('should get null when deepCheckFirstInvalidControl called given valid FieldControl', () => {
      const fieldControl = new FieldControl('1', {
        validators: [requiredValidatorFactory({ message: '必填' })],
      });

      expect(deepCheckFirstInvalidControl([fieldControl])).toBeUndefined();
    });

    it('should get invalid control when deepCheckFirstInvalidControl called given invalid FieldControl', () => {
      const fieldControl = new FieldControl(undefined, {
        validators: [requiredValidatorFactory({ message: '必填' })],
      });

      expect(deepCheckFirstInvalidControl([fieldControl])).toBe(fieldControl);
    });

    it('should get invalid control when deepCheckFirstInvalidControl called given invalid GroupControl', () => {
      const groupControl = new GroupControl({
        a: ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
        b: ['', { validators: [requiredValidatorFactory({ message: '必填' })] }],
      });

      expect(deepCheckFirstInvalidControl([groupControl])).toBe(groupControl.get('b'));
    });

    it('should get null when deepCheckFirstInvalidControl called given valid ListControl', () => {
      const listControl = new ListControl([
        ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
        ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
      ]);

      expect(deepCheckFirstInvalidControl([listControl])).toBeUndefined();
    });

    it('should get invalid control when deepCheckFirstInvalidControl called given invalid ListControl', () => {
      const listControl = new ListControl([
        ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
        ['', { validators: [requiredValidatorFactory({ message: '必填' })] }],
      ]);

      expect(deepCheckFirstInvalidControl([listControl])).toBe(listControl.get(1));
    });

    it('should get invalid control when deepCheckFirstInvalidControl called given complex case', () => {
      const groupControl = new GroupControl({
        '0': ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
        '1': new GroupControl({
          '1-0': ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
          '1-1': new ListControl([
            ['123', { validators: [requiredValidatorFactory({ message: '必填' })] }],
            ['', { validators: [requiredValidatorFactory({ message: '必填' })] }],
          ]),
        }),
      });

      // @ts-ignore-next-line
      const errorControl = groupControl.get('1').get('1-1').get(1);

      expect(deepCheckFirstInvalidControl([groupControl])).toBe(errorControl);
    });
  });
});
