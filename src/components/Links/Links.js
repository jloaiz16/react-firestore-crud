import React, { useEffect, useState } from 'react';
import LinkForm from '../LinkForm/LinkForm';
import { db } from '../../config/firebase';

const Links = () => {
  const [links, setLinks] = useState([]);

  const getLinks = async () => {
    try {
      db.collection('links').onSnapshot((links) => {
        const docs = [];
        links.forEach((link) => docs.push({ ...link.data(), id: link.id }));
        setLinks(docs);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addOrEditLink = async (link) => {
    try {
      await db.collection('links').doc().set(link);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className='col-12'>
      <LinkForm className='col-10' addOrEditLink={addOrEditLink} />
      <div className='col-12'>
        {links.map((link) => (
          <div className='card mt-2 col-12' key={link.id}>
            <div className='card-body'>
              <h3>{link.name}</h3>
              <p>{link.description}</p>
              <a href={link.url}>Visit website</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
