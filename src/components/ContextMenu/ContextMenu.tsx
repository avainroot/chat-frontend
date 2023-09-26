import { Popover } from "@components"
import { TranslatorContext } from "@context";
import { useContext, useState } from "react";
import clsx from "clsx";

interface IContextMenu {
  children: any
  quoteContainer: any
  quillRef: any
}

export const ContextMenu = ({children, quoteContainer, quillRef}: IContextMenu) => {
  const prefixCls = "page-chats"
  const [visible, setVisible] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('');
  const { translator } = useContext(TranslatorContext);
  const localization = translator.main;
  const items: any = [
    {
        label: localization.context.quote,
        // key: '1',
        onClick: (e:any)=>{
          insertQuote();
        }
    }
  ];
  

  const insertQuote = () => {
    if(quoteContainer) {
        quoteContainer.innerHTML = `<div class="ql-quote_content"><blockquote>${quote}</blockquote></div><div class="ql-quote_clean">x</div>`;
        quillRef.focus();
        const cleanQuote = document.querySelector('.ql-quote_clean');
        cleanQuote?.addEventListener('click',()=>{
            quoteContainer.innerHTML = ''
        })
    }
    // quillRef.pasteHTML(
    //     0,
    //     `<blockquote>${quote}</blockquote>`, 
    //     'api'
    // );
}

  const contextMenu = () => {
    return items.map((item: any, i: number)=>{
        return (
            <div className={clsx(`${prefixCls}-context-item`)} key={i} onClick={()=>{
              setVisible(false);
              insertQuote();
            }}>{item.label}</div>
        )
    })
  }

  return (
    <Popover
      trigger={'contextMenu'}
      content={contextMenu}
      placement="bottom"
      visible={visible}
      onVisibleChange={(visible: boolean) => setVisible(visible)}
    >
      <div className={clsx(`${prefixCls}-item-description`)} onContextMenu={(e: any)=>{setQuote(window.getSelection()?.toString() || e.target.textContent)}}>
        {children}
      </div>
    </Popover>
  )
}