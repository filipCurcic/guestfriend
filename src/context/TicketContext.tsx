import { createContext, useCallback, useContext, useState } from 'react';
import { StatusEnum, Ticket } from '../types/SharedTypes';

type TicketContextType = {
  tickets: Ticket[] | [];
  addTicket: (ticketContent: string, category: StatusEnum) => void;
  removeTicket: (ticketId: string) => void;
  updateTicket: (
    ticketId: string,
    updatedContent: Partial<Omit<Ticket, 'id'>>
  ) => void;
};

export const TicketContext = createContext<TicketContextType>({
  tickets: [] as Ticket[],
  addTicket: () => {},
  removeTicket: () => {},
  updateTicket: () => {},
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

  const addTicket = useCallback((ticketContent: string, status: StatusEnum) => {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title: ticketContent,
      status,
    };
    setTickets((prevTickets) => {
      return [...prevTickets, newTicket];
    });
  }, []);

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
  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        removeTicket,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
