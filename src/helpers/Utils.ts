import {Grid} from 'antd';

export const isMobile = (screens: any): boolean => !screens["md"];
export const useBreakpoint = Grid.useBreakpoint;

