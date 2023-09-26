import axios from "axios";
import { settings } from "@helpers";
import {ProjectsItemProps} from '@types';

const get = async () => {
    const result: any = await axios
        .request({
            url: `${settings.API_PREFIX}/projects`,
            method: "GET"
        })
        .catch(() => {});

    const data: Array<ProjectsItemProps> | null = result?.data?.result

    return data;
}

export const ProjectsApi = { get };
