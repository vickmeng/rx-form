import { Observable } from 'rxjs';

import { AbstractControl } from '../controls/abstractControl';
import { GroupControl } from '../controls/groupControl';
import { ListControl } from '../controls/listControl';

export type AbstractControlSubset<V = any> = {
  value: V;
  errors: Errors | null;
  valid: boolean;
  invalid: boolean;
  disabled: boolean;
  enabled: boolean;
  dirty: boolean;
  pristine: boolean;
  parent?: GroupControl | ListControl;
  valueChange: Observable<V>;
  errorsChange: Observable<Errors | null>;
  validChange: Observable<boolean>;
  disabledChange: Observable<boolean>;
  dirtyChange: Observable<boolean>;
  // pristineChange: Observable<boolean>;
  setValue: (value: V) => void;
  reset: () => void;
  disable: () => void;
  enable: () => void;
  markAsDirty: () => void;
  markAsPristine: () => void;
  destroy: () => void;
  setValidators: (validators: ValidatorFn[]) => void;
  validateAndUpdateErrors: () => void;
};

export type GroupValue = {
  [key: string]: any;
};

export type GroupChildControls = {
  [key: string]: AbstractControl<any>;
};

export type ListValue<V = any> = V[];

export type ListChildControls<V = any> = AbstractControl<V>[];

export type Errors = {
  [key: string]: any;
};

// export type Valid = boolean | 'pending';
export type Valid = boolean;

export type ValidatorFn<V = any> = (control: AbstractControlSubset<V>) => Errors | null;

export type ErrorMessageFactory = (errors: Errors | null) => string | undefined;

export type ValidatorMessageFactory<V = any> = (params: {
  message: string | ErrorMessageFactory;
  [key: string]: any;
}) => ValidatorFn<V>;

// export type AsyncValidatorFn<V = any> = (control: AbstractControl<V>) => Promise<Errors | null>;

export interface ControlBasicOptions {
  disabled?: boolean;
  autoValidate?: boolean;
  validators?: ValidatorFn[];
  autoAsyncValidate?: boolean;
  // asyncValidators?: AsyncValidatorFn[];
  dirty?: boolean;
  autoMarkAsDirty?: boolean;
}

export type FormControlOptions = ControlBasicOptions;

export type FormGroupOptions = ControlBasicOptions;

export type FormListOptions = ControlBasicOptions;

export type CreateControlParams<V = any> = AbstractControl<V> | [value?: V, options?: FormControlOptions];

export type FormGroupControlsConfig = {
  [key: string]: CreateControlParams;
};

export type FormListControlsConfig = CreateControlParams[];

export interface ControlWithChildren<CS = GroupChildControls | ListChildControls> {
  readonly controls: CS;
  readonly controlsChange: Observable<CS>;
  get: (name: any) => AbstractControl;
  remove: (...params: any) => void;
}
