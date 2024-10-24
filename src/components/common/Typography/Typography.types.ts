import { Tokens } from '../../../theme/tokens';

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type AsProp<C extends React.ElementType> = {
  as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type TypographyProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      color?: keyof Tokens['colors'];
      emphasis?: keyof Tokens['emphasis'];
    }
  >;

export type TypographyComponent = <C extends React.ElementType = 'p'>(
  props: TypographyProps<C>
) => React.ReactElement;
