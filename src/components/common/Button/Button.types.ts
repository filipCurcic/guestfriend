import { ButtonHTMLAttributes } from 'react';
import { Tokens } from '../../../theme/tokens';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof Tokens['size'];
  color?: keyof Tokens['colors'];
};
