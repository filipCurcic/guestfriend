import { tokens } from '../theme/base';

export enum StatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Ticket = {
  id: string;
  title: string;
  category: StatusEnum;
};

export type Color = keyof typeof tokens.colors;

export type Status = {
  title: string;
  headerColor: Color;
  ticketColor: Color;
  containerColor: Color;
};
