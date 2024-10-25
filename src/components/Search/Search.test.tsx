import { fireEvent, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { useSearchContext } from '../../context/SearchContext';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../util/testUtils';

jest.mock('../../context/SearchContext');

const mockSetSearchTerm = jest.fn();
const renderSearch = () =>
  renderWithProviders(<SearchBar />, { withDragContext: false });

(useSearchContext as jest.Mock).mockReturnValue({
  setSearchTerm: mockSetSearchTerm,
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    renderSearch();
  });

  it('should render the search input', () => {
    const inputElement = screen.getByTestId('search');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'search');
    expect(inputElement).toHaveAttribute('placeholder', 'Search..');
  });

  it('should call setSearchTerm on input change', () => {
    const inputElement = screen.getByLabelText('Search');
    fireEvent.change(inputElement, { target: { value: 'test search' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
  });

  it('should update search term when input changes', () => {
    const inputElement = screen.getByLabelText('Search');
    fireEvent.change(inputElement, { target: { value: 'another search' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('another search');
  });
});
