import { useState } from 'react';
import { FormSettings } from '../types';

interface EditableConfig<T> {
  name: string;
  data: T;
  id?: number;
  endpoint: string;
  onUpdate: (updatedData: T) => void;
  enableDelete?: boolean;
  fade?: boolean;
  editMenuPosition?: 'top' | 'bottom';
  editMenuAlign?: 'flex-start' | 'center' | 'flex-end';
  excludeKeys?: Array<keyof T>;
  multilineKeys?: Array<keyof T>;
  formSettings?: FormSettings;
}

// enable delete on id

export const useEditable = <T,>({
  name,
  endpoint,
  data,
  id = undefined,
  editMenuPosition = 'top',
  editMenuAlign = 'flex-end',
  excludeKeys = [],
  multilineKeys = [],
  formSettings = {},
}: Omit<EditableConfig<T>, 'onUpdate'>) => {
  const [editableData, setEditableData] = useState(data);

  const updateData = (updatedData: T) => {
    setEditableData(updatedData);
  };

  const editConfig: EditableConfig<T> = {
    name,
    data: editableData,
    id: id ?? id,
    endpoint: id ? `${endpoint}${id}/` : `${endpoint}`,
    onUpdate: updateData,
    enableDelete: id ? true : false,
    fade: true,
    editMenuPosition,
    editMenuAlign,
    excludeKeys,
    multilineKeys,
    formSettings: {
      ...formSettings,
    },
  };

  return [editableData, editConfig] as const;
};
