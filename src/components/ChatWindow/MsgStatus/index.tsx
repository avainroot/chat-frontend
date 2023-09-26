import { CheckOutlined } from "@ant-design/icons"
import clsx from "clsx";

interface IMsgStatus {
  classPrefix: string
  delivered: boolean
  read: boolean
}

export const MsgStatus = ({classPrefix, delivered, read}:IMsgStatus) => {
  return (
    <div className={clsx(`${classPrefix}-item-status`)}>
      <CheckOutlined data-status={delivered} />
      <CheckOutlined data-status={read} />
    </div>
  )
}