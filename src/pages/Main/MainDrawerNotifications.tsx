import { Drawer } from "@components";
import { INotify } from "@types";
import clsx from "clsx";
import './MainDrawerNotifications.less';

export interface MainDrawerNotificationsProps {
  visible?: boolean
  onClose?: () => void,
  notifications?: INotify[]
}

const prefixCls = "page-main-drawer-notifications"

const notifyDemo: INotify[] = [
  {
    type: 1,
    text: 'Обычное уведомление'
  },
  {
    type: 2,
    text: 'Success'
  },
  {
    type: 3,
    text: 'Предупреждение'
  }
]

export const MainDrawerNotifications : React.FC<MainDrawerNotificationsProps> = (props: MainDrawerNotificationsProps ) => {
  const {visible, onClose, notifications} = props;

  const data = notifications || notifyDemo

  return (
      <Drawer
          onClose={onClose}
          className={clsx(prefixCls)}
          closable={true}
          visible={visible}
          mask={true}
      >
        {data.map(({type, text}: INotify, i: number)=>{
          return (
            <div key={i} className={`${clsx(prefixCls)}_item type-${type}`}>
              {text}
            </div>
          )
        })}
      </Drawer>
  );
}