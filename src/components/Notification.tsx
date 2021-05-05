import {memo} from "react";

type Props = {
    message: string,
    setNotificationStatus: any
}
const Notification = (props: Props) => {
  return <div className="notification is-success">
    <button className="delete" onClick={() => props.setNotificationStatus(false)}></button>
    {props.message}
  </div>
};

export default memo(Notification);