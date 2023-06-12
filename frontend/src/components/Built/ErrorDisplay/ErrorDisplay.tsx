import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import './ErrorDisplay.css';

import { handleClearErrors, handleClearNestedErrors, palettes } from '@/utils';
import { Flexer } from '@/components/Containers';
import { ActionButton } from '@/components/Buttons';
import { Text } from '@/components/Elements';

interface ErrorDisplayProps {
  errors: any[];
  setErrors: any;
  nestedName?: string | null;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errors,
  setErrors,
  nestedName = null,
  mt: marginTop,
  mb: marginBottom,
}) => {
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
    <Flexer j="c" a="fs" fd="row" wrap mt={marginTop} mb={marginBottom} gap={8}>
      {errors.map((error, index) => (
        <div
          key={`error-${index}`}
          className="error-item"
          // style={{ height: `${maxHeight + 8}px` }}
        >
          <ActionButton
            size="t"
            fontSize="21px"
            className="error-clear-button"
            onClick={() => clearError(index)}
            type="cancel"
            iconColor={palettes.error.main}
            iconHoverColor={palettes.error.dark}
          />
          <div ref={(ref) => (contentRefs.current[index] = ref)} style={{ padding: 4 }}>
            <Flexer a="fs" j="fs" fd="column">
              <Text t="body1" s="1rem">
                Error: {index + 1}
              </Text>

              <Text t="body1" s="0.9rem">
                {error}
              </Text>
            </Flexer>
          </div>
        </div>
      ))}
    </Flexer>
  );
};

export default ErrorDisplay;
