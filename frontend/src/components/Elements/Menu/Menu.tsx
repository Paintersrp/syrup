import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  CSSProperties,
  FC,
  cloneElement,
  ReactElement,
  Children,
} from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from '@/theme/base';
import { inject } from '@/theme/utils';
import { Divider } from '../Divider/Divider';
import { Button } from '../../Buttons';

const styles = (theme: any) => ({
  root: css({
    position: 'relative',
    display: 'inline-block',
  }),
  container: (isOpen: boolean) =>
    css({
      position: 'absolute',
      background: theme.menuBackground,
      border: theme.menuBorder,
      boxShadow: theme.shadows[1],
      zIndex: 999,
      display: 'flex',
      borderRadius: 4,
      animation: isOpen ? theme.anim.fadeIn300 : undefined,
    }),
});

interface MenuProps extends BaseProps {
  children: ReactNode;
  position?: string;
  manualButton?: ReactNode;
  dividers?: boolean;
  buttonText?: string;
  style?: CSSProperties;
}

export const Menu: FC<MenuProps> = ({
  children,
  position = 'bottom',
  manualButton,
  dividers = false,
  buttonText = 'Open Menu',
  style,
  ...rest
}) => {
  const css = inject(styles);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const getMenuPosition = () => {
    return isOpen ? 'block' : 'none';
  };

  const getMenuStyle = () => {
    const menuStyle: any = {
      display: getMenuPosition(),
      ...style,
    };

    if (position.includes('top')) {
      menuStyle.bottom = '100%';
      menuStyle.marginBottom = '5px';
    } else {
      menuStyle.top = '100%';
      menuStyle.marginTop = '5px';
    }

    if (position.includes('left')) {
      menuStyle.left = '0';
      menuStyle.transform = 'translateX(-90%)';
    } else if (position.includes('right')) {
      menuStyle.right = '0';
      menuStyle.transform = 'translateX(90%)';
    } else {
      menuStyle.left = '50%';
      menuStyle.transform = 'translateX(-50%)';
    }

    return menuStyle;
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const renderChildren = Children.map(children, (child, index) => {
    const shouldRenderDivider = dividers && index !== 0;

    return (
      <>
        {shouldRenderDivider && <Divider />}
        {child}
      </>
    );
  });

  const menuStyle = getMenuStyle();

  return (
    <Base css={css.root} ref={dropdownRef} {...rest}>
      {manualButton ? (
        cloneElement(manualButton as ReactElement, {
          onClick: toggleDropdown,
        })
      ) : (
        <Button size="sm" onClick={toggleDropdown}>
          {buttonText}
        </Button>
      )}
      <div css={[css.container(isOpen), [menuStyle]]}>{renderChildren}</div>
    </Base>
  );
};

