import { ListControl, GroupControl, FieldControl, requiredValidator } from '../index';

describe('listControl', () => {
  it('should be created correctly', () => {
    const listControl = new ListControl([['Sam'], ['Amy']]);

    expect(listControl.value).toEqual(['Sam', 'Amy']);
  });

  it('should get child control when call get', () => {
    const listControl = new ListControl([['Sam'], ['Amy']]);

    expect(listControl.get(0)).toBe(listControl.controls[0]);
    expect(listControl.get(2)).toBeFalsy();
  });

  it('should set values correctly and trigger value change', () => {
    const listValueChangeCbSpy = jest.fn();
    const fieldValueChangeCbSpy = jest.fn();

    const listControl = new ListControl([['Sam'], ['Amy']]);

    listControl.valueChange.subscribe((v) => {
      listValueChangeCbSpy(v);
    });

    listControl.get(0).valueChange.subscribe((v) => {
      fieldValueChangeCbSpy(v);
    });

    listControl.setValue(['Jack']);
    expect(listControl.value).toEqual(['Jack', 'Amy']);
    expect(listValueChangeCbSpy).toBeCalledWith(['Jack', 'Amy']);
    expect(listValueChangeCbSpy).toBeCalledTimes(1);

    expect(fieldValueChangeCbSpy).toBeCalledWith('Jack');
    expect(fieldValueChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update controls and value when add controls', () => {
    const listValueChangeCbSpy = jest.fn();
    const controlsValueChangeCbSpy = jest.fn();

    const listControl = new ListControl([['Sam']]);

    listControl.valueChange.subscribe((v) => {
      listValueChangeCbSpy(v);
    });
    listControl.controlsChange.subscribe((v) => {
      controlsValueChangeCbSpy(v);
    });

    listControl.push(['Amy'], ['Tom']);

    expect(listControl.value).toEqual(['Sam', 'Amy', 'Tom']);
    expect(listValueChangeCbSpy).toBeCalledWith(['Sam', 'Amy', 'Tom']);
    expect(listValueChangeCbSpy).toBeCalledTimes(1);

    expect(controlsValueChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update controls and value when remove controls', () => {
    const listValueChangeCbSpy = jest.fn();
    const controlsValueChangeCbSpy = jest.fn();

    const listControl = new ListControl([['Sam'], ['Amy']]);

    listControl.valueChange.subscribe((v) => {
      listValueChangeCbSpy(v);
    });
    listControl.controlsChange.subscribe((v) => {
      controlsValueChangeCbSpy(v);
    });

    listControl.remove(1);

    expect(listControl.value).toEqual(['Sam']);
    expect(listValueChangeCbSpy).toBeCalledWith(['Sam']);
    expect(listValueChangeCbSpy).toBeCalledTimes(1);

    expect(controlsValueChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update value when child controller value change', () => {
    const listValueChangeCbSpy = jest.fn();

    const listControl = new ListControl([['Sam']]);

    listControl.valueChange.subscribe((v) => {
      listValueChangeCbSpy(v);
    });

    listControl.get(0).setValue('Tom');

    expect(listControl.value).toEqual(['Tom']);
    expect(listValueChangeCbSpy).toHaveBeenCalledWith(['Tom']);
    expect(listValueChangeCbSpy).toHaveBeenCalledTimes(1);
  });

  it('should reset all child controls when call reset', () => {
    const listValueChangeCbSpy = jest.fn();
    const fieldValueChangeCbSpy = jest.fn();

    const listControl = new ListControl([['Sam'], ['Amy']]);

    listControl.valueChange.subscribe((v) => {
      listValueChangeCbSpy(v);
    });

    listControl.get(0).valueChange.subscribe((v) => {
      fieldValueChangeCbSpy(v);
    });

    listControl.setValue(['Tom']);
    listControl.reset();

    expect(listControl.value).toEqual(['Sam', 'Amy']);
    expect(listValueChangeCbSpy).toHaveBeenCalledWith(['Sam', 'Amy']);
    expect(listValueChangeCbSpy).toHaveBeenCalledTimes(2);

    expect(fieldValueChangeCbSpy).toHaveBeenCalledWith('Sam');
    expect(fieldValueChangeCbSpy).toHaveBeenCalledTimes(2);
  });

  it('should get valid currently when nest children', () => {
    const listControl = new ListControl([
      new GroupControl({
        name: new FieldControl('', { validators: [requiredValidator] }),
      }),
    ]);

    expect(listControl.valid).toBe(false);
  });
});
