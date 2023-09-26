import clsx from "clsx";

type TMsgUnread = {
  classPrefix: string
  count: number
}

export const MsgUnread = ({classPrefix, count}: TMsgUnread) => {
  return count>0 ? 
    <div  className={clsx(`${classPrefix}-room-msg_unread`)}>{count}</div> 
  :<></>
}