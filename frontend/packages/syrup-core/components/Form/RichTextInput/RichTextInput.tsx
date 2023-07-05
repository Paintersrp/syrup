/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { css } from '@emotion/react';
import { ExtendedTheme } from '../../../theme/types';
import { Base, BaseProps } from '../../../theme/base';
import { inject } from '../../../theme/utils';

const sizeMapping: any = {
  small: 200,
  medium: 400,
  large: 600,
};

const styles = (theme: ExtendedTheme) => ({
  quill: (size: string) =>
    css({
      marginBottom: 0,
      padding: 0,
      '& .ql-editor': {
        width: '100%',
        margin: '0 0 10px 0',
        background: theme.light,
      },
      '& .ql-toolbar': {
        background: theme.light,
      },
      '& .ql-container': {
        position: 'static',
        height: sizeMapping[size],
      },
    }),
});

interface RichTextInputProps extends BaseProps {
  fieldName?: string;
  value: string;
  onChange: any;
  modules?: Record<string, any>;
  formats?: string[];
  size?: 'small' | 'medium' | 'large';
}

export const RichTextInput: React.FC<RichTextInputProps> = ({
  fieldName,
  value,
  onChange,
  modules = {},
  formats = [],
  size = 'small',
  ...rest
}) => {
  const css = inject(styles);
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (value: string) => {
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  const handleAdminChange = (fieldValue: string) => {
    if (typeof onChange === 'function' && fieldName) {
      onChange({ fieldName, fieldValue });
    }
  };

  return (
    <Base w="100%" {...rest}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={fieldName ? handleAdminChange : handleChange}
        modules={modules}
        formats={formats}
        css={css.quill(size)}
      />
    </Base>
  );
};

RichTextInput.defaultProps = {
  modules: {
    toolbar: [
      [{ header: [3, 4, 5, 6, true] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
  formats: [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'font',
    'align',
    'size',
    'color',
    'background',
    'clean',
  ],
};
