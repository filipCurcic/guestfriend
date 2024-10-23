import { tokens } from '../theme/base';

export enum StatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Ticket = {
  id: string;
  content: string;
  status: StatusEnum;
};

export type Column = {
  [key in StatusEnum]: {
    id: StatusEnum;
    ticketIds: string[];
  };
};

export type Board = {
  tickets: { [key: string]: Ticket };
  columns: Column;
  search: string;
};

export type Color = keyof typeof tokens.colors;

export type Status = {
  title: string;
  headerColor: Color;
  ticketColor: Color;
  containerColor: Color;
};

export enum SortableTypeEnum {
  TICKET = 'TICKET',
  COLUMN = 'COLUMN',
}

export type ActiveItem = {
  id: string;
  content: string;
  backgroundColor: string;
  status: StatusEnum;
};
