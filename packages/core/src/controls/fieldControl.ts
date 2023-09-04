import { FormControlOptions } from '../types';

import { AbstractControl } from './abstractControl';

export class FieldControl<V = any> extends AbstractControl<V> {
  private readonly _initValue!: V;

  override _noError = () => !this.errors;
  constructor(value: V, options: FormControlOptions = {}) {
    super();
    this._initValue = value;
    this.initBasicParams(value, options);
  }

  override setValue = (value: V) => {
    /**
     * start
     * distinct value change
     *
     * decide to not put this logic in valueChange pipeline, two reason as below
     * 1.cannot work when call setValue the first time
     * 2.will trigger the diff fn in each subscribe place, it is redundant
     *
     * Same thing with errorsChange and validChange
     */
    if (value === this.value) {
      return;
    }
    /**
     * end
     */
    this.valueSubject$.next(value);
  };

  override reset = () => {
    this.setValue(this._initValue);
  };
}
