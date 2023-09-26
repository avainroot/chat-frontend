import {Quill} from "react-quill";
import {UnfoldLessIcon, UnfoldMoreIcon, CustomRedoIcon, CustomUndoIcon} from "@assets/icons";
import {ButtonText} from "../Button/Button";

import "./TextEditorToolbar.less";


export interface TextEditorToolbarProps {
    bigEditor: boolean;
    onChangeModal: (bigEditor: any) => void;
}


function undoChange(this: any) {
    this.quill.history.undo();
}

function redoChange(this: any) {
    this.quill.history.redo();
}

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

export let modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
            custom: () => {}
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    }
};

export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
];

export const TextEditorToolbar: React.FC<TextEditorToolbarProps> = (props: TextEditorToolbarProps) => {
    const {bigEditor, onChangeModal} = props;

    modules.toolbar = { ...modules.toolbar, container: "#toolbar" + Date.now() }

    return (
        <div id={(modules.toolbar.container).substring(1)}>
            <span className="ql-formats">
                <select className="ql-size" defaultValue="medium">
                    <option value="small">Size 1</option>
                    <option value="extra-small">Size 2</option>
                    <option value="medium">Size 3</option>
                    <option value="large">Size 4</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold"/>
                <button className="ql-italic"/>
                <button className="ql-underline"/>
                <button className="ql-strike"/>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered"/>
                <button className="ql-list" value="bullet"/>
                <button className="ql-indent" value="-1"/>
                <button className="ql-indent" value="+1"/>
            </span>
            <span className="ql-formats">
                <select className="ql-align"/>
                <select className="ql-color"/>
                <select className="ql-background"/>
            </span>
            <span className="ql-formats">
                <button className="ql-link"/>
                <button className="ql-image"/>
            </span>
            <span className="ql-formats">
                <ButtonText
                    afterIcon={<CustomUndoIcon/>}
                    className="ql-undo"
                    size="small"
                />
                <ButtonText
                    afterIcon={<CustomRedoIcon/>}
                    className="ql-redo"
                    size="small"
                />
            </span>
            <ButtonText
                onClick={() => onChangeModal(!bigEditor)}
                className="ql-custom"
                size="small"
                afterIcon={bigEditor ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
            />
        </div>
    );
};

export default TextEditorToolbar;
