import { settings } from "@helpers";

export interface OperatorSockedProps {
    id: number
    groups: number[]
    onCommandCustomer?: (data: any, event: any) => void
    onDestroyCustomer?: (data: any, event: any) => void
    [key: string]: any
}

const mapEvent: any = {};

export const createOperatorSocked = ({id, groups, onCommandCustomer, onDestroyCustomer}: OperatorSockedProps) => {
    const socket: any = new WebSocket(`${settings.WS_PREFIX}`);

    socket.write = function (obj: any) {socket.send(JSON.stringify(obj))};

    socket.msg = function (id_cust: any, text: any) {socket.send(JSON.stringify({t: 'ToCust', id_cust: id_cust, text: text}))};

    socket.finish = function (id_cust: any) {socket.send(JSON.stringify({t: 'FinishCust', id_cust: id_cust}))};

    socket.onmessage = function(event: any) {
        const signal = JSON.parse(event.data);

        if (signal.t === 'Ping') {
            socket.write({t: 'Pong', val: signal.val});
        }
        else {

            const date = new Date(Date.now());
            const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
            if (signal.t === 'MsgFromSelf') {
                console.log(`${time}[self>cust#${signal['id_cust']}]: ${signal.text}`);
            }
            else if (signal.t === 'Disconnected') {
                console.log(`${time}[disconnected]`);
            }
            else if (signal.t === 'CommedCust') {
                onCommandCustomer && onCommandCustomer(signal, event);
            }
            else if (signal.t === 'FinishedCust') {
                onDestroyCustomer && onDestroyCustomer(signal, event)
            }
        }
    };

    socket.onopen = function() {
        socket.write({t: 'Oper', id: id, groups: groups});
    };

    socket.onclose = function (event: any) {
        const date = new Date(Date.now());
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
        if (event.wasClean) {
            console.log(`${time}[closed]: code=${event.code}; cause=${event.reason}`);
        } else {
            console.log(`${time}[closed]`);
        }
    };

    socket.onerror = function (error: any) {
        const date = new Date(Date.now());
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
        console.log(`${time}[error]: ${error.message}`);
    }

    socket.registerChat = (id: number, callback: any) => {
        if (!mapEvent[id]) {
            mapEvent[id] = [];
        }
        mapEvent[id] = callback;
    }

    socket.addEventListener("message", (event: any) => {
        const signal = JSON.parse(event.data);
        if (signal && signal.t === 'MsgFromCust') {
            const {id_cust} = signal;

            mapEvent[id_cust] && mapEvent[id_cust](signal)
        }
    });

    return socket;
}