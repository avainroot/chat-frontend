import { PlusIcon } from "@assets/icons"
import { UploadBarItem } from "../UploadBarItem/UploadBarItem"

export const UploadBar = ({upload, setUpload}: any) => {
  return(
    <div className='Room-Input_Upload'>
      {upload.map((item: any, i: number)=> 
        <UploadBarItem
          key={i}
          index={i} 
          item={item}
          upload={upload}
          setUpload={setUpload}
        />
      )}
      {upload.length ? (
        <label htmlFor="attachment">
          <PlusIcon />
        </label>
      ): <></>}
    </div>
  )
}