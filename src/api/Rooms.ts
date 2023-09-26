import axios from 'axios'
import {settings} from "@helpers";
import { ERoomStatus } from '@types';

export async function getRooms() {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/rooms`,
        method: 'GET'
    });

    const result: any = res.data.result;

    return result;
}

export async function setRoomStatus(room: number, status: ERoomStatus) {

    const res: any = await axios.request({
        url: `${settings.API_PREFIX}/rooms/${room}`,
        method: 'PUT',
        data: {
            'status_id': status
        }
    });

    const result: any = res.data.result;

    return result;
}


export const RoomsApi = {getRooms, setRoomStatus}
