import { CustomTheme } from '../../../theme';
import { Color } from '../../../types/SharedTypes';

export type TypographyProps = {
  color?: Color;
  emphasis?: keyof CustomTheme['tokens']['emphasis'];
};
