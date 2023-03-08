import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import moment from "moment";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";

const Datastatuspurchase = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [userproject, setUserproject] = useState([])
  const [statuspurchase, setStatuspurchase] = useState('')
  const [labelstatussell, setLabelstatussell] = useState([]);
  const [newstatuspurchase, setNewstatuspurchase] = useState('')
  const [value2, setValue2] = useState('')
  const [position, setPosition] = useState('center');
  const [id, setId] = useState("")
  const [displayBasic, setDisplayBasic] = useState(false)
  const [addstatus, setAddstatus] = useState('');
  const [updatestatus, setUpdatestatus] = useState('');
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()
  const [times2, setTimes2] = useState()
  const [dates2, setDates2] = useState()
  const [addprojectid, setAddprojectid] = useState()
  const [updatestatus2, setUpdatestatus2] = useState()
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [menu, setMenu] = useState(false)
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'addstatus': setAddstatus,
    'updatestatus': setUpdatestatus
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const add = (item) => {
    setAddprojectid(item)
    setVisible1(true)
  }

  const update = (item) => {
    axios
      .get(`http://localhost:3001/supplies/statuspurchase/${item.project_id}`, {})
      .then((res) => {
        setUpdatestatus2(res.data[0].statuspurchase_id)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible2(true)
  }

  const detailproject = (node) => {
    return <div>
      <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/tapbar/supplies", state: node })
      } />
    </div>;
  }

  const Status = (node) => {
    if (node.status === 0) {
      return <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag>
    } else if (node.status === 1) {
      return <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ" rounded></Tag>
    } else if (node.status === 2) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag>
    } else if (node.status === 3) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา" rounded></Tag>
    } else if (node.status === 4) {
      return <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag>
    } else if (node.status === 5) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>
    } else {
      return node.status
    }
  }

  const Statuspurchase = (node) => {
    if (node.status === 4) {
      return <div>
        <Button icon="pi pi-plus" className="p-button-success" onClick={() => add(node)} />
        <Button icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => update(node)} />
      </div>
    } else {
      return <div>
        <Button icon="pi pi-plus" className="p-button-success" disabled />
        <Button icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} disabled />
      </div>
    }

  }

  const footerContent1 = () => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => setVisible1(false)} />
        <Button label="เพิ่ม" icon="pi pi-plus" className="p-button-success" style={{ width: '20%' }} onClick={() => addstatusstatuspurchase(statuspurchase)} autoFocus />
      </div>
    );
  }

  const footerContent2 = () => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => setVisible2(false)} />
        <Button label="อัพเดต" icon="pi pi-download" className="p-button-success" style={{ width: '20%' }} onClick={() => updatestatuspurchase(updatestatus2)} autoFocus />
      </div>
    )
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/dataproject/fiscalyear", {})
      .then((res) => {
        setFiscalyear(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const onsetFiscalyear = (e) => {
    setSelectedFiscalyear(e.value);
  }

  useEffect(() => {
    Project()
  }, []);

  const Project = () => {
    axios
      .get("http://localhost:3001/dataproject/projecttor", {})
      .then((res) => {
        setProject(res.data)
        console.log('log', res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addstatusstatuspurchase = (status) => {
    setVisible1(false)
    const time1 = moment(times1).format('hh:mm:ss');
    const date1 = moment(dates1).format('YYYY-MM-DD')
    console.log('project', addprojectid.project_id)
    axios
      .post(`http://localhost:3001/supplies/addstatuspurchase`, {
        user_id: 4,
        statuspurchase: status,
        time_statuspurchase: time1,
        date_statuspurchase: date1,
        project_id: addprojectid.project_id
      })
    alert(`เพิ่มสถานะการจัดซื้อจัดจ้างในโครงการนี้หรือไม่?`)
  }

  const updatestatuspurchase = (id) => {
    setVisible2(false)
    const time2 = moment(times2).format('hh:mm:ss');
    const date2 = moment(dates2).format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/supplies/updatestatuspurchase/${id}`, {
        statuspurchase: newstatuspurchase,
        time_statuspurchase: time2,
        date_statuspurchase: date2,
        id: id
      }).then((res) => {
        setLabelstatussell(
          labelstatussell.map((val) => {
            return val.statuspurchase_id === id ? {
              user_id: 4,
              statuspurchaset: newstatuspurchase,
              time_statuspurchase: time2,
              date_statuspurchase: date2,
              project_id: addprojectid.project_id
            } : val;
          })
        )
      })
    alert(`อัพเดตสถานะการจัดซื้อจัดจ้างโครงการหรือไม่`)
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <h3>จัดการสถานะจัดซื้อจัดจ้าง</h3>
          <Card>
            <div align='left'>
              <div className="fit">
                <h4>ปีงบประมาณ</h4>
                <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="ทุกปี" />
                <h4>สถานะ</h4>
                <Dropdown value={value2} style={{ width: '30em' }} onChange={(e) => setValue2(e.target.value)} placeholder="ทุกสถานะ" />
                <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: '.8em' }} />
              </div>
              <div style={{ marginTop: "2.5em" }}>
                <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                  <Column field="project_name" header="ชื่อโครงการ" />
                  <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
                  <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "20%" }} />
                  <Column body={Statuspurchase} field="status" header="สถานะการจัดซื้อจัดจ้าง" style={{ textAlign: 'center', width: "16.5%" }} />
                  <Column field="value" header="วันที่สร้าง" style={{ textAlign: 'center', width: "13%" }} />
                </DataTable>
              </div>

              <div className="card flex justify-content-center">
                <Dialog header="เพิ่มสถานะการจัดซื้อจัดจ้าง" visible={visible1} style={{ width: '40vw' }} breakpoints={{ '950x': '75vw' }} onHide={() => setVisible1(false)} footer={footerContent1('addstatus')}>
                  <InputTextarea value={statuspurchase} planceholder="เพิ่มสถานะการจัดซื้อจัดจ้าง" onChange={(e) => setStatuspurchase(e.target.value)} rows={8} cols={71} />
                </Dialog>
              </div>

              <div className="card flex justify-content-center">
                <Dialog header="อัพเดตสถานะการจัดซื้อจัดจ้าง" visible={visible2} style={{ width: '40vw' }} onHide={() => setVisible2(false)} footer={footerContent2('updatestatus')}>
                  <InputTextarea value={newstatuspurchase} planceholder="อัพเดตสถานะการจัดซื้อจัดจ้าง" onChange={(e) => setNewstatuspurchase(e.target.value)} rows={8} cols={71} />
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Datastatuspurchase