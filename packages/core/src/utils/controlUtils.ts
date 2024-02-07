import { CreateControlParams } from '../types';
import { BaseControl } from '../controls/baseControl';
import { FieldControl } from '../controls/fieldControl';

/**
 * createControl
 * Accept the Control instance as input and return it itself; otherwise, accept the parameters to construct a FieldControl and return the constructed FieldControl
 */
export const createControl = (params: CreateControlParams) => {
  if (params instanceof BaseControl) {
    return params;
  } else {
    return new FieldControl(...params);
  }
};
