import React, { useContext } from 'react';
import { ListControl } from '@yzw-rx-form/core';

import { isListWithNameProps } from '../utils';
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
    throw new Error('props error:List can only receive ListControl as control');
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
