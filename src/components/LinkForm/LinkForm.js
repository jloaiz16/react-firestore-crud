import React, { useState } from 'react';
import './index.css';

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

      <button className='btn btn-primary btn-block'>Save</button>
    </form>
  );
};

export default LinkForm;
