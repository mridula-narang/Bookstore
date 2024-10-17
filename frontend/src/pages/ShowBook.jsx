import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setBook(res.data.book || res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <p><span className='text-xl mr-4 text-gray-500'>Id:</span>{book._id}</p>
            <p><span className='text-xl mr-4 text-gray-500'>Title:</span>{book.title}</p>
            <p><span className='text-xl mr-4 text-gray-500'>Author:</span>{book.author}</p>
            <p><span className='text-xl mr-4 text-gray-500'>Publish Year:</span>{book.publishYear}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
