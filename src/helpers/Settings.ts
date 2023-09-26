
export interface SettingsProps {
    API_PREFIX?: string
    FILE_PREFIX?: string
    WS_PREFIX?: string
}

export const settings: SettingsProps = {
    API_PREFIX: process.env.REACT_APP_API_PREFIX,
    FILE_PREFIX: process.env.REACT_APP_FILE_PREFIX,
    WS_PREFIX: process.env.REACT_APP_WS_PREFIX,
};