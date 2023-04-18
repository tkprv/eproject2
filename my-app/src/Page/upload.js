import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from 'primereact/card'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message, Upload, Modal, notification, Button } from 'antd'

const { Dragger } = Upload;
const { confirm } = Modal;


function Uploadfile() {
  const [menu, setMenu] = useState(false)
  const toggleMobileMenu = () => {
    setMenu(true)
  }
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event, status) => {
    if (status === 1) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        showConfirm()
        event.target.value = null
      }
      console.log(event);
      setuserInfo({
        ...userInfo,
        file: event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0]),
      })
    } else {
      event.target.value = null
    }


  }

  const [isSucces, setSuccess] = useState(null);
  const showConfirm = (value, amount) => {
    confirm({
      title: "ไม่สามารถอัพไฟล์ได้",
      icon: <ExclamationCircleFilled />,
      content: "ไฟล์ต้องมีขนาดน้อยกว่า 5MB",
      onOk() {
        console.log("OK")

      },
      onCancel() {
        console.log("Cancel")
      },
    });
  };
  //const [isSucces, setSuccess] = useState(null);
  const [openFile, setOpenFile] = useState(null)
  //   useEffect(()=>{
  //     //getImage()
  //   })
  //   const { Dragger } = Upload;
  // const props = {
  //   name: 'file',
  //   multiple: true,
  //   //action: 'http://localhost:3001/',
  //   onChange(info) {
  // console.log(info);
  //     setuserInfo({
  //       ...userInfo,
  //       file:info.file,
  //     });

  // const formdata = new FormData();
  // var blob = new Blob([userInfo], { type: 'file/pdf' });
  // var blobUrl = URL.createObjectURL(blob);
  //         console.log('blob',blob);
  //         console.log('blobURL',blobUrl);
  // formdata.append('avatar', userInfo.file);
  // //formdata.append('id', id);
  // const image = { headers: { "Content-Type": "multipart/form-data" } }



  // axios.post("http://localhost:3001/torupload",{
  //   blobUrl
  //         // userInfo,

  // })
  //     .then(res => { 
  //         if (res.data.success === 1) {
  //             setSuccess("Image upload successfully");
  //         }
  //     })
  // const { status } = info.file;
  // if (status !== 'uploading') {
  //    console.log(info.file, info.fileList);
  //  }
  // if (status === 'done') {
  //   message.success(`${info.file.name} file uploaded successfully.`);
  // } else if (status === 'error') {
  //   message.error(`${info.file.name} file upload failed.`);
  // }
  // },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files)

  //   },
  //   maxFileSize: 10485760
  // };
  const submit = async () => {
    const formdata = new FormData();
    var blob = new Blob([userInfo], { type: 'file/pdf' });
    var blobUrl = URL.createObjectURL(blob);
    console.log('blob', blob);
    console.log('blobURL', blobUrl);
    formdata.append('avatar', userInfo.file);

    const image = { headers: { "Content-Type": "multipart/form-data" } }
    axios.post("http://localhost:3001/torupload", {

      userInfo, project_id: 445

    }).then(res => {
      // if (res) {
      notification.success({
        message: "สำเร็จ",
        description:
          'อัปโหลดไฟล์สำเร็จ',
      })
      getfile()
      //  }
    })

  }


  const getfile = () => {
    const id = 445
    axios
      .get(`http://localhost:3001/getpdf/${id}`, {})
      .then((res) => {
        setOpenFile(res.data)
        console.log(res.data)

      })
      .catch((error) => {
        console.log(error)
      });
    //console.log(openFile)
    //  axios.get(`http://localhost:3001/getimg`,{})
    //  .then((res)=>{
    //    console.log('data',res.data)
    //    //const pdfBlob = new Blob([res.data],{type:'application/pdf'}) 

    //  })
  }
  const openfile = (url) => {
    window.open(url)

  }

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />

        <div className="page-wrapper">
          <Card>
            <div className="container mr-60">
              <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>

              <div className="formdesign">
                {isSucces !== null ? <h4> {isSucces} </h4> : null}
                <div className="form-row">
                  <label className="text-white">Select Image :</label>
                  <input type="file" className="form-control" name="upload_file" accept=".pdf" maxsize='5MB' onChange={(e) => handleInputChange(e, 1)} />
                </div>

                <div className="form-row">
                  <button type="submit" className="btn btn-dark" onClick={() => submit()} > Save </button>

                </div>
              </div>
              {openFile?.map((item) => {
                return (
                  <Button
                    onClick={() => openfile(item.file)}>
                    Open Document
                  </Button>
                )
              })}
              {/* { <Button disabled = {openFile === null } onClick={openfile}> openfile</Button>
      } */}
              {/* {userInfo.filepreview !== null ? 
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null} */}

            </div>
          </Card>
        </div>
      </div>

    </>

  );
}

export default Uploadfile