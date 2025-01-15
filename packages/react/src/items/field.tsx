import { useContext } from 'react';
import { FieldControl } from '@rx-form/core';

import { FieldInternalProps, FieldProps } from '../types';
import { __throwRxFormReactError, isFieldWithNameProps } from '../utils';
import { useControlDirty, useControlDisabled, useControlErrors, useControlValid, useControlValue } from '../hooks';

import { ParentFormContext } from './context';

export function Field<V>(props: FieldProps<V>) {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  /**
   * Two ways can get formControl,from props or Context
   */
  const { name = undefined, control } = isFieldWithNameProps<V>(props)
    ? { name: props.name, control: parent!.get<FieldControl<V>>(props.name) }
    : { control: props.control };

  if (!(control instanceof FieldControl)) {
    __throwRxFormReactError(`Field组件控制器绑定错误，当前name为${name}`);
  }

  const value = useControlValue<FieldControl<V>>(control);
  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const valid = useControlValid(control);
  const errors = useControlErrors(control);
  // const asyncErrors = useControlAsyncErrors(control);

  const childrenProps: FieldInternalProps = {
    name,
    value,
    control,
    setValue: control.setValue,
    markAsDirty: control.markAsDirty,
    markAsPristine: control.markAsPristine,
    validateAndUpdateErrors: control.validateAndUpdateErrors,
    errors,
    // asyncErrors,
    disabled,
    valid,
    dirty,
  };

  return children(childrenProps);
}
