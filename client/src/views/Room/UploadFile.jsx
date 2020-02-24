import React from 'react';

import './UploadFile.less'

const uploadFile = () => {
  return (
    <section className='uploadFile_box'>
      <p className="tip">你可以在此上传文件，可共享给面试双方查看</p>
      <a className="upload_btn btn">上传文件</a>
      <p className="file_type">支持：DOC,PPT,XLS,PNG,JPEG,JPG,BMP,GIF</p>
      <p className="file_limit">文件小于10m</p>
    </section>
  );
};

export default uploadFile;