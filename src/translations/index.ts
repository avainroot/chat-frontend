import { LOCALES } from "./Locales";

import RuMain from './ru/Main.json'
import RuRoles from './ru/Roles.json'
import RuSignIn from './ru/SignIn.json'
import RuPage404 from './ru/Page404.json'
import RuControls from './ru/Controls.json'
import RuProjects from './ru/Projects.json'
import RuKnowledge from './ru/Knowledge.json'
import RuProcedures from './ru/Procedures.json'
import RuComponents from './ru/Components.json'
import RuRoleTemplates from './ru/RoleTemplates.json'

import EnMain from './en/Main.json'
import EnRoles from './en/Roles.json'
import EnSignIn from './en/SignIn.json'
import EnPage404 from './en/Page404.json'
import EnProjects from './en/Projects.json'
import EnControls from './en/Controls.json'
import EnKnowledge from './en/Knowledge.json'
import EnProcedures from './en/Procedures.json'
import EnComponents from './en/Components.json'
import EnRoleTemplates from './en/RoleTemplates.json'

export { LOCALES } from "./Locales";

export const translations = {
    [LOCALES.ENGLISH]: {
        "main": EnMain,
        "roles": EnRoles,
        "sign-in": EnSignIn,
        "page404": EnPage404,
        "controls": EnControls,
        "projects": EnProjects,
        "knowledge": EnKnowledge,
        "components": EnComponents,
        "procedures": EnProcedures,
        "role-templates": EnRoleTemplates,
    },
    [LOCALES.RUSSIAN]: {
        "main": RuMain,
        "roles": RuRoles,
        "sign-in": RuSignIn,
        "page404": RuPage404,
        "projects": RuProjects,
        "controls": RuControls,
        "knowledge": RuKnowledge,
        "components": RuComponents,
        "procedures": RuProcedures,
        "role-templates": RuRoleTemplates,
    }
};