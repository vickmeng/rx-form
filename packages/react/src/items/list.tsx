import React, { useContext } from 'react';
import { GroupControl, ListControl } from '@rx-form/core';

import { __throwRxFormReactError, isListWithNameProps } from '../utils';
import { ListInternalProps, ListProps } from '../types';
import { useControlControls, useControlDisabled } from '../hooks';

import { ParentFormContext } from './context';

export const List = <V,>(props: ListProps<V>) => {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  const { name = undefined, control } = isListWithNameProps(props)
    ? { name: props.name, control: parent!.get<ListControl<V>>(props.name) }
    : { control: props.control };

  if (!(control instanceof ListControl)) {
    __throwRxFormReactError(`List组件控制器绑定错误，当前name为${name}`);
  }

  const disabled = useControlDisabled(control);
  const controls = useControlControls<ListControl<V>>(control);

  const childProps: ListInternalProps<V> = {
    name,
    disabled,
    control,
    childControls: controls,
  };

  return <ParentFormContext.Provider value={control}>{children(childProps)}</ParentFormContext.Provider>;
};
