import { CloseIcon, SliderFormatIcon, TxtFormatIcon, ZipFormatIcon } from "@assets/icons";
import { Tooltip } from "@cmp/Tooltip/Tooltip";
import { Base64IMG } from "@components/Base64IMG";

export const FileType: any = {
  'application/x-zip-compressed': <ZipFormatIcon />,
  'text/plain': <TxtFormatIcon />,
  'image/svg+xml': <SliderFormatIcon />,
  'image/jpeg': <SliderFormatIcon />,
  'image/png': <SliderFormatIcon />,
  'image/gif': <SliderFormatIcon />,
  'default': <SliderFormatIcon />
}

export const UploadBarItem = ({item, upload, setUpload, index}: any) => {
  // const [visible, setVisible] = useState<boolean>();

  const { name } = item;

  return(

    <div className='Room-Input_Upload-Item'>
      <div className='Room-Input_Upload-Item-content'>
        <Tooltip placement="topLeft" title={item.name}>
          {item.name}
        </Tooltip>

        {!item.type.includes('image') ?  (
          <div className="Room-Input_Upload-Item-info">
            <i>{FileType[item.type] || FileType['default']}</i>
            <span>{item.name}</span>
          </div>
        ): 
          <Base64IMG file={item} />
        }
        <div 
          className="remove"
          onClick={()=>{
            setUpload(upload.filter((item: any)=> item.name !== name ))
          }}
        ><CloseIcon /></div>
      </div>
    </div>
  )
}