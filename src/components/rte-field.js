import React, {useState} from "react";
import {Editor, EditorState, ContentState, RichUtils} from "draft-js";
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';

export default function RTEField(props) {
  const blocksFromHtml = htmlToDraft(props.value || '');
  const {contentBlocks, entityMap} = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));

  const onChange = editorState => {
    const html = stateToHTML(editorState.getCurrentContent());
    props.onChange(html);
    setEditorState(editorState);
  };

  const onToolbarClick = (action) => {
    onChange(RichUtils.toggleInlineStyle(editorState, action));
  }

  return (
      <>
        <label htmlFor={props.name}>{props.label}</label>
        <div className="rte-toolbar">
          <button className="rte-toolbar-button" onClick={() => onToolbarClick('BOLD')}>B</button>
          <button className="rte-toolbar-button" onClick={() => onToolbarClick('ITALIC')}>I</button>
          <button className="rte-toolbar-button" onClick={() => onToolbarClick('UNDERLINE')}>U</button>
        </div>
        <div className="rte" id={props.id}>
          <Editor editorState={editorState}
                  onChange={(editorState) => onChange(editorState)}/>
        </div>
      </>);
}