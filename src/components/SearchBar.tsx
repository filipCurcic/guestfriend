import { ChangeEvent } from 'react';
import { useTokens } from '../theme/tokens';
import { useSearchContext } from '../context/SearchContext';

export const SearchBar = () => {
  const { setSearchTerm } = useSearchContext();
  const tokens = useTokens();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search.."
      onChange={handleChange}
      css={{
        width: '33%',
        alignSelf: 'flex-end',
        padding: tokens.space['small-xs'],
        border: 'none',
        borderBottom: `1px solid ${tokens.colors.gray200}`,
      }}
    />
  );
};
