import {createContext} from 'react';

export type UsersContextProps = {
    currentUser?: any
}

const defaultValue: UsersContextProps = {
    currentUser: null
}

export const UsersContext = createContext(defaultValue);