import React, { useContext } from 'react';
import { GroupControl, GroupValue } from '@yzw-rx-form/core';

import { GroupInternalProps, GroupProps } from '../types';
import { isGroupWithNameProps } from '../utils';
import { useControlControls, useControlDisabled } from '../hooks';

import { ParentFormContext } from './context';

export const Group = <V extends GroupValue = any>(props: GroupProps<V>) => {
  const { children } = props;

  const parent = useContext(ParentFormContext);

  const { name = undefined, control } = isGroupWithNameProps(props)
    ? { name: props.name, control: parent!.get<GroupControl<V>>(props.name) }
    : { control: props.control };

  if (!(control instanceof GroupControl)) {
    throw new Error('props error:Group can only receive GroupControl as control');
  }
  const disabled = useControlDisabled(control);
  const controls = useControlControls<GroupControl<V>>(control);

  const childProps: GroupInternalProps<V> = {
    name,
    disabled,
    control,
    childControls: controls,
  };

  return <ParentFormContext.Provider value={control}>{children(childProps)}</ParentFormContext.Provider>;
};
