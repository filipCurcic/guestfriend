import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { StatusEnum, type Ticket } from '../types/SharedTypes';
import { useSearchContext } from './SearchContext';

type TicketContextType = {
  tickets: Ticket[] | [];
  addTicket: (ticketContent: string, category: StatusEnum, id: string) => void;
  removeTicket: (ticketId: string) => void;
  updateTicket: (
    ticketId: string,
    updatedContent: Partial<Omit<Ticket, 'id'>>
  ) => void;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
};

export const TicketContext = createContext<TicketContextType>({
  tickets: [] as Ticket[],
  addTicket: () => {},
  removeTicket: () => {},
  updateTicket: () => {},
  onSearchChange: () => {},
  searchTerm: '',
});

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error(
      'useTicketContext must be used within a TicketContextProvider'
    );
  }
  return context;
};

export const TicketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const { setSearchTerm, searchTerm, clearSearch } = useSearchContext();

  const addTicket = useCallback(
    (ticketContent: string, status: StatusEnum, id: string) => {
      const newTicket: Ticket = {
        title: ticketContent,
        id,
        status,
      };
      setTickets((prevTickets) => {
        return [...prevTickets, newTicket];
      });
      clearSearch();
    },
    [clearSearch]
  );

  const removeTicket = useCallback(
    (ticketId: string) => {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);
    },
    [tickets]
  );

  const updateTicket = useCallback(
    (ticketId: string, updatedContent: Partial<Omit<Ticket, 'id'>>) => {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, ...updatedContent } : ticket
        )
      );
    },
    []
  );

  const filteredTickets = useMemo(() => {
    if (!searchTerm) return tickets;
    return tickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tickets, searchTerm]);

  const contextValue = useMemo(
    () => ({
      tickets: filteredTickets,
      addTicket,
      removeTicket,
      updateTicket,
      onSearchChange: setSearchTerm,
      searchTerm,
    }),
    [
      filteredTickets,
      addTicket,
      removeTicket,
      updateTicket,
      setSearchTerm,
      searchTerm,
    ]
  );

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};
