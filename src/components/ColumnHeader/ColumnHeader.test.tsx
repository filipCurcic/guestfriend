import { screen, fireEvent } from '@testing-library/react';
import { ColumnHeader } from './ColumnHeader';
import { useTicketContext } from '../../context/TicketContext';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../util/testUtils';
import { StatusEnum } from '../../types/SharedTypes';

jest.mock('../../context/TicketContext');

const mockAddTicket = jest.fn();

const mockContextValue = {
  addTicket: mockAddTicket,
};

(useTicketContext as jest.Mock).mockReturnValue(mockContextValue);

const renderColumnHeader = (props = {}) => {
  return renderWithProviders(
    <ColumnHeader
      title="Test Column"
      numberOfTickets={0}
      backgroundColor="gray200"
      status={StatusEnum.TO_DO}
      {...props}
    />
  );
};

describe('ColumnHeader Component', () => {
  beforeEach(() => {
    renderColumnHeader();
  });

  it('should render the column title', () => {
    const titleElement = screen.getByTestId('columnHeader-TO_DO');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Column');
  });

  it('should render the ticket count', () => {
    const ticketCountElement = screen.getByText('(0)');
    expect(ticketCountElement).toBeInTheDocument();
  });

  it('should call addTicket when the button is clicked', () => {
    const buttonElement = screen.getByTestId('add-TO_DO');
    fireEvent.click(buttonElement);
    expect(mockAddTicket).toHaveBeenCalledTimes(1);
    expect(mockAddTicket).toHaveBeenCalledWith('', 'TO_DO', expect.any(String));
  });

  it('should render the button for adding new tickets', () => {
    const buttonElement = screen.getByTestId('add-TO_DO');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('+');
  });
});
