import { map, merge, Observable, Subject, Subscription, takeUntil } from 'rxjs';

import {
  CreateControlParams,
  FormGroupControlsConfig,
  FormGroupOptions,
  GroupChildControls,
  GroupValue,
  ParentControl,
  Valid,
} from '../types';
import { createControl } from '../utils/controlUtils';

import { BaseControl } from './baseControl';

export class GroupControl<V extends GroupValue = any>
  extends BaseControl<V>
  implements ParentControl<GroupChildControls>
{
  get controls() {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: GroupChildControls;

  private controlsSubject = new Subject<GroupChildControls>();

  /**
   * @private controlsChangeNotifyLock
   * Prevent frequent triggering of ValueChangeCallback when setting Value
   */
  private valueChangesSubscription!: Subscription;
  private validChangesSubscription!: Subscription;

  /**
   * has group level error or has invalid controls
   */
  override _noError = () => {
    return !(this.errors || Object.values(this._controls).some((control) => !control._noError()));
  };

  constructor(controlsConfig: FormGroupControlsConfig, options: FormGroupOptions = {}) {
    super();
    this.initControls(controlsConfig);
    this.initBasicParams(this.getGroupValueFromControls(), options);

    this.resetGraph();
    this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  override setValue = (value: Partial<V>) => {
    /**
     * destroyGraph avoid multiple trigger group valueChange
     */
    this.destroyGraph();

    this.setValueToControls(value);

    this.resetGraph();
    this.valueSubject$.next(this.getGroupValueFromControls());
  };

  override reset = () => {
    this.destroyGraph();

    Object.values(this.controls).forEach((control) => control.reset());

    this.resetGraph();
    this.valueSubject$.next(this.getGroupValueFromControls());
  };

  get = <C extends BaseControl<any>>(name: string): C => {
    return this._controls[name] as C;
  };

  add = (name: string, params: CreateControlParams) => {
    /**
     * reject control of the same name
     */
    if (this.controls[name]) {
      // eslint-disable-next-line no-console
      console.warn(`already has control named ${name} in formGroup`);
      return;
    }

    const controls = Object.assign({}, this.controls, {
      [name]: createControl(params),
    });

    this.controlsSubject.next(controls);
  };

  remove = (name: string) => {
    /**
     * reject control of the same name
     */
    if (!this.controls[name]) {
      // eslint-disable-next-line no-console
      console.warn(`cannot find control named ${name} in formGroup`);
      return;
    }

    const controls = Object.assign({}, this.controls);
    delete controls[name];

    this.controlsSubject.next(controls);
  };

  private initControls = (controlsConfig: FormGroupControlsConfig) => {
    const controls: GroupChildControls = {};

    for (const controlKey in controlsConfig) {
      if (Object.prototype.hasOwnProperty.call(controlsConfig, controlKey)) {
        const config = controlsConfig[controlKey];
        const childControl = createControl(config);
        childControl.parent = this;
        controls[controlKey] = childControl;
      }
    }

    this._controls = controls;
  };

  private setValueToControls = (value: Partial<V>) => {
    Object.keys(this._controls).forEach((name) => {
      const hasKey = Object.prototype.hasOwnProperty.call(value, name);
      hasKey && this._controls[name].setValue(value[name]);
    });
  };

  private updatePrivateControlsAndResetSubscribeGraph = (controls: GroupChildControls) => {
    this._controls = controls;
    this.valueSubject$.next(this.getGroupValueFromControls());
    this.resetGraph();
  };

  private getGroupValueFromControls = () => {
    const value = {} as V;
    Object.keys(this._controls).forEach((name) => {
      const control = this._controls[name];
      Object.assign(value, { [name]: control.value });
    });
    return value;
  };

  /**
   * build the flow of group and children controls
   */
  private resetGraph = () => {
    const controls = Object.values(this._controls);
    const valueChanges = controls.map((control) => control.valueChange);
    const validChanges = controls.map((control) => control.validChange);
    const disabledChanges = controls.map((control) => control.disabledChange);

    this.resetValueGraph([...valueChanges, ...disabledChanges]);
    this.resetValidGraph(validChanges);
  };

  /**
   * break the relationship with children controllers
   */
  private destroyGraph = () => {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    if (this.validChangesSubscription) {
      this.validChangesSubscription.unsubscribe();
    }
  };

  private resetValueGraph(changes: Observable<any>[]) {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.valueChangesSubscription = merge(...changes)
      .pipe(
        takeUntil(this.destroy$),
        map(() => this.getGroupValueFromControls())
      )
      .subscribe((v) => {
        this.valueSubject$.next(v);
      });
  }

  private resetValidGraph = (validChanges: Observable<Valid>[]) => {
    if (this.validChangesSubscription) {
      this.validChangesSubscription.unsubscribe();
    }

    this.validChangesSubscription = merge(...validChanges)
      .pipe(
        takeUntil(this.destroy$),
        map(() => this._noError())
      )
      .subscribe(this.setValid);
  };
}
