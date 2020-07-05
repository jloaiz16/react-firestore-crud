import React, { useState, useEffect } from 'react';
import './index.css';
import { db } from '../../config/firebase';

const LinkForm = (props) => {
  const initialState = {
    url: '',
    name: '',
    description: '',
  };

  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({ ...initialState });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getLinkById = async (id) => {
    const link = await db.collection('links').doc(id).get();
    setValues({ ...link.data() });
  };

  useEffect(() => {
    props.currentId
      ? getLinkById(props.currentId)
      : setValues({ url: '', name: '', description: '' });
  }, [props.currentId]);

  return (
    <form className='card card-body' onSubmit={handleSubmit}>
      <div className='from-group input-group form-section'>
        <div className='input-group-tex bg-light vertical-center'>
          <i className='material-icons'>insert_link</i>
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='Type some https://url.com'
          autoComplete='off'
          name='url'
          onChange={handleInputChange}
          value={values.url}
        />
      </div>

      <div className='from-group input-group form-section'>
        <div className='input-group-tex bg-light vertical-center'>
          <i className='material-icons'>create</i>
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='Type a website name'
          autoComplete='off'
          name='name'
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      <div className='form-group form-section'>
        <textarea
          className='form-control'
          placeholder='Type a description'
          name='description'
          onChange={handleInputChange}
          value={values.description}
          rows='3'
        ></textarea>
      </div>

      <button
        className={
          'btn  btn-block ' + (props.currentId ? 'btn-warning' : 'btn-primary')
        }
      >
        {props.currentId ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default LinkForm;
