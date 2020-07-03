import React from 'react';
import './index.css';

const LinkForm = () => {
  return (
    <form className='card card-body'>
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
        />
      </div>

      <div className='form-group form-section'>
        <textarea
          className='form-control'
          placeholder='Type a description'
          name='description'
          rows='3'
        ></textarea>
      </div>

      <button className='btn btn-primary btn-block'>Save</button>
    </form>
  );
};

export default LinkForm;
