import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const PreviewPost = () => {
    const location = useLocation();
    const [htmlcontent, setHtmlcontent] = useState('');
    useEffect(() => {
        setHtmlcontent(location.state.content)
    }, []);

  return (
    <div>
        <h4 className='my-3 text-center'>This is Preview Page</h4>
        
        <div dangerouslySetInnerHTML={{ __html: htmlcontent }} />
    </div>
  )
}

export default PreviewPost