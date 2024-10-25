import { useState, useCallback } from 'react'

/**
 * __useTicketState__
 *
 * Hook that returns isHovered and isContentEditable states and handler functions
 *
 *
 * @example const {
 *       isHovered,
 *       isContentEditable,
 *       handleHoverEffects,
 *       toggleContentEditable,
 *   } = useTicketState()
 *
 */

export const useTicketState = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [isContentEditable, setIsContentEditable] = useState(false)

    const handleHoverEffects = useCallback((event: 'enter' | 'leave') => {
        setIsHovered(event === 'enter')
    }, [])

    const toggleContentEditable = useCallback(() => {
        setIsContentEditable((prev) => !prev)
    }, [])

    return {
        isHovered,
        isContentEditable,
        handleHoverEffects,
        toggleContentEditable,
    }
}
