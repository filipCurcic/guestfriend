import { ChangeEvent } from 'react';

import { useSearchContext } from '../context/SearchContext';

import { useTokens } from '../theme/tokens';

export const SearchBar = () => {
  const { setSearchTerm } = useSearchContext();
  const tokens = useTokens();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <input
      type="search"
      placeholder="Search.."
      aria-label="Search"
      onChange={handleChange}
      css={{
        width: '33%',
        padding: tokens.space['small-xs'],
        border: 'none',
        borderBottom: `1px solid ${tokens.colors.gray200}`,
        marginLeft: 'auto',
      }}
    />
  );
};
