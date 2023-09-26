import { FileType } from "@components/Editor/UploadBarItem/UploadBarItem"
import { SessionsContext } from "@context";
import { settings } from "@helpers"
import { Progress } from "antd";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Base64IMG } from "@components/Base64IMG";
import axios from "axios";
import { CloseIcon } from "@assets/icons";
import { Loader } from "@cmp/Loader/Loader";
import { useChatContext } from "@context/Chat";
// import { useChatContext } from "@context/Chat";
const prefixCls = "page-chats";

export const ChatUpload = ({file_name, content_type, doc_id, id, temp, pagesLoaded, room_id}: any) => {

  const { session } = useContext(SessionsContext);

  const { tempUpload, setTempUpload, setRefresh, room } = useChatContext();

  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [resID, setResID] = useState<number>(0);

  const delFile = () => {
    setDeleting(!deleting);
    axios.request({
      url: `${settings.FILE_PREFIX}/chats/${id || resID}`,
      method: 'DELETE'
    }).then(()=>{
      if(tempUpload[doc_id] && tempUpload[doc_id] !== null){
        let delUploadFile = tempUpload[doc_id].filter(({name}:any)=> name !== file_name );
        setTempUpload(
          {
            ...tempUpload,
            ...{[doc_id]: delUploadFile.length ? delUploadFile : null}
          }
        );
      }
      setRefresh(true);
    })
  }

  useEffect(()=>{
    if(temp && room){
      const bodyData = new FormData();
      bodyData.append('projectId', room.project_id?.toString() || '');
      bodyData.append('roomId', room.id?.toString() || '');
      bodyData.append('entityId', doc_id);
      bodyData.append(`upload`, temp);
      axios.request({
        url: `${settings.FILE_PREFIX}/chats`,
        method: 'POST',
        data: bodyData,
        onUploadProgress: progressEvent => {
          setProgress(parseInt(((progressEvent.loaded/progressEvent.total)*100).toString()))
          if(progressEvent.loaded === progressEvent.total) {
            setUploading(!uploading);
            // let newTemp = tempUpload[doc_id].filter(({name}:any)=>name !== file_name);
            // setTempUpload(
            //   Object.keys(newTemp).length ?
            //   {
            //     ...tempUpload,
            //     ...{[doc_id]: tempUpload[doc_id].filter(({name}:any)=>name !== file_name)}
            //   } : {
            //     ...tempUpload, ...{[doc_id]: null}
            //   }
            // )
          }
        }
      }).then((r:any)=>{
        setResID(r.data.result.id)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className={clsx(`${prefixCls}-item-file`)}>
      {content_type.includes('image') ? (
        <a href={`${settings.FILE_PREFIX}/chats/${id || resID}/${file_name}?session_hash=${JSON.parse(session).session_hash}`} download>
          <picture>
            {!temp && (
              <img src={`${settings.FILE_PREFIX}/chats/${id || resID}/${file_name}?session_hash=${JSON.parse(session).session_hash}`} alt={file_name} />
            )}
            {deleting && (
              <Loader />
            )}
            {temp && (
              <Base64IMG file={temp} />
            )}
            {(temp && uploading) && (
              <Progress type="circle" strokeColor='#5074B4' percent={progress} width={40} strokeWidth={10} />
            )}
          </picture>
          {(id || resID) ? (
            <span className={clsx(`${prefixCls}-item-file-remove`)} onClick={(e)=>{ 
              e.preventDefault(); 
              delFile();
            }}>
              <CloseIcon />
            </span>
          ):<></>}
        </a>
      ):(
        <a href={`${settings.FILE_PREFIX}/chats/${id || resID}/${file_name}?session_hash=${JSON.parse(session).session_hash}`} className='Room-Input_Upload-Item' download>
          {deleting && (
            <Loader />
          )}
          <div className="Room-Input_Upload-Item-info">
            <i>{FileType[content_type] || FileType['default']}</i>
            <span>{file_name}</span>
          </div>
          {(temp && uploading) && (
            <Progress type="circle" strokeColor='#5074B4' percent={progress} width={40} strokeWidth={10} />
          )}
          {(id || resID) ? (
            <span className={clsx(`${prefixCls}-item-file-remove`)} onClick={(e)=>{ 
              e.preventDefault(); 
              delFile();
            }}>
              <CloseIcon />
            </span>
          ): <></>}
        </a>
      )}
    </div>
  )
}