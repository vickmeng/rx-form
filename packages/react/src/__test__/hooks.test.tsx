import { act, renderHook } from '@testing-library/react';
import { FieldControl, AbstractControl, requiredValidator, GroupControl, AsyncValidatorFn } from '@yzw-rx-form/core';

import {
  useControlAsyncErrors,
  useControlControls,
  useControlDirty,
  useControlDisabled,
  useControlErrors,
  useControlValid,
  useControlValue,
} from '../index';

describe('hooks', () => {
  it('useControlValue', () => {
    let control: undefined | AbstractControl = new FieldControl('Vick');

    const { result, rerender } = renderHook(() => useControlValue(control));

    expect(result.current).toBe('Vick');

    act(() => {
      control!.setValue('Tom');
    });

    expect(result.current).toBe('Tom');

    control = new FieldControl('Bob');
    rerender();

    expect(result.current).toBe('Bob');

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });

  it('useControlDisabled', () => {
    let control: undefined | AbstractControl = new FieldControl('', { disabled: true });

    const { result, rerender } = renderHook(() => useControlDisabled(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.enable();
    });

    expect(result.current).toBe(false);

    control = new FieldControl('', { disabled: true });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(false);
  });

  it('useControlDirty', () => {
    let control: undefined | AbstractControl = new FieldControl('', { dirty: true });

    const { result, rerender } = renderHook(() => useControlDirty(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.markAsPristine();
    });

    expect(result.current).toBe(false);

    control = new FieldControl('', { dirty: true });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(false);
  });

  it('useControlValid', () => {
    let control: undefined | AbstractControl = new FieldControl('', {});

    const { result, rerender } = renderHook(() => useControlValid(control));

    expect(result.current).toBe(true);

    act(() => {
      control!.setValidators([requiredValidator]);
    });

    expect(result.current).toBe(false);

    control = new FieldControl('', { validators: [] });
    rerender();

    expect(result.current).toBe(true);

    control = undefined;
    rerender();

    expect(result.current).toBe(true);
  });

  it('useControlErrors', () => {
    let control: undefined | AbstractControl = new FieldControl('', {});

    const { result, rerender } = renderHook(() => useControlErrors(control));

    expect(result.current).toEqual(null);

    act(() => {
      control!.setValidators([requiredValidator]);
    });

    expect(result.current).toEqual({ required: true });

    control = new FieldControl('', { validators: [] });
    rerender();

    expect(result.current).toEqual(null);

    control = undefined;
    rerender();

    expect(result.current).toBe(null);
  });

  it('useControlControls', () => {
    let control: undefined | GroupControl = new GroupControl({ name: ['Vick'] });

    const { result, rerender } = renderHook(() => useControlControls(control));

    expect(result.current!.name?.value).toBe('Vick');

    control = new GroupControl({ name: ['Bob'] });
    rerender();

    expect(result.current!.name?.value).toBe('Bob');

    control = undefined;
    rerender();

    expect(result.current).toBe(undefined);
  });

  it('useControlAsyncErrors', () => {
    const asyncValidator: AsyncValidatorFn<string> = (control) => {
      return new Promise((resolve) => {
        if (control.value === 'error') {
          resolve({ existed: true });
        } else {
          resolve(null);
        }
      });
    };

    const control: undefined | AbstractControl = new FieldControl('error', {
      asyncValidators: [asyncValidator],
      autoAsyncValidate: true,
    });

    const { result, rerender } = renderHook(useControlAsyncErrors, { initialProps: control });

    expect(result.current).toBe(null);

    act(async () => {
      await Promise.resolve().then().catch();
      expect(result.current).toEqual({ existed: true });
    });

    act(async () => {
      control.setValue('');
      await Promise.resolve().then().catch();
      expect(result.current).toEqual(null);
    });

    act(async () => {
      rerender(undefined);
      await Promise.resolve().then().catch();
      expect(result.current).toBe(undefined);
    });
  });
});
