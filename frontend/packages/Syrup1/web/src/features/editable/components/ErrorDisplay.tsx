import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Flexer, IconButton, Text } from 'sy-core';
import { handleClearErrors, handleClearNestedErrors } from '@/utils';

export const errorDisplayCx = {
  errorItem: (theme: any) => {
    return {
      display: 'flex',
      width: '48%',
      alignItems: 'flex-start',
      background: theme.errorNoticeBackground,
      border: theme.errorNoticeBorder,
      borderRadius: theme.sp(1),
      transition: 'transform 0.3s ease',
    };
  },
};

interface ErrorDisplayProps {
  errors: any[];
  setErrors: any;
  nestedName?: string | null;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  errors,
  setErrors,
  nestedName = null,
  mt: marginTop,
  mb: marginBottom,
}) => {
  const theme = useTheme();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let maxHeight = 0;
    contentRefs.current.forEach((ref) => {
      if (ref) {
        const height = ref.getBoundingClientRect().height;
        maxHeight = Math.max(maxHeight, height);
      }
    });
    setMaxHeight(maxHeight);
  }, [errors]);

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  const clearError = (index: number) => {
    if (nestedName) {
      handleClearNestedErrors(index, setErrors, nestedName);
    } else {
      handleClearErrors(index, errors, setErrors);
    }
  };

  return (
    <Flexer j="c" a="fs" fd="row" wrap mt={marginTop} mb={marginBottom} gap={6}>
      {errors.map((error, index) => (
        <div
          key={`error-${index}`}
          css={errorDisplayCx.errorItem(theme)}
          style={{ height: `${maxHeight + 8}px` }}
        >
          <div
            ref={(ref) => (contentRefs.current[index] = ref)}
            style={{ padding: '4px 0px 4px 4px', width: '100%' }}
          >
            <Flexer a="fs" j="fs" fd="column">
              <Text t="body1" s="1rem" fw="bolder">
                Error: {index + 1}
              </Text>

              <Text t="body1" s="0.95rem" fw="bold">
                {error}
              </Text>
            </Flexer>
          </div>
          <IconButton
            variant="float"
            palette="error"
            size="tiny"
            onClick={() => clearError(index)}
            icon="cancel"
          />
        </div>
      ))}
    </Flexer>
  );
};
