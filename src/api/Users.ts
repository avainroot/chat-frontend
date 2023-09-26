import axios from 'axios'
import {settings} from "@helpers";
import {UserProps} from "@types";

export async function getCurrent() {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/users/info`,
        method: 'GET'
    });

    const result: UserProps = res?.data?.result[0];

    return result;
}


export const UsersApi = {getCurrent}
