import axios from 'axios'
import {settings} from "@helpers";
import {TagItemProps, TagTypeProp} from "@types";

const getTypeId = (type: TagTypeProp) => {
    switch (type) {
        case "default":
            return 1;
        case "warning":
            return 2;
        case "success":
            return 3;
    }
}

export async function getList(params?: any) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/tags/article`,
        method: 'GET',
        params
    });

    const result: Array<TagItemProps> = res?.data?.result.map(({id, name, type_name}: any) => ({
        label: name,
        value: id,
        type: type_name
    }));

    return result;
}

export async function update(data: TagItemProps) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/knowledge/tags`,
        method: 'POST',
        data: {
            name: data.label,
            type_id: getTypeId(data.type),
            assence: data.essence
        }
    }).catch(() => {});

    if (!res) return null;

    const result: TagItemProps = res.data.result;

    return result;
}

export async function remove(id: any) {
    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/knowledge/tags/${id}`,
        method: 'DELETE'
    });

    const result: boolean = res?.data?.result;

    return result;
}



export const TagsApi = { getList, update, remove }
