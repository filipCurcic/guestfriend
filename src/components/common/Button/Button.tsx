import { FC, PropsWithChildren } from 'react';

import { ButtonProps } from './Button.types';
import { StyledButton } from '../../../ui/Button';

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
export { Button };
