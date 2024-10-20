import { createContext, useContext } from 'react';
import { tokens } from './base';

export type Tokens = typeof tokens;

export const TokensContext = createContext<Tokens>(tokens);

export const useTokens = () => useContext(TokensContext);
