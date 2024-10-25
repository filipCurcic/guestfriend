import { screen } from '@testing-library/react';
import { StatusColumn } from './StatusColumn';
import { StatusEnum, Ticket } from '../../types/SharedTypes';
import '@testing-library/jest-dom';
import {
  renderWithProviders,
  setupStatusColumnHook,
  setupTicketContext,
} from '../../util/testUtils';

jest.mock('../../hooks/useStatusColumn');
jest.mock('../../context/TicketContext');

const status = StatusEnum.TO_DO;

const mockFilteredTickets: Ticket[] = [
  { id: '1', content: 'Test Ticket 1', status },
  { id: '2', content: 'Test Ticket 2', status: StatusEnum.TO_DO },
];

const renderStatusColumn = (props = {}) => {
  return renderWithProviders(
    <StatusColumn status={status} tickets={mockFilteredTickets} {...props} />
  );
};

describe('StatusColumn Component', () => {
  beforeEach(() => {
    setupStatusColumnHook();
    setupTicketContext();
    renderStatusColumn();
  });

  it('should render the column title', () => {
    const column = screen.getByTestId('column-TO_DO');
    expect(column).toBeInTheDocument();
  });

  it('should render the correct number of tickets in the TicketsContainer', () => {
    const ticketsContainerElement = screen.getByText('(2)');
    expect(ticketsContainerElement).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
