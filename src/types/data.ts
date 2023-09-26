import {TagTypeProp} from './component';
import {TreeListItemValueType} from "../cmp/TreeList/TreeList";

export type ProjectItemProps = {
    description?: string
    id?: number | string | null
    modify_date?: string
    name?: string
    status_id?: number
}

export type SectionItemProps = {
    description?: string
    id: number | string | null
    name?: string
}

export type RoleItemProps = {
    description?: string
    id: number | string | null
    name?: string
    controls?: Array<string | ControlItemProps>
}

export type RoleTemplateItemProps = RoleItemProps

export type ProcedureItemProps = {
    description?: string
    id: number | string | null
    name?: string
}

export type ControlItemProps = {
    description?: string
    id?: number | string | null
    name?: string
}

export type MenuItemProps = {
    path?: string
    name?: string
    Icon?: any
    control?: string
    children?: Array<MenuItemProps>
}

export type RoutesItemProps = {
    path?: string | Array<string>
    control?: string
    Component?: any
}

export type ControlsItemProps = {
    description?: string
    id: number
    name: string
}

export type ControlsProps = {
    [key: string]: boolean
}

export type SessionProps = {
    session_hash: string
    session_end: string
    [key: string]: any
}

export type SessionValuesProps = {
    login: string
    password: string
}

export type UserProps = {
    id: number
    login: string
    name?: string
    phone?: string
    email?: string
    surname?: string
    roles?: Array<RoleItemProps>
    [key: string]: any
}

export type TagItemProps = {
    label?: any,
    disabled?: string
    value: any
    type: TagTypeProp,
    essence?: 'knowledge' | 'versions'
}

export type KnowledgeItemProps = {
    id: any,
    title: string
    version?: string
    content: string
    author?: string
    create_date?: Date
    category_id: number
    update_date?: Date
    tags?: Array<TagItemProps> | Array<GroupItemProps["value"]>
    group?: {value: any, label: string}
}

export type KnowledgeVersionProps = {
    id: any,
    name?: string,
    content?: string,
    start?: any,
    end?: any,
    tags?: Array<TagItemProps> | Array<GroupItemProps["value"]>
}

export type GroupItemProps = {
    type?: "warning" | "info" | "success"
    label?: any
    value: any
    projects_id?: Array<any>
    items?: Array<GroupItemProps>
}