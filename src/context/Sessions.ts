import {createContext} from 'react';

export type SessionsContextProps = {
  session?: any
  setSession?: any
  deleteSession?: any
}

const defaultValue: SessionsContextProps = {
  session: null,
  setSession: null,
  deleteSession: null
}

export const SessionsContext = createContext(defaultValue);