import { Board } from './Board';
import '@testing-library/jest-dom';
import {
  renderWithProviders,
  setupStatusColumnHook,
  setupTicketContext,
} from '../../util/testUtils';

jest.mock('../../context/TicketContext');
jest.mock('../../hooks/useStatusColumn');
jest.mock('../../context/SearchContext');

const renderBoard = () => {
  return renderWithProviders(<Board />);
};

describe('Board Component', () => {
  beforeEach(() => {
    setupStatusColumnHook();
    setupTicketContext();
  });
  it('should render StatusColumn for each status in columns', () => {
    renderBoard();
  });
});
