import React, {useState} from "react";
import FieldEditor from "../components/field-editor";
import Field from "../components/field";
import {useDispatch, useSelector} from "react-redux";
import {selectPosts, newPost, selectStatus, editPost} from './post-slice';
import NProgress from 'nprogress/nprogress';

export default function NewPost() {
  const [key, setKey] = useState(0);

  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50
  });

  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  const fieldEditor = new FieldEditor();
  fieldEditor.addFields([
   /* {
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
      type: 'text/xhtml',
      defaultValue: '<br/>'
    }*/
    {
      type: 'file',
      name: 'file',
      label: 'Upload'
    }
  ]);

  const [localField, setLocalFieldValue] = useState(fieldEditor.initialize());

  const resetForm = () => {
    fieldEditor.getFields().forEach(f => setFieldValue(f.name, ''));
    setKey(getRandomInt());
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
    dispatch(!localField.id ? newPost(localField) : editPost(localField));
    resetForm();
  };

  if (status === 'pending') {
    NProgress.inc();
  } else if (status === 'fulfilled') {
    NProgress.done();
  }

 const getKey = fieldName => fieldName +'-'+ key;

 const getPostKey = fieldName => fieldName +'-'+ getRandomInt();

 const getRandomInt = (max) => Math.floor(Math.random() * (max || 1000));

 const editPostForm = post => {
  setLocalFieldValue(post);
  setKey(getRandomInt());
 };

  return (
      <div className="new-post">
        <h4>New post</h4>
        {
          fieldEditor && fieldEditor.getFields().map(field => (
              <Field field={field}
                     key={getKey(field.name)}
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
                <article key={getPostKey('article')}>
                  <button onClick={ () => editPostForm(p)}>Edit</button>
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

