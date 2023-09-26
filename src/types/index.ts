export type {DirectionProp, OptionProps, SizeProp, TagTypeProp} from './component';
export type {
    ProjectItemProps, SectionItemProps, RoleItemProps, MenuItemProps, ProcedureItemProps,
    RoutesItemProps, ControlsProps, SessionProps, SessionValuesProps, UserProps, ControlItemProps,
    RoleTemplateItemProps, KnowledgeItemProps, TagItemProps, GroupItemProps, KnowledgeVersionProps
} from './data';

export type ProjectsItemProps = {
    description?: string
    id?: number
    modify_date?: string
    name?: string
    status_id?: number
}

export type GroupsItemProps = {
    description?: string
    id?: number
    name?: string
    path?: string
    countNewMassage?: number
}

export enum ERoomStatus {
    Processing = 2,
    Queue = 1,
    Closed = 3
}

export type RoomsGroup = {
    [index in ERoomStatus]: string
}

export type TypesGroup = {
    [index in ERoomStatus]: string
}

export type RoomProps = {

    id: number
    create_date: string
    status_id: ERoomStatus
    status_name: string
    customer_id: number
    customer_name: string
    resource: string
    project_id: number
    project_name: string
    member_id: null | number
    // "login": null

    // id: number
    // current: boolean
    // project: {
    //     id: number
    //     name: string
    // },
    // status_id: ERoomStatus
    // resource: string
    // client: {
    //     id: string,
    //     name: string
    // }
}

export enum ENotifyType {
    Default = 1,
    Success = 2,
    Warning = 3
}
export interface INotify {
    type: ENotifyType
    text: string
  }