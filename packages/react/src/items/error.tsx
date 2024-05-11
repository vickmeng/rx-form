import { useContext } from 'react';
import { BaseControl, GroupControl } from '@yzw-rx-form/core';

import { ErrorInternalProps, ErrorProps } from '../types';
import { __throwRxFormReactError, isErrorWithNameProps } from '../utils';
import { useControlDirty, useControlDisabled, useControlErrors, useControlValid } from '../hooks';

import { ParentFormContext } from './context';

export const Error = (props: ErrorProps) => {
  const { children } = props;

  const parentGroup = useContext(ParentFormContext);

  const { name = undefined, control } = isErrorWithNameProps(props)
    ? { name: props.name, control: parentGroup!.get<GroupControl>(props.name) }
    : { control: props.control };

  if (!(control instanceof BaseControl)) {
    __throwRxFormReactError(`Error组件控制器绑定错误，当前name为${name}`);
  }

  const disabled = useControlDisabled(control);
  const dirty = useControlDirty(control);
  const errors = useControlErrors(control);
  const valid = useControlValid(control);

  const childrenProps: ErrorInternalProps = {
    name,
    control,
    errors,
    disabled,
    valid,
    dirty,
  };
  return children(childrenProps);
};
