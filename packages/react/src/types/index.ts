import { ReactElement } from 'react';
import {
  BaseControl,
  FieldControl,
  GroupControl,
  ListControl,
  GroupChildControls,
  Errors,
  ListChildControls,
  Valid,
  GroupValue,
} from '@yzw-rx-form/core';

export interface ItemBasicProps<P> {
  children: (props: P) => ReactElement;
}

export interface ItemWithNameProps<P> extends ItemBasicProps<P> {
  name: string;
}

export interface ItemWithControlProps<P, C extends BaseControl<any>> extends ItemBasicProps<P> {
  control: C;
}

/**
 * start
 * Field
 */

export interface FieldInternalProps<V = any> {
  name?: string;
  control: FieldControl;
  value: V;
  setValue: FieldControl<V>['setValue'];
  markAsDirty: FieldControl<V>['markAsDirty'];
  markAsPristine: FieldControl<V>['markAsPristine'];
  validateAndUpdateErrors: FieldControl<V>['validateAndUpdateErrors'];
  disabled: boolean;
  errors: Errors | null;
  asyncErrors?: Errors | null;
  valid: Valid;
  dirty: boolean;
}

export type FieldWithNameProps<V = any> = ItemWithNameProps<FieldInternalProps<V>>;
export type FieldWithControlProps<V = any> = ItemWithControlProps<FieldInternalProps<V>, FieldControl<V>>;

export type FieldProps<V = any> = FieldWithNameProps<V> | FieldWithControlProps<V>;

/**
 * end
 */

/**
 * start
 * Group
 */
export interface GroupInternalProps<V extends GroupValue> {
  name?: string;
  disabled: boolean;
  control: GroupControl<V>;
  childControls?: GroupChildControls;
}

export type GroupWithNameProps<V extends GroupValue> = ItemWithNameProps<GroupInternalProps<V>>;
export type GroupWithControlProps<V extends GroupValue> = ItemWithControlProps<GroupInternalProps<V>, GroupControl<V>>;

export type GroupProps<V extends GroupValue = any> = GroupWithNameProps<V> | GroupWithControlProps<V>;
/**
 * end
 */

/**
 * start
 * List
 */
export interface ListInternalProps<V> {
  name?: string;
  control: ListControl<V>;
  disabled: boolean;
  childControls?: ListChildControls<V>;
}

export type ListWithNameProps<V> = ItemWithNameProps<ListInternalProps<V>>;
export type ListWithControlProps<V> = ItemWithControlProps<ListInternalProps<V>, ListControl<V>>;

export type ListProps<V = any> = ListWithNameProps<V> | ListWithControlProps<V>;
/**
 * end
 */

/**
 * start
 * Error
 */

export interface ErrorInternalProps {
  name?: string;
  errors: Errors | null;
  valid: Valid;
  dirty: boolean;
  disabled: boolean;
  control: BaseControl<any>;
}
export type ErrorWithNameProps = ItemWithNameProps<ErrorInternalProps>;
export type ErrorWithControlProps = ItemWithControlProps<ErrorInternalProps, BaseControl>;

export type ErrorProps = ErrorWithNameProps | ErrorWithControlProps;
