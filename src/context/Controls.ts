import {createContext} from 'react';

export type ControlsContextProps = {
  controls?: any
}

const defaultValue: ControlsContextProps = {
  controls: null
}

export const ControlsContext = createContext(defaultValue);