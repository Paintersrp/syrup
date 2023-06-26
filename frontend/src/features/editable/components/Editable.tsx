import { FC, ReactNode, useState } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { axios } from '@/lib/api';
import { useEditModeStore } from '@/stores/editmode';
import { CapitalizeFirst } from '@/utils';

import { FormGenerator } from './FormGenerator';
import { ButtonBar } from './ButtonBar';
import { ConfirmationModal } from './ConfirmationModal';
import { colors } from '@/theme/common';
import { Flexer } from '@/components/Containers';
import { FormSettings } from '../types';
import { useConfirm } from '@/hooks';

// Variants?
const defaultFormSettings = {
  px: 2,
  py: 2,
  br: 8,
  bg: colors.light,
  width: '90%',
  boxShadow: true,
};

interface EditableProps extends BaseProps {
  children: ReactNode;
  name: string;
  id?: number | string;
  data: any;
  endpoint: string;
  admin?: string | undefined;
  onUpdate: any;
  enableDelete?: boolean;
  editMenuPosition?: string;
  editMenuAlign?: any;
  fade?: boolean;
  formSettings?: FormSettings;
  multilineKeys?: any;
  excludeKeys?: any;
}

// Update data on delete ?

export const Editable: FC<EditableProps> = ({
  children,
  name,
  id = undefined,
  data,
  endpoint,
  admin,
  onUpdate,
  enableDelete = false,
  fade = true,
  editMenuPosition = 'top',
  editMenuAlign = 'flex-end',
  multilineKeys = [],
  excludeKeys = [],
  formSettings = defaultFormSettings,
  ...rest
}) => {
  const { editMode } = useEditModeStore();
  const [editing, setEditing] = useState(false);

  const { open, handleClose, handleConfirm, handleDelete } = useConfirm(endpoint);

  const handleUpdate = (data: any) => {
    onUpdate(data);
    setEditing(false);
  };

  const generateConfig = () => {
    const presetExcludeKeys = ['id', 'icon', 'image', 'set_name', 'page_link'];
    const presetMultilineKeys = ['description', 'bio'];

    const keys = {
      exclude: [
        ...Object.keys(data).filter((key) => presetExcludeKeys.includes(key)),
        ...excludeKeys,
      ],
      multiline: [...presetMultilineKeys, ...multilineKeys],
    };

    const iconMixin = 'icon' in data;
    const imageMixin = 'image' in data;
    const formattedName = CapitalizeFirst(name);

    return { formattedName, keys, iconMixin, imageMixin };
  };

  const { formattedName, keys, iconMixin, imageMixin } = generateConfig();

  const editMenuPos = editMenuPosition === 'top' ? 0 : 1;
  const childrenPos = editMenuPosition === 'top' ? 1 : 0;

  return (
    <Base j="c" a="c" d="flex" fd="column" br={8} {...rest}>
      {!editing ? (
        <Flexer fd="column" fade={fade}>
          <div css={{ order: editMenuPos }}>
            {editMode && (
              <ButtonBar
                justifyContent={editMenuAlign}
                editClick={() => setEditing(!editing)}
                deleteClick={enableDelete ? () => handleDelete(id) : undefined}
                text={formattedName}
                adminLink={admin}
                tooltipPosition="bottom"
                mt={8}
                obj={id ?? id}
              />
            )}
          </div>
          <div css={{ order: childrenPos, width: '100%' }}>{children}</div>
        </Flexer>
      ) : (
        <FormGenerator
          data={data}
          onUpdate={handleUpdate}
          handleCancel={() => setEditing(!editing)}
          imageMixin={imageMixin}
          iconMixin={iconMixin}
          endpoint={endpoint}
          excludeKeys={keys.exclude}
          multilineKeys={keys.multiline}
          title={`Edit ${id ? formattedName + ` #${id}` : formattedName}`}
          width={formSettings.width || defaultFormSettings.width}
          px={formSettings.px || defaultFormSettings.px}
          py={formSettings.py || defaultFormSettings.py}
          boxShadow={formSettings.boxShadow || defaultFormSettings.boxShadow}
          br={formSettings.br || defaultFormSettings.br}
          bg={formSettings.bg || defaultFormSettings.bg}
          fade={fade}
        />
      )}
      {enableDelete && (
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          message="Are you sure you want to delete this?"
          warning="Warning: This cannot be undone."
        />
      )}
    </Base>
  );
};
