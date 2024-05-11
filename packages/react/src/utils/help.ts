import { GroupValue } from '@yzw-rx-form/core';

import {
  ErrorProps,
  ErrorWithNameProps,
  FieldProps,
  FieldWithNameProps,
  GroupProps,
  GroupWithNameProps,
  ListProps,
  ListWithNameProps,
} from '../types';

export function isFieldWithNameProps<V>(props: FieldProps<V>): props is FieldWithNameProps<V> {
  return (props as FieldWithNameProps<V>).name !== undefined;
}

export const isGroupWithNameProps = <V extends GroupValue>(props: GroupProps<V>): props is GroupWithNameProps<V> => {
  return (props as GroupWithNameProps<V>).name !== undefined;
};

export const isListWithNameProps = <V>(props: ListProps<V>): props is ListWithNameProps<V> => {
  return (props as ListWithNameProps<V>).name !== undefined;
};

export function isErrorWithNameProps(props: ErrorProps): props is ErrorWithNameProps {
  return (props as ErrorWithNameProps).name !== undefined;
}

export const __throwRxFormReactError = (msg: string) => {
  throw new Error(`rx-form错误：${msg}`);
};
