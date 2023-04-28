import React from 'react';
import { GroupControl, ListControl } from '@yzw-rx-form/core';

export const ParentFormContext = React.createContext<GroupControl | ListControl<any> | null>(null);
