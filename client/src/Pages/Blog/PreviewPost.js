import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';

const PreviewPost = () => {
  const [htmlcontent, setHtmlcontent] = useState('');

  const {id} = useParams("")

  const getBlogDetail = async () => {

    try {
      const res = await axios.get(`/getblogpostdetail/${id}`);
      setHtmlcontent(res.data[0].blog_content)
    } catch (error) {
      window.alert(error);
    }
  }
  useEffect(() => {
    getBlogDetail()
  }, []);

  return (
    <div>
      <h4 className='my-3 text-center'>This is Preview Page</h4>

      <div dangerouslySetInnerHTML={{ __html: htmlcontent }} />
    </div>
  )
}

export default PreviewPost