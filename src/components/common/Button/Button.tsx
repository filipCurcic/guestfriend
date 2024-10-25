import { FC, PropsWithChildren } from 'react';

import { ButtonProps } from './Button.types';
import { StyledButton } from '../../../ui/Button';

/**
 * __Button__
 *
 * Transparent, borderless button component with styles open for extension
 *
 * @example <Button onClick={fn}> Click </Button>
 * @example <Button css={{backgroundColor: 'red'}}> Click </Button>
 *
 *
 */

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
export { Button };
