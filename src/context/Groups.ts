import {createContext} from 'react';

export type GroupsContextProps = {
    groups?: any
    setGroups?: any
}

const defaultValue: GroupsContextProps = {
    groups: null,
    setGroups: null
}

export const GroupsContext = createContext(defaultValue);