import { HTMLAttributes, PropsWithChildren } from 'react';
import { Tokens } from '../../../theme/tokens';
import { Property } from 'csstype';

type spacing = keyof Tokens['space'];

export type StackProps = PropsWithChildren<
  {
    gap?: spacing;
    padding?: spacing;
  } & (DirectionHorizontal | DirectionVertical | Centered) &
    (Partial<withContentDistribution> | Centered) &
    HTMLAttributes<HTMLDivElement>
>;

type DirectionVertical = {
  vertical: true;
  horizontal?: never;
  center?: never;
};

type DirectionHorizontal = {
  horizontal: true;
  vertical?: never;
  center?: never;
};

type Centered = {
  center: true;
  horizontal?: never;
  vertical?: never;
  justify?: never;
  align?: never;
};

type withContentDistribution = {
  justify: justifyProperties;
  align: alignProperties;
  center?: never;
};

type justifyProperties = Property.JustifyContent;

type alignProperties = Property.AlignItems;
