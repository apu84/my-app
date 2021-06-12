import React from "react";
import {Editor, EditorState, ContentState, RichUtils} from "draft-js";
import 'draft-js/dist/Draft.css';
import {stateToHTML} from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';


export default class RTEField extends React.Component {
  constructor(props) {
    super(props);
    if(!props.value) {
      this.state = { editorState: EditorState.createEmpty() };
    }
    else {
      const blocksFromHtml = htmlToDraft(props.value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      this.state = { editorState };
    }

    this.onChange = editorState => {
      this.setState({editorState});
      const html = stateToHTML(editorState.getCurrentContent());
      this.props.onChange(html);
    };
    this.setEditor = (editor) => {
      this.editor = editor;
    }
  }

  componentDidMount() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  onToolbarClick(action) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, action));
  }

  render() {
    return (
        <>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="rte-toolbar">
            <button className="rte-toolbar-button" onClick={() => this.onToolbarClick('BOLD')}>B</button>
            <button className="rte-toolbar-button" onClick={() => this.onToolbarClick('ITALIC')}>I</button>
            <button className="rte-toolbar-button" onClick={() => this.onToolbarClick('UNDERLINE')}>U</button>
          </div>
          <div className="rte" id={this.props.name}>
            <Editor editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={this.setEditor}/>
          </div>
        </>);
  }
}