import { useEffect, useRef, useState } from 'react';
import { AbstractControl, GroupControl, ListControl, Errors } from '@yzw-rx-form/core';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line
  }, deps);
};

/**
 * useControlValue start
 */
function useControlValue(): undefined;
// eslint-disable-next-line no-redeclare
function useControlValue<C extends AbstractControl>(control: C): C['value'];

// eslint-disable-next-line no-redeclare
function useControlValue(control?: AbstractControl) {
  const [value, setValue] = useState(control?.value);

  useEffect(() => {
    const subscriber = control?.valueChange.subscribe(setValue);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setValue(control?.value);
  }, [control]);

  return value;
}
/**
 * useControlValue end
 */

/**
 * useControlDisabled start
 */
function useControlDisabled(): false;
// eslint-disable-next-line no-redeclare
function useControlDisabled(control: AbstractControl): boolean;
// eslint-disable-next-line no-redeclare
function useControlDisabled(control?: AbstractControl): boolean {
  const [disabled, setDisabled] = useState<boolean>(!!control?.disabled);

  useEffect(() => {
    const subscriber = control?.disabledChange.subscribe(setDisabled);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setDisabled(!!control?.disabled);
  }, [control]);

  return disabled;
}
/**
 * useControlDisabled end
 */

/**
 * useControlDirty start
 */
function useControlDirty(): false;
// eslint-disable-next-line no-redeclare
function useControlDirty(control: AbstractControl): boolean;
// eslint-disable-next-line no-redeclare
function useControlDirty(control?: AbstractControl): boolean {
  const [dirty, setDirty] = useState<boolean>(!!control?.dirty);

  useEffect(() => {
    const subscriber = control?.dirtyChange.subscribe(setDirty);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setDirty(!!control?.dirty);
  }, [control]);

  return dirty;
}
/**
 * useControlDirty end
 */

/**
 * useControlValid start
 */
function useControlValid(): false;
// eslint-disable-next-line no-redeclare
function useControlValid(control: AbstractControl): boolean;
// eslint-disable-next-line no-redeclare
function useControlValid(control?: AbstractControl): AbstractControl['valid'] {
  const [valid, setValid] = useState<AbstractControl['valid']>(control ? control?.valid : false);

  useEffect(() => {
    const subscriber = control?.validChange.subscribe(setValid);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setValid(control ? control?.valid : true);
  }, [control]);

  return valid;
}
/**
 * useControlValid end
 */

/**
 * useControlErrors start
 */
function useControlErrors(): null;
// eslint-disable-next-line no-redeclare
function useControlErrors(control: AbstractControl): Errors | null;
// eslint-disable-next-line no-redeclare
function useControlErrors(control?: AbstractControl): Errors | null {
  const [errors, setErrors] = useState<Errors | null>(control?.errors || null);

  useEffect(() => {
    const subscriber = control?.errorsChange.subscribe(setErrors);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setErrors(control?.errors || null);
  }, [control]);

  return errors;
}
/**
 * useControlErrors end
 */

// export const useControlAsyncErrors = (control?: AbstractControl) => {
//   const [asyncErrors, setAsyncErrors] = useState(control?.asyncErrors);
//
//   useEffect(() => {
//     const subscriber = control?.asyncErrorsChange.subscribe(setAsyncErrors);
//     return () => {
//       subscriber?.unsubscribe();
//     };
//   }, [control]);
//
//   useUpdateEffect(() => {
//     setAsyncErrors(control?.asyncErrors);
//   }, [control]);
//
//   return asyncErrors;
// };

/**
 * useControlControls start
 */
function useControlControls(): undefined;
// eslint-disable-next-line no-redeclare
function useControlControls<C extends GroupControl | ListControl>(control: C): C['controls'];
// eslint-disable-next-line no-redeclare
function useControlControls<C extends GroupControl | ListControl>(control?: C): C['controls'] | undefined {
  const [controls, setControls] = useState<C['controls'] | undefined>(control?.controls);

  useEffect(() => {
    // @ts-ignore
    const subscriber = control?.controlsChange.subscribe(setControls);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [control]);

  useUpdateEffect(() => {
    setControls(control?.controls);
  }, [control]);

  return controls;
}
/**
 * useControlControls end
 */

export { useControlValue, useControlDisabled, useControlControls, useControlErrors, useControlValid, useControlDirty };
