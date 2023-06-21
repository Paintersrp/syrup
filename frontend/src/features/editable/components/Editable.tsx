import { CSSProperties, FC, Fragment, ReactNode, useState } from 'react';

import { Base, BaseProps } from '@/theme/base';
import { axios } from '@/lib/api';
import { useEditModeStore } from '@/stores/editmode';
import { CapitalizeFirst } from '@/utils';

import { FormGenerator } from './FormGenerator';
import { ButtonBar } from './ButtonBar';
import { ConfirmationModal } from './ConfirmationModal';

// Variants?
const defaultFormSettings = {
  px: 1.5,
  py: 1.5,
  br: 6,
  width: '90%',
  title: 'Edit Content',
  boxShadow: true,
};

type FormSettings = {
  px: number;
  py: number;
  br: CSSProperties['borderRadius'];
  width: CSSProperties['width'];
  title: string;
  boxShadow: boolean;
};

interface EditableProps extends BaseProps {
  children: ReactNode;
  name: string;
  id?: number;
  data: any;
  endpoint: string;
  admin?: string | undefined;
  onUpdate: any;
  enableDelete?: boolean;
  editMenuPos?: 'flex-end';
  fade?: boolean;
  formSettings?: FormSettings;
}

export const Editable: FC<EditableProps> = ({
  children,
  name,
  id,
  data,
  endpoint,
  admin,
  onUpdate,
  enableDelete = false,
  editMenuPos = 'flex-end',
  fade = false,
  formSettings = defaultFormSettings,
  ...rest
}) => {
  const { editMode } = useEditModeStore();
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleUpdate = (data: any) => {
    onUpdate(data);
    setEditing(false);
  };

  const handleDelete = (id: number | undefined) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    setOpen(false);
  };

  const confirmedDelete = async (id: number | undefined) => {
    if (id) {
      await axios.delete(endpoint);
    }
  };

  const generateConfig = () => {
    const presetExcludeKeys = ['id', 'icon', 'image'];
    const excludeKeys = Object.keys(data).filter((key) => presetExcludeKeys.includes(key));
    const iconMixin = 'icon' in data;
    const imageMixin = 'image' in data;
    const formattedName = CapitalizeFirst(name);

    return { formattedName, excludeKeys, iconMixin, imageMixin };
  };

  const { formattedName, excludeKeys, iconMixin, imageMixin } = generateConfig();

  return (
    <Base j="c" a="c" d="flex" fd="column" {...rest}>
      {!editing ? (
        <Fragment>
          {editMode && (
            <ButtonBar
              justifyContent={editMenuPos}
              editClick={() => setEditing(!editing)}
              deleteClick={enableDelete ? () => handleDelete(id) : undefined}
              text={id ? formattedName + ` #${id}` : formattedName}
              adminLink={admin}
              tooltipPosition="bottom"
              mt={8}
            />
          )}
          {children}
        </Fragment>
      ) : (
        <FormGenerator
          onUpdate={handleUpdate}
          data={data}
          handleCancel={() => setEditing(!editing)}
          imageMixin={imageMixin}
          iconMixin={iconMixin}
          endpoint={endpoint}
          excludeKeys={excludeKeys}
          title={`Edit ${formattedName} #${id}`}
          width={formSettings.width}
          px={formSettings.px}
          py={formSettings.py}
          boxShadow={formSettings.boxShadow}
          br={formSettings.br}
          fade={fade}
        />
      )}
      {enableDelete && (
        <ConfirmationModal
          open={open}
          handleClose={() => setOpen(false)}
          handleConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this?"
          warning="Warning: This cannot be undone."
        />
      )}
    </Base>
  );
};
