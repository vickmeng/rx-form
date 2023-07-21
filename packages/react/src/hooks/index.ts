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

export const useControlValue = <C extends AbstractControl>(
  control?: C
): C extends AbstractControl ? C['value'] : undefined => {
  const [value, setValue] = useState<C['value'] | undefined>(control?.value);

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
};

export const useControlDisabled = (control?: AbstractControl): boolean => {
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
};

export const useControlDirty = (control?: AbstractControl): boolean => {
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
};

export const useControlValid = (control?: AbstractControl): AbstractControl['valid'] => {
  const [valid, setValid] = useState<AbstractControl['valid']>(control ? control?.valid : true);

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
};

export const useControlErrors = (control?: AbstractControl): Errors | null => {
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
};

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

export const useControlControls = <C extends GroupControl | ListControl>(control?: C): C['controls'] | undefined => {
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
};
