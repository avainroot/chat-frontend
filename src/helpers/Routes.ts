import {RoutesItemProps} from '@types';
import {PageChats} from '@pages/Chats/Chats';
import {PageHome} from '@pages/Home/Home';

export const routeItems: Array<RoutesItemProps> = [
  {
    path: '/home',
    Component: PageHome
  },
  {
    path: '/group-chat/:id',
    Component: PageChats
  }
];

