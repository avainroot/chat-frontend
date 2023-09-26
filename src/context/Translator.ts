import {createContext} from 'react';

export type TranslatorContextProps = {
    translator?: any
}

const defaultValue: TranslatorContextProps = {
    translator: null
}

export const TranslatorContext = createContext(defaultValue);
