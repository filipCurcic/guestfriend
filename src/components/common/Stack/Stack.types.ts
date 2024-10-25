import { HTMLAttributes, PropsWithChildren } from 'react';
import { Property } from 'csstype';
import { CustomTheme } from '../../../theme';

type Direction = 'horizontal' | 'vertical';

export type StackProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    direction?: Direction;
    center?: boolean;
    justify?: Property.JustifyContent;
    align?: Property.AlignItems;
    gap?: keyof CustomTheme['tokens']['space'];
  }
>;
