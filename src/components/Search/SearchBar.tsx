import { ChangeEvent, FC } from 'react'

import { useSearchContext } from '../../context/SearchContext'

import { StyledSearchInput } from '../../ui/SearchBar'

/**
 * __SearchBar__
 *
 * @component
 * Search input component that sets the searchTerm context value
 *
 */

export const SearchBar: FC = () => {
    const { setSearchTerm } = useSearchContext()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        setSearchTerm(searchTerm)
    }

    return (
        <StyledSearchInput
            type="search"
            placeholder="Search.."
            aria-label="Search"
            onChange={handleChange}
        />
    )
}
