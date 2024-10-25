import { Board } from './Board';

import {
  renderWithProviders,
  setupStatusColumnHook,
  setupTicketContext,
} from '../../util/testUtils';

jest.mock('../../hooks/useStatusColumn');
jest.mock('../../context/TicketContext');
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
