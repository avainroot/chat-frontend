import axios from "axios";
import {settings} from "@helpers";
import {ControlsProps} from "@types";

export async function get() {

    const result: any = await axios.request({
        url: `${settings.API_PREFIX}/users/controls`,
        method: 'GET'
    }).catch(() => {});

    const data: ControlsProps = {};

    result?.data?.result[0].controls.forEach((value: string) => {
        data[value] = true;
    });

    return data;
}

export const ControlsApi = { get };
