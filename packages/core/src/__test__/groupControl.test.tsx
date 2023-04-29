import { GroupControl } from '../controls/groupControl';
import { requiredValidator } from '../validators';

describe('groupControl', () => {
  it('should be created correctly', () => {
    const groupControl = new GroupControl<{ name: string; address: string }>({
      name: ['Sam'],
      address: ['NY'],
    });

    expect(groupControl.value).toEqual({
      name: 'Sam',
      address: 'NY',
    });
  });

  it('should get value correctly given disabled sub children', () => {
    const groupControl = new GroupControl<{ name: string; address: string }>({
      name: ['Sam', { disabled: true }],
      address: ['NY'],
    });

    expect(groupControl.value).toEqual({
      name: 'Sam',
      address: 'NY',
    });
  });

  it('should get child control when call get', () => {
    const groupControl = new GroupControl({
      name: ['Sam'],
      address: ['NY'],
    });

    expect(groupControl.get('name')).toBe(groupControl.controls.name);
    expect(groupControl.get('noExist')).toBeFalsy();
  });

  it('should set values correctly and trigger value change', () => {
    const groupValueChangeCbSpy = jest.fn();
    const fieldValueChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam'],
      address: ['NY'],
    });

    groupControl.valueChange.subscribe((v) => {
      groupValueChangeCbSpy(v);
    });

    groupControl.get('name').valueChange.subscribe((v) => {
      fieldValueChangeCbSpy(v);
    });

    expect(groupControl.value).toEqual({
      name: 'Sam',
      address: 'NY',
    });

    groupControl.setValue({
      name: 'Amy',
    });

    expect(groupControl.value).toEqual({
      name: 'Amy',
      address: 'NY',
    });
    expect(groupValueChangeCbSpy).toBeCalledWith({
      name: 'Amy',
      address: 'NY',
    });
    expect(groupValueChangeCbSpy).toBeCalledTimes(1);

    expect(fieldValueChangeCbSpy).toBeCalledWith('Amy');
    expect(fieldValueChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update controls and value when remove a control', () => {
    const groupValueChangeCbSpy = jest.fn();
    const controlsChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam'],
      address: ['NY'],
    });

    groupControl.valueChange.subscribe((v) => {
      groupValueChangeCbSpy(v);
    });

    groupControl.controlsChange.subscribe((v) => {
      controlsChangeCbSpy(v);
    });

    groupControl.remove('address');

    expect(groupControl.value).toEqual({
      name: 'Sam',
    });
    expect(groupValueChangeCbSpy).toBeCalledWith({
      name: 'Sam',
    });

    expect(groupValueChangeCbSpy).toBeCalledTimes(1);
    expect(controlsChangeCbSpy).toBeCalledTimes(1);

    groupControl.remove('noExist');
    expect(groupValueChangeCbSpy).toBeCalledTimes(1);
    expect(controlsChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update controls and value when add a control', () => {
    const groupValueChangeCbSpy = jest.fn();
    const controlsChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam'],
    });

    groupControl.valueChange.subscribe((v) => {
      groupValueChangeCbSpy(v);
    });

    groupControl.controlsChange.subscribe((v) => {
      controlsChangeCbSpy(v);
    });

    groupControl.add('address', ['NY']);

    expect(groupControl.value).toEqual({
      name: 'Sam',
      address: 'NY',
    });
    expect(groupValueChangeCbSpy).toBeCalledWith({
      name: 'Sam',
      address: 'NY',
    });

    expect(groupValueChangeCbSpy).toBeCalledTimes(1);
    expect(controlsChangeCbSpy).toBeCalledTimes(1);

    // already has address
    groupControl.add('address', ['NY']);
    expect(groupValueChangeCbSpy).toBeCalledTimes(1);
    expect(controlsChangeCbSpy).toBeCalledTimes(1);
  });

  it('should update value when child controller value change', () => {
    const groupValueChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam'],
    });

    groupControl.valueChange.subscribe((v) => {
      groupValueChangeCbSpy(v);
    });

    groupControl.get('name').setValue('Amy');

    expect(groupControl.value).toEqual({
      name: 'Amy',
    });
    expect(groupValueChangeCbSpy).toBeCalledWith({
      name: 'Amy',
    });
    expect(groupValueChangeCbSpy).toBeCalledTimes(1);
  });

  it('should reset all child controls when call reset', () => {
    const groupValueChangeCbSpy = jest.fn();
    const fieldValueChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam'],
    });

    groupControl.valueChange.subscribe((v) => {
      groupValueChangeCbSpy(v);
    });

    groupControl.get('name').valueChange.subscribe((v) => {
      fieldValueChangeCbSpy(v);
    });

    groupControl.get('name').setValue('Amy');

    groupControl.reset();

    expect(groupControl.value).toEqual({
      name: 'Sam',
    });
    expect(groupValueChangeCbSpy).toBeCalledTimes(2);
    expect(groupValueChangeCbSpy).toBeCalledWith({
      name: 'Sam',
    });
    expect(fieldValueChangeCbSpy).toBeCalledTimes(2);
    expect(fieldValueChangeCbSpy).toBeCalledWith('Sam');
  });

  it('should set group to valid when one of child control is valid', () => {
    const groupValidChangeCbSpy = jest.fn();

    const groupControl = new GroupControl({
      name: ['Sam', { validators: [requiredValidator] }],
    });

    groupControl.validChange.subscribe((v) => {
      groupValidChangeCbSpy(v);
    });

    expect(groupControl.valid).toBe(true);

    groupControl.get('name').setValue('');
    expect(groupControl.valid).toBe(false);
    expect(groupValidChangeCbSpy).toBeCalledWith(false);
    expect(groupValidChangeCbSpy).toBeCalledTimes(1);
  });
});
