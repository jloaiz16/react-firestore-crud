import React, { useEffect, useState } from 'react';
import LinkForm from '../LinkForm/LinkForm';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

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
      if (currentId) {
        await db.collection('links').doc(currentId).update(link);
        toast('Link was updated succesfully', { type: 'info' });
        setCurrentId(null);
      } else {
        await db.collection('links').doc().set(link);
        toast('Link was created succesfully', { type: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeLink = async (link) => {
    swal(`Are you sure you want to delete ${link.name} website?`, {
      buttons: {
        cancel: 'No',
        delete: 'Yes, delete it',
      },
    }).then((value) => {
      if (value === 'delete') {
        try {
          db.collection('links').doc(link.id).delete();
          toast('Link was deleted succesfully', { type: 'error' });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const editLink = (id) => {
    setCurrentId(id);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className='col-12'>
      <LinkForm className='col-10' {...{ addOrEditLink, currentId }} />
      <div className='col-12'>
        {links.map((link) => (
          <div className='card mt-2 col-12' key={link.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <h3>{link.name}</h3>
                <div className='buttons'>
                  <i
                    className='material-icons btn'
                    onClick={() => editLink(link.id)}
                  >
                    create
                  </i>
                  <i
                    className='material-icons text-danger btn'
                    onClick={() => removeLink(link)}
                  >
                    close
                  </i>
                </div>
              </div>
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
