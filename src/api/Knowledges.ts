import axios from 'axios'
import {settings} from "@helpers";
import {KnowledgeItemProps} from "@types";

export async function getList(params?: any) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/knowledges`,
        method: 'GET',
        params
    });

    const result: Array<KnowledgeItemProps> = res?.data?.result;

    return result;
}

export async function update(data: KnowledgeItemProps) {
    const {id} = data;

    const res: any = await axios.request({
        url: id ?
            `${settings.API_PREFIX}/knowledges/${id}` :
            `${settings.API_PREFIX}/knowledges`,
        method: id ? 'PUT' : 'POST',
        data
    });

    const result: KnowledgeItemProps = res?.data?.result;

    return result;
}

export async function search(params?: any) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/knowledge/searching`,
        method: 'GET',
        params
    });

    const result: Array<KnowledgeItemProps> = res?.data?.result;

    return result;
}

export async function getRecord(id: any) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/sections/knowledges/${id}`,
        method: 'GET'
    });

    const result: KnowledgeItemProps = res?.data?.result;

    return result;
}


export const KnowledgesApi = { getList, getRecord, search, update }
