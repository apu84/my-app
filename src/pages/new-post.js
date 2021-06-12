import React from "react";
import FieldEditor from "../components/field-editor";
import Field from "../components/field";

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fieldEditor = new FieldEditor();
    this.fieldEditor.addFields([{
      name: 'title',
      value: '',
      label: 'Title',
      type: 'text/plain'
    },
      {
        name: 'leadtext',
        value: '',
        label: 'Leadtext',
        type: 'text/plain'
      },
      {
        name: 'body',
        value: '',
        label: 'Body',
        type: 'text/xhtml'
      }]);

    this.setState(this.fieldEditor.initialize());
  }

  save() {}

  reset() {
    this.setState(this.fieldEditor.initialize());
  }

  render() {
    return (
        <div className="new-post">
          <h4>New post</h4>
          {

            this.fieldEditor && this.fieldEditor.getFields().map(field => (
                <>
                  <Field field={field}
                         key={field.id}
                         onChange={(fieldState) => this.setState(fieldState)}
                         fieldState={this.state[field.name]}
                         />
                  {/*<span style={{border: "1px solid red"}}>{this.state[field.name].value}</span>*/}
                </>
            ))
          }
          <div className="action-bar">
            <button className="save" onClick={() => this.save()}>Save</button>
            <button className="reset" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
    );
  }
}

