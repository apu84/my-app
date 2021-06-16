import React, {useState} from "react";
import FieldEditor from "../components/field-editor";
import Field from "../components/field";
import {useDispatch, useSelector} from "react-redux";
import { selectCreatePost, newPost} from './new-post-slice';

export default function NewPost() {
  const posts = useSelector(selectCreatePost);
  const dispatch = useDispatch();

  const fieldEditor = new FieldEditor();
  fieldEditor.addFields([{
    name: 'title',
    label: 'Title',
    type: 'text/plain'
  },
    {
      name: 'leadText',
      label: 'Leadtext',
      type: 'text/plain'
    },
    {
      name: 'body',
      label: 'Body',
      type: 'text/xhtml'
    }]);

  const [localField, setLocalFieldValue] = useState({});
  const resetForm = () => {
    fieldEditor.getFields().forEach(f => setFieldValue(f.name, ''));
  };

  const setFieldValue = (fieldName, value) => {
    const field = {};
    field[fieldName] = value

    setLocalFieldValue(prevState => {
      return {
        ...prevState, ...field
      }
    });
  };

  const saveForm = () => {
    dispatch(newPost(localField));
    resetForm();
  };

  return (
      <div className="new-post">
        <h4>New post</h4>
        {
          fieldEditor && fieldEditor.getFields().map(field => (
              <Field field={field}
                     key={field.id}
                     value={localField[field.name]}
                     onChange={value => setFieldValue(field.name, value)}/>
          ))
        }
        <div className="action-bar">
          <button className="save" onClick={() => saveForm()}>Save</button>
          <button className="reset" onClick={() => resetForm()}>Reset</button>
        </div>

        <h4>Posts</h4>
        <div>
          {
            posts && posts.map(p => (
                <article>
                  <strong>{p.title}</strong>
                  <p>{p.leadText}</p>
                  <div dangerouslySetInnerHTML={{__html: p.body}}/>
                </article>
            ))
          }
        </div>
      </div>
  );

}

