import { ReactNode, CSSProperties, FC, Children, isValidElement, cloneElement } from 'react';
import { Base, BaseProps } from '@/theme/base';

interface ContainerProps extends BaseProps {
  children: ReactNode;
  direction?: CSSProperties['flexDirection'];
  textAlign?: CSSProperties['textAlign'];
  style?: CSSProperties;
  spacing?: number;
  className?: string;
}

interface ChildProps {
  style?: CSSProperties;
  className?: string;
}

export const Container: FC<ContainerProps> = ({
  children,
  direction = 'row',
  textAlign = 'left',
  style,
  spacing = 0,
  className,
  ...rest
}) => {
  const childrenWithSpacing = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const childClassName = child.props.className;
      const childHasItemClass = childClassName && childClassName.includes('item');

      const style = childHasItemClass
        ? { ...child.props.style, padding: `${spacing * 4}px` }
        : child.props.style;

      const props: ChildProps = { style, className: childClassName };

      return cloneElement(child, props);
    }
    return child;
  });

  return (
    <Base
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: direction,
        textAlign,
        ...style,
      }}
      {...rest}
    >
      {childrenWithSpacing}
    </Base>
  );
};
