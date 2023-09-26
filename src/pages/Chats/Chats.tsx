/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createRef, useContext} from 'react';
import {
  Page, TypographyTitle, TypographyParagraph,
  Avatar, 
  Popover,
  Loader,
  Space,
  ContextMenu
} from '@components';
import {useParams} from "react-router-dom";
// import {SocketContext} from '@context';
import moment from "moment";
import clsx from "clsx";

import "./Chats.less";
import { MessagesApi, RoomsApi } from '@api';
import { useChatContext } from '@context/Chat';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SendOutlined } from '@ant-design/icons';
// import { Popconfirm } from 'antd';
import { ERoomStatus, RoomProps } from '@types';
import { useInView } from 'react-intersection-observer';
import { TranslatorContext } from '@context';
import { Button } from '@cmp/Button/Button';
import { TypographyText } from '@cmp/Typography/Typography';
import { ClipIcon } from '@assets/icons';
import { UploadBar } from '@components/Editor/UploadBar/UploadBar';
import { ChatUpload } from '@components/ChatWindow/ChatUpload';
import { useSocketContext } from '@context/Socket';
import { MsgStatus } from '@components/ChatWindow/MsgStatus';

const prefixCls = "page-chats"

export const PageChats = () => {

  const { translator } = useContext(TranslatorContext);
  const localization = translator.main;

  const [loadChat, setLoadChat] = useState<boolean>(false);
  const [loadStatus, setLoadStatus] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [statusChangeShow, setStatusChangeShow] = useState<boolean>(false);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [currentScroll, setCurrentScroll] = useState<number | undefined>();
  const [quoteContainer, setQuoteContainer] = useState<any>();
  const [typing, setTyping] = useState<boolean>(false);
  const [typingTO, setTypingTO] = useState<number | undefined>();
  const chatWindow = createRef<HTMLDivElement>();
    
  const { ref, inView } = useInView({
    threshold: 0,
  });

  let {id}: any = useParams();
  id = parseInt(id);
  // const [bottom] = useState(0);

  const [data, setData] = useState<any>([]);

  const [value, setValue] = useState<string>('');
  const [upload, setUpload] = useState<any>([]);

  const { socket } = useSocketContext();

  const { room, setRoom, setRoomsList, tempUpload, setTempUpload, refresh, setRefresh } = useChatContext();

  const [reactQuillRef, setReactQuillRef] = useState<ReactQuill | null>(null);
  const [quillRef, setQuillRef] = useState<any>(null);

  useEffect(()=>{
    if(refresh) {
      MessagesApi.getMessages(id, pagesLoaded, pagesLoaded*100).then(({messages, messagesAmount}:any) => {
        setData(messages);
        setTotalMessages(messagesAmount);
      });
      setRefresh(!refresh);
    } 
  },[refresh])

  const handleSendMassage = (event: any) => {

    const {ctrlKey, shiftKey} = event;

    if (ctrlKey || shiftKey) {
      return
    }

    event.preventDefault();
    event.stopPropagation();

    if (id && room) {     
      const sendMessage = MessagesApi.sendMessage(id, room.project_id.toString(), quoteContainer.innerHTML + (value === '<p><br></p>'?'':value));
      sendMessage.then((rSend: any)=>{
        if(upload.length) {
          setTempUpload(
            {...tempUpload, ...{[rSend[0].id]: upload}}
          )
          setUpload([]);
        }
        setValue('');
        quoteContainer.innerHTML = ''
        MessagesApi.getMessages(id, pagesLoaded, pagesLoaded*100).then(({messages, messagesAmount}:any) => {
          setData(messages);
          setTotalMessages(messagesAmount);
        });
      })
    }

    setTimeout(() => {
      event.target.value = "";
    }, 10);
  }

  const handleChangeStatus = (room: number, status: ERoomStatus) => {
    setLoadStatus(true);
    RoomsApi.setRoomStatus(room, status).then(()=>{
      RoomsApi.getRooms().then((rooms: RoomProps[])=>{
        setTimeout(() => {
          setLoadStatus(false);
          setRoomsList(rooms)
          setRoom(rooms.filter(({id})=> id === room)[0])
        }, 2000);
      })
    })
  }

  useEffect(() => {
    if(!room) {
      RoomsApi.getRooms().then((rooms)=>{
        rooms.map((room: any)=>{
          return room.id === id ? setRoom(room): false
        })
      })
    }
    setLoadChat(true)
    MessagesApi.getMessages(id).then(({messages, messagesAmount}:any) => {
      setData(messages);
      setTotalMessages(messagesAmount);
      setPagesLoaded(1);
      setTimeout(()=>{
        setLoadChat(false)
      }, 1000)
    });
  }, [id])

  useEffect(() => {
    if(socket && id) {
      socket.on('fileUploaded', (data: any)=>{
        // if(id === data.room_id) {
          MessagesApi.getMessages(id).then(({messages, messagesAmount}:any) => {
            setData(messages);
            setTotalMessages(messagesAmount);
          });
        // }
      })
      socket.on('createMassage', (data: any)=>{
        if(id === data.room_id) {
          MessagesApi.getMessages(id).then(({messages, messagesAmount}:any) => {
            setData(messages);
            setTotalMessages(messagesAmount);
          });
        }
      })
      return () => {
        socket.off('fileUploaded')
        socket.off('createMassage')
      }
    }
  }, [socket, id])

  useEffect(()=>{
    if(inView && !loadMore && chatWindow.current) {
      setLoadMore(!loadMore);
      setCurrentScroll(chatWindow.current.scrollHeight);
      MessagesApi.getMessages(id, pagesLoaded + 1).then(({messages, messagesAmount}: any)=>{
        setTimeout(()=>{
          setLoadMore(!loadMore);
          setData([...data, ...messages].sort((a: any, b: any) => a.id - b.id));
          setTotalMessages(messagesAmount);
          setPagesLoaded(pagesLoaded + 1);
        },2000)
      })
    }
    if(!inView && loadMore) {
      setLoadMore(!loadMore);
    }
  },[chatWindow, inView, loadMore])

  useEffect(()=>{
    if(currentScroll && chatWindow.current) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight - currentScroll;
      setCurrentScroll(undefined);
    }
    if(isScrolling && chatWindow.current && !currentScroll) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight - chatWindow.current.clientHeight;
    }
  },[data, isScrolling, room])

  useEffect(()=>{
    if (typeof reactQuillRef?.getEditor !== 'function') return;
    setQuillRef(reactQuillRef.getEditor());
    setQuoteContainer(reactQuillRef.getEditor().addContainer('ql-quote'))
  },[reactQuillRef])

  useEffect(()=>{
    const divElem = chatWindow.current;
    if(divElem) {
      setIsScrolling(divElem.scrollHeight > divElem.clientHeight)
    }
    window.addEventListener('resize', ()=>{});
    window.addEventListener('resize', ()=>{});
  }, [chatWindow])

  quillRef?.keyboard.addBinding({ key: 'B' }, {
    shiftKey: true,
    // collapsed: true,
    format: { blockquote: true },
    // offset: 1,
  }, function(range: any, context: any) {
    quillRef.formatText(range, 'bold', true);
  });

  quillRef?.keyboard.addBinding({ key: 'X' }, {
    shiftKey: true,
    format: { blockquote: true },
  }, function(range: any, context: any) {
    quillRef.format('blockquote', false);
  });

  // quillRef?.keyboard.addBinding({ key: 'backspace' }, {
  //     // shiftKey: true,
  //     collapsed: true,
  //     // format: { blockquote: true },
  //     offset: 0,
  //   }, function(range: any, context: any) {
  //     if (context.format.list) {
  //         quillRef.format('list', false);
  //     } else {
  //         quillRef.format('blockquote', false);
  //     }
  //   });

  // const bindings = {
  //     enter: {
  //       key: 13,
  //       handler: () => {
  //         console.log('12');
  //       }
  //     },
  // }

  const textHandle = (text: any) => {
    return text.replace('<div class="ql-quote_clean">x</div>', '')
  }

  const typingHandle = (value: any) => {
    setValue(value);
    const typingSwitch = () => {
      const tt = setTimeout(()=> {
        console.log(`User ending typing!`)
        socket.emit('typing', {
          room: 1,
          typing: false
        })
        setTyping(false);
      }, 5000)
      setTypingTO(parseInt(tt.toString()))
    }
    if(!typing) {
      console.log(`User typing begins!`)
      typingSwitch()
      setTyping(true)
      socket.emit('typing', {
        room: 1,
        typing: true
      })
    } else {
      clearTimeout(typingTO)
      typingSwitch()
    }
  }

  const contentChangeStatus = (title: string, target: ERoomStatus) => {
    return (
      <Space direction="vertical">
        <TypographyText>{title}</TypographyText>
        <Space>
          <Button
            size="small"
            type='primary'
            onClick={()=>{
                setStatusChangeShow(false)
                if(room)
                handleChangeStatus(room.id, target)
            }}
          >{localization.yes}</Button>
          <Button
            size="small"
            type='secondary'
            onClick={() => setStatusChangeShow(false)}
          >{localization.no}</Button>
        </Space>
      </Space>
    )
  }

  const editorModules = {
    toolbar: false
  };

  const attachmentHandler = (event: any) => {
    let filesArr = [];
    for (const key in event.target.files) {
      if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
        filesArr.push(event.target.files[key])
      }
    }
    setUpload([...upload, ...filesArr])
    event.target.value = '';
  }

  return <Page className={clsx(`${prefixCls}`)}>
    <div 
      ref={chatWindow}
      className={clsx(`${prefixCls}-list_scroll`)}
    >
      <div className='Room-Title'>
          <TypographyTitle level={'title'}>{localization.title} #{id}</TypographyTitle>
          {room?.status_id === ERoomStatus.Queue && (
            <Popover
              content={()=>contentChangeStatus(localization.popup.handle, ERoomStatus.Processing)}
              placement="bottom"
              visible={statusChangeShow}
              onVisibleChange={(visible: boolean)=> {
                setStatusChangeShow(visible)
              }}
            >
              <Button loading={loadStatus}>
                {localization.chatAction.handle}
              </Button>
            </Popover>
          )}
          {(room?.status_id === ERoomStatus.Processing && room.member_id) && (
            <Popover
              content={()=>contentChangeStatus(localization.popup.close, ERoomStatus.Closed)}
              placement="bottom"
              visible={statusChangeShow}
              onVisibleChange={(visible: boolean)=> {
                  setStatusChangeShow(visible)
              }}
            >
              <Button loading={loadStatus}>
                {localization.chatAction.close}
              </Button>
            </Popover>
          )}
      </div>
      {loadChat ? (
        <div className={clsx(`${prefixCls}-preloader`)}>
          <Loader />
        </div>
      ):(
        <>
          <div className={clsx(`${prefixCls}-list_wrap`)}>
            {isScrolling && data.length < totalMessages && (
              <div className={clsx(`${prefixCls}-list_preload`)} ref={ref}>
                  {loadMore && <Loader size='small'/>}
              </div>
            )}
            <div className={clsx(`${prefixCls}-list`)}>
                {data && data.map(({message, member_id, date, files, id}: any, i: number) => (
                    <TypographyParagraph 
                        key={i}
                        className={clsx(`${prefixCls}-item`, {
                            [`${prefixCls}-item-my`]: member_id
                        })}
                    >
                        <Avatar size="large"/>
                        <div className={clsx(`${prefixCls}-item-data`)}>
                            <div className={clsx(`${prefixCls}-item-date`)}>
                                <TypographyText level='small' type="secondary">{moment(date).format('LLL')}</TypographyText>
                                <MsgStatus
                                  classPrefix={prefixCls}
                                  delivered={true}
                                  read={false}
                                />
                            </div>
                            <ContextMenu
                                quillRef={quillRef}
                                quoteContainer={quoteContainer}
                            >
                              {files && (
                                <div className={clsx(`${prefixCls}-item-files ${!message.length ? 'solo':''}`)}>
                                  {files.map((fileProps: any)=>{
                                    return <ChatUpload key={`${fileProps.id}_${fileProps.file_name}`} {...fileProps} />
                                  })}
                                </div>
                              )}
                              {(tempUpload[id] && !files) && (
                                <div className={clsx(`${prefixCls}-item-files ${!message.length ? 'solo':''}`)}>
                                  {tempUpload[id].map((file: any)=>{
                                    return <ChatUpload
                                      key={file.name}
                                      file_name={file.name}
                                      content_type={file.type}
                                      doc_id={id}
                                      temp={file} 
                                    />
                                  })}
                                </div>
                              )}
                              {message.length ? (
                                <TypographyText>
                                  <span 
                                    dangerouslySetInnerHTML={{__html: textHandle(message)}}
                                  />
                                </TypographyText>
                              ): <></>}
                            </ContextMenu>
                        </div>
                    </TypographyParagraph>
                ))}
            </div>
            <div className={clsx(`${prefixCls}-list_info`)}>
              Печатает...
            </div>
          </div>
          {(room?.member_id && data && (room.status_id === ERoomStatus.Processing)) ? (
            <div className='Room-Input'>
              <UploadBar 
                upload={upload}
                setUpload={setUpload}
              />
              <div className='Room-Input_Body'>
                <div className='Room-Input_Toolbar'>
                  <label className='Room-Input_Toolbar-Item'  htmlFor="attachment">
                    <ClipIcon />
                  </label>
                  <input 
                    id="attachment" 
                    type='file'
                    onChange={attachmentHandler}
                    multiple={true}
                  />
                </div>
                <ReactQuill 
                  ref={(el) => {
                    setReactQuillRef(el)
                  }}
                  theme="snow" 
                  value={value} 
                  onChange={typingHandle} 
                  modules={editorModules}
                />
                {(quillRef?.getLength()>1 || upload.length)?(
                    <div className='Room-Input_Send' onClick={handleSendMassage}>
                        <SendOutlined />
                    </div>
                ):<></>}
              </div>
            </div>
          ): <></>}
        </>
      )}
    </div>
  </Page>
}