import { useEffect, useState } from 'react';
import { FormSettings } from '../types';

interface EditableConfig<T> {
  name: string;
  data: T;
  id?: number | string;
  endpoint: string;
  onUpdate: (updatedData: T) => void;
  fade?: boolean;
  enableDelete?: boolean;
  editMenuPosition?: 'top' | 'bottom';
  editMenuAlign?: 'flex-start' | 'center' | 'flex-end';
  excludeKeys?: Array<keyof T>;
  multilineKeys?: Array<keyof T>;
  formSettings?: FormSettings;
}

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

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const updateData = (updatedData: T) => {
    setEditableData(updatedData);
  };

  const finalEndpoint = id ? `${endpoint}${id}/` : `${endpoint}`;
  const enableDelete = id ? true : false;

  const editConfig: EditableConfig<T> = {
    name,
    data: editableData,
    id: id ?? id,
    endpoint: finalEndpoint,
    onUpdate: updateData,
    fade: true,
    enableDelete,
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
