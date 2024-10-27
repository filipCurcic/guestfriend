import { ElementType, FC } from 'react'
import { type TypographyProps } from './Typography.types'
import { StyledTypography } from '../../../ui/Typography'

/**
 * __Typography__
 *
 * Polymorphic typography component
 *
 * @param color sets the color of the text
 * @param as sets the element for the Typography component to be rendered as, defaults to a <p> tag
 *
 * @example <Typography color="red200"> Lorem ipsum </Typography>
 * @example <Typography as="h2"> Lorem ipsum </Typography>
 *
 *
 */

type TypographyComponent = typeof StyledTypography & {
    <C extends ElementType = 'p'>(
        props: { as?: C } & TypographyProps &
            Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyProps>
    ): FC
}

const Typography = StyledTypography as TypographyComponent

export { Typography }
