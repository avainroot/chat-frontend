import axios from 'axios'
import {settings} from "@helpers";
import {SessionProps, SessionValuesProps} from "@types";

export async function create(values: SessionValuesProps) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/users/sessions`,
        method: 'POST',
        data: values
    }).catch(() => {});

    if (!res) return null;

    const result: SessionProps = res.data.result;

    return result;
}

export async function update() {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/users/sessions`,
        method: 'PUT'
    }).catch(() => {});

    if (!res) return null;

    const result: SessionProps = res.data.result[0];

    return result;
}

export async function remove() {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/users/sessions`,
        method: 'DELETE'
    }).catch(() => {});

    if (!res) return null;

    return res.data.result;
}


export const SessionsApi = {create, update, remove}
