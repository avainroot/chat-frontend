import {DataIcon, HomeIcon, UsersIcon } from '@icons';
import {MenuItemProps} from '@types';

const menuItems: Array<MenuItemProps> = [
    {
        path: '/home',
        name: "Домашняя страница",
        Icon: HomeIcon
    },
    {
        path: '/knowledge',
        name: "База знаний",
        Icon: DataIcon
    },
    {
        path: '/users',
        name: "Пользователи",
        Icon: UsersIcon
    }
];

export {menuItems};
