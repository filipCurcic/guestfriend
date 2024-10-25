import { ChangeEvent, FC } from 'react';

import { useSearchContext } from '../../context/SearchContext';

import { StyledSearchInput } from '../../ui/SearchBar';

export const SearchBar: FC = () => {
  const { setSearchTerm } = useSearchContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <StyledSearchInput
      type="search"
      placeholder="Search.."
      aria-label="Search"
      onChange={handleChange}
    />
  );
};
