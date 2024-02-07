import { Observable } from 'rxjs';

import { BaseControl } from '../controls/baseControl';
import { GroupControl } from '../controls/groupControl';
import { ListControl } from '../controls/listControl';

export type AbstractControl<V = any> = {
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

export interface ParentControl<CS = GroupChildControls | ListChildControls> extends AbstractControl {
  readonly controls: CS;
  readonly controlsChange: Observable<CS>;
  get: (name: any) => BaseControl;
  remove: (...params: any) => void;
}

export type GroupValue = {
  [key: string]: any;
};

export type GroupChildControls = {
  [key: string]: BaseControl<any>;
};

export type ListValue<V = any> = V[];

export type ListChildControls<V = any> = BaseControl<V>[];

export type Errors = {
  [key: string]: any;
};

// export type Valid = boolean | 'pending';
export type Valid = boolean;

export type ValidatorFn<V = any> = (control: BaseControl<V>) => Errors | null;

export type ErrorMessageFactory<E = Errors> = (errors: E | null) => string | undefined;
/**
 * @ValidatorMessageFactory
 * T {
 *     E 错误
 *     P 扩展参数
 * }
 */
export type ValidatorMessageFactory<T extends { E: Errors; P?: any } = undefined> = (
  params: T['P'] & {
    message: string | ErrorMessageFactory<T['E']>;
  }
) => ValidatorFn;

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

export type CreateControlParams<V = any> = BaseControl<V> | [value?: V, options?: FormControlOptions];

export type FormGroupControlsConfig = {
  [key: string]: CreateControlParams;
};

export type FormListControlsConfig = CreateControlParams[];
