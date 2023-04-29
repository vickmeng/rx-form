import { FieldControl } from '../controls/fieldControl';
import { emailValidator, requiredValidator } from '../validators';

describe('fieldControl', () => {
  it('should be created correctly', () => {
    const fieldControl = new FieldControl(null, { validators: [requiredValidator], disabled: true });

    expect(fieldControl.value).toBe(null);
    expect(fieldControl.errors).toEqual({ required: true });
    expect(fieldControl.valid).toBe(false);
    expect(fieldControl.invalid).toBe(true);
    expect(fieldControl.disabled).toBe(true);
    expect(fieldControl.enabled).toBe(false);
  });

  it('should updateValue and trigger valueChange correctly', () => {
    const valueChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('');
    fieldControl.valueChange.subscribe((v) => {
      valueChangeCbSpy(v);
    });

    expect(fieldControl.value).toBe('');

    fieldControl.setValue('a');

    expect(fieldControl.value).toBe('a');

    expect(valueChangeCbSpy).toBeCalledTimes(1);
    expect(valueChangeCbSpy).toBeCalledWith('a');

    // set same value will not trigger valueChange
    fieldControl.setValue('a');
    expect(valueChangeCbSpy).toBeCalledTimes(1);
    expect(fieldControl.value).toBe('a');
  });

  it('should trigger dirtyChange when updateValue given autoMarkAsDirty is false correctly', () => {
    const dirtyChangeSpy = jest.fn();

    const fieldControl = new FieldControl('');
    fieldControl.dirtyChange.subscribe((v) => {
      dirtyChangeSpy(v);
    });
    expect(fieldControl.dirty).toBe(false);
    expect(fieldControl.pristine).toBe(true);

    fieldControl.setValue('a');
    expect(dirtyChangeSpy).toBeCalledTimes(1);
    expect(dirtyChangeSpy).toBeCalledWith(true);
    expect(fieldControl.dirty).toBe(true);
    expect(fieldControl.pristine).toBe(false);
  });

  it('should not trigger dirtyChange when updateValue given autoMarkAsDirty is true correctly', () => {
    const dirtyChangeSpy = jest.fn();

    const fieldControl = new FieldControl('', { autoMarkAsDirty: false });

    fieldControl.dirtyChange.subscribe((v) => {
      dirtyChangeSpy(v);
    });

    expect(fieldControl.dirty).toBe(false);
    expect(fieldControl.pristine).toBe(true);

    fieldControl.setValue('a');

    expect(dirtyChangeSpy).not.toBeCalled();

    expect(fieldControl.dirty).toBe(false);
    expect(fieldControl.pristine).toBe(true);
  });

  it('should switch dirty status when markAsDirty or markAsPristine called', () => {
    const dirtyChangeSpy = jest.fn();

    const fieldControl = new FieldControl('', { dirty: false });

    fieldControl.dirtyChange.subscribe((v) => {
      dirtyChangeSpy(v);
    });

    expect(fieldControl.dirty).toBe(false);

    fieldControl.markAsDirty();
    expect(fieldControl.dirty).toBe(true);
    expect(fieldControl.pristine).toBe(false);
    expect(dirtyChangeSpy).toBeCalledTimes(1);
    expect(dirtyChangeSpy).toBeCalledWith(true);

    fieldControl.markAsPristine();
    expect(fieldControl.dirty).toBe(false);
    expect(fieldControl.pristine).toBe(true);
    expect(dirtyChangeSpy).toBeCalledTimes(2);
    expect(dirtyChangeSpy).toBeCalledWith(false);

    fieldControl.markAsPristine();
    expect(dirtyChangeSpy).toBeCalledTimes(2);
  });

  it('should handle validators and trigger errors change when setValue given error value', () => {
    const errorsChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('1', { validators: [emailValidator] });
    fieldControl.errorsChange.subscribe((v) => {
      errorsChangeCbSpy(v);
    });

    expect(fieldControl.errors).toEqual({ email: true });

    fieldControl.setValue('1@1.com');
    expect(fieldControl.errors).toEqual(null);
    expect(errorsChangeCbSpy).toBeCalledTimes(1);
    expect(errorsChangeCbSpy).toBeCalledWith(null);
    fieldControl.setValue('2@1.com');
    expect(fieldControl.errors).toEqual(null);
    expect(errorsChangeCbSpy).toBeCalledTimes(1);
  });

  it('should switch disable statue when enable or disable called', () => {
    const disableChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl(null);

    fieldControl.disabledChange.subscribe((v) => {
      disableChangeCbSpy(v);
    });

    expect(fieldControl.enabled).toBe(true);

    fieldControl.disable();
    expect(fieldControl.enabled).toBe(false);
    expect(fieldControl.disabled).toBe(true);
    expect(disableChangeCbSpy).toBeCalledTimes(1);
    expect(disableChangeCbSpy).toBeCalledWith(true);

    fieldControl.disable();
    expect(disableChangeCbSpy).toBeCalledTimes(1);

    fieldControl.enable();
    expect(fieldControl.enabled).toBe(true);
    expect(fieldControl.disabled).toBe(false);
    expect(disableChangeCbSpy).toBeCalledTimes(2);
    expect(disableChangeCbSpy).toBeCalledWith(false);
  });

  it('should reset value correctly', () => {
    const valueChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('');

    fieldControl.valueChange.subscribe((v) => {
      valueChangeCbSpy(v);
    });

    fieldControl.setValue('1');

    fieldControl.reset();

    expect(fieldControl.value).toBe('');
    expect(valueChangeCbSpy).toBeCalledWith('');
    expect(valueChangeCbSpy).toBeCalledTimes(2);
  });

  it('should re-valid when call setValidators', () => {
    const errorsChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('');

    fieldControl.errorsChange.subscribe((v) => {
      errorsChangeCbSpy(v);
    });

    expect(fieldControl.valid).toBe(true);

    fieldControl.setValidators([requiredValidator]);

    expect(errorsChangeCbSpy).toBeCalledTimes(1);
    expect(fieldControl.errors).toEqual({ required: true });
    expect(fieldControl.valid).toBe(false);
  });

  it('should not re-valid when call setValidators given autoValidate is a false', () => {
    const errorsChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('', { autoValidate: false });

    fieldControl.errorsChange.subscribe((v) => {
      errorsChangeCbSpy(v);
    });

    expect(fieldControl.valid).toBe(true);

    fieldControl.setValidators([requiredValidator]);

    expect(errorsChangeCbSpy).toBeCalledTimes(0);
    expect(fieldControl.errors).toBe(null);
    expect(fieldControl.valid).toBe(true);
  });

  it('should not re-valid when call setValidators given autoValidate is false', () => {
    const errorsChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('', { autoValidate: false });

    fieldControl.errorsChange.subscribe((v) => {
      errorsChangeCbSpy(v);
    });

    expect(fieldControl.valid).toBe(true);

    fieldControl.setValidators([requiredValidator]);

    expect(errorsChangeCbSpy).toBeCalledTimes(0);
    expect(fieldControl.errors).toEqual(null);
    expect(fieldControl.valid).toBe(true);
  });

  it('should break observable objs when destroy called', () => {
    const valueChangeCbSpy = jest.fn();

    const fieldControl = new FieldControl('');
    fieldControl.valueChange.subscribe((v) => {
      valueChangeCbSpy(v);
    });

    fieldControl.destroy();

    fieldControl.setValue('1');
    expect(valueChangeCbSpy).toBeCalledTimes(0);
  });
});
