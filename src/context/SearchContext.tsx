import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { debounce } from '../util/debounce';

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  clearSearch: () => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
  clearSearch: () => {},
});

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }
  return context;
};

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSetSearchTerm = debounce((term: string) => {
    setSearchTerm(term);
  });

  const handleChange = useCallback(
    (searchTerm: string) => {
      debouncedSetSearchTerm(searchTerm);
    },
    [debouncedSetSearchTerm]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const contextValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm: handleChange,
      clearSearch,
    }),
    [searchTerm, handleChange, clearSearch]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
