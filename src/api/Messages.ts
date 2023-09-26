import axios from 'axios'
import {settings} from "@helpers";

export async function getMessages(room: number, page?: number, limit?: number) {

    let qLimit = limit || 100;
    let qPage = limit ? 1 : (page || 1);

    let query: string = `page=${qPage}&limit=${qLimit}`;


    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/rooms/${room}/messages?${query}`,
        method: 'GET'
    });

    const result: any = { 
        messages: res.data.result.sort((a: any, b: any) => a.id - b.id), 
        messagesAmount: res.data.result.length ? res.data.result[0].count : 0
    }

    return result;
}

export async function sendMessage(room: number, project: string, message: string) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/rooms/${room}/messages`,
        method: 'POST',
        data: {
            'message': message,
            'project': project
        }
    });

    const result: any = res.data.result;

    return result;
}

export const MessagesApi = {getMessages, sendMessage}
