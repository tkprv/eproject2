import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import axios from "axios"
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Form } from 'antd';
import { Modal } from "antd"

const DataGoal = ({ id }) => {
  const [newDatagoa, setNewDatagoa] = useState()
  const [newDatafillter, setNewDatafillter] = useState()
  const [newindic, setNewindic] = useState()
  const [filldata, setFilldatar] = useState()
  const [displayBasic, setDisplayBasic] = useState(false)
  const [idd, setIdd] = useState()
  const [indictable, setIndictable] = useState()
  const [newtactic, setNewtactic] = useState()
  const [tactable, setTactable] = useState()
  const [goal, setGoal] = useState();
  const [datagoal, setDatagoal] = useState();
  const [goalid, setGoalid] = useState();
  const [indic, setIndic] = useState();
  const [dataindic, setDataindic] = useState();
  const [indicid, setIndicid] = useState();
  const [dataunit, setDataunit] = useState();
  const [datacost, setDatacost] = useState();
  const [tactic, setTactic] = useState();
  const [dataTactic, setDataTactic] = useState();
  const [tacticid, setTacticid] = useState();
  const [form] = Form.useForm();
  const [displayBasic1, setDisplayBasic1] = useState(false)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)

  // /datast /indic
  useEffect(() => {
    getdatagoa()
    getindic()
    gettactic()
  }, [])

  const getdatagoa = () => {
    axios
      .get(`http://localhost:3001/stg/goaal${id}`, {})
      .then((res) => {
        setNewDatagoa(res.data)
        setNewDatafillter(res.data)

      })
      .catch((error) => {
        console.log(error)
      });
  };



  const getindic = () => {
    axios
      .get('http://localhost:3001/stg/indic', {})
      .then((res) => {
        setNewindic(res.data)
        // Stopen(res.data) /tactic

      })
      .catch((error) => {
        console.log(error)
      });
  };

  const gettactic = () => {
    axios
      .get('http://localhost:3001/stg/tactic', {})
      .then((res) => {
        setNewtactic(res.data)
        // Stopen(res.data) 

      })
      .catch((error) => {
        console.log(error)
      });
  };


  const onnewDatagoaChange = (e) => {
    setFilldatar(e.value)
    const q = e.value.goal_name
    const setfill = newDatafillter.filter((newDatagoa) => newDatagoa.goal_name === q)
    setNewDatagoa(setfill)
  }

  const show = (id) => {
    setIdd(id)
    const setindic = newindic.filter((newindic) => newindic.goal_id === id)
    setIndictable(setindic)
    const settac = newtactic.filter((newtactic) => newtactic.goal_id === id)
    setTactable(settac)
    //  console.log("ac",tactable.tactic_name)
    setDisplayBasic(true)
  }

  const onHide = () => {
    setDisplayBasic(false)
    form.resetFields()
  }

  const onHide1 = () => {
    setDisplayBasic1(false)
    form.resetFields()
  }

  const onHide2 = () => {
    setDisplayBasic2(false)
    form.resetFields()
  }
  const onHide3 = () => {
    setDisplayBasic3(false)
    form.resetFields()
  }

  const showgoal = (item) => {
    setDisplayBasic1(true)
    setGoalid(item.goal_id)
    axios
      .get(`http://localhost:3001/stg/showgoal/${item.goal_id}`, {})
      .then((res) => {
        setGoal(res.data[0].tactic_id)
        setDatagoal(res.data[0].goal_name)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updategoal = (id, datagoal) => {
    axios.put(`http://localhost:3001/stg/updategoal/${goalid}`, {
      goal_name: datagoal
    }
    )
    onHide1()
    getdatagoa()
  };

  const showindic = (item) => {
    setDisplayBasic2(true)
    setIndicid(item.indic_goal_id)
    axios
      .get(`http://localhost:3001/stg/showindic/${item.indic_goal_id}`, {})
      .then((res) => {
        setIndic(res.data[0].indic_goal_id)
        setDataindic(res.data[0].indic_goal)
        setDataunit(res.data[0].unit)
        setDatacost(res.data[0].cost)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updateindic = (id, dataindic, dataunit, datacost) => {
    axios.put(`http://localhost:3001/stg/updateindic/${indicid}`, {
      indic_goal: dataindic,
      unit: dataunit,
      cost: datacost
    }
    )
    onHide2()
    show(idd)
  };

  const showtactic = (item) => {
    setDisplayBasic3(true)
    setTacticid(item.tactic_id)
    axios
      .get(`http://localhost:3001/stg/showtactic/${item.tactic_id}`, {})
      .then((res) => {
        setTactic(res.data[0].tactic_id)
        setDataTactic(res.data[0].tactic_name)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updatetactic = (id, datatactic) => {
    axios.put(`http://localhost:3001/stg/updatetactic/${tacticid}`, {
      tactic_name: datatactic
    }
    )
    onHide3()
    show(idd)
  };

  const actionTemplate = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-search"
          label='ดูตัวชี้วัดกับกลยุทธ์'
          className="p-button-success"
          style={{ marginRight: ".5em", height: '2.5em' }}
          onClick={() => show(node.goal_id)}
        ></Button>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขเป้าประสงค์'
          className="p-button-warning"
          style={{ marginRight: ".5em", height: '2.5em' }}
          onClick={() => showgoal(node)}
        ></Button>
      </div>
    );
  }

  const editindic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขตัวชี้วัด'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '10em', height: '2.5em' }}
          onClick={() => showindic(node)}
        ></Button>
      </div>
    );
  }

  const edittactic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขกลยุทธ์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '10em', height: '2.5em' }}
          onClick={() => showtactic(node)}
        ></Button>
      </div>
    );
  }

  return (
    <div >
      <div className="fit">
        <div className="grid p-fluid">
          <div className="col-12 md:col-3" style={{ marginTop: "20px" }}></div>

          <div className="col-12 md:col-3" style={{ marginTop: "20px" }}>
            <div className="p-inputgroup"></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}></div>
      <div >
        <DataTable value={newDatagoa} columnResizeMode="fit" showGridlines responsiveLayout="scroll"  >
          <Column field="goal_name" header="เป้าประสงค์" style={{ width: '3%' }} />
          <Column
            body={actionTemplate}
            header="จัดการ"
            style={{ textAlign: "center", width: "15%" }}
          />
        </DataTable>
      </div>

      <div>
        <Modal
          title={<p className="m-0">{'ข้อมูลเป้าประสงค์'}</p>}
          open={displayBasic}
          onCancel={onHide}
          footer={null}
          width={700}
        >
          <div>
            <DataTable value={indictable} columnResizeMode="fit" showGridlines responsiveLayout="scroll"  >
              <Column field="indic_goal" header="ตัวชี้วัด" />
              <Column field="unit" header="หน่วยนับ" />
              <Column field="cost" header="ค่าเป้าหมาย" />
              <Column body={editindic} header="จัดการ" style={{ textAlign: 'center', width: '20em' }} />
            </DataTable>
            <DataTable value={tactable} columnResizeMode="fit" showGridlines responsiveLayout="scroll"  >
              <Column field="tactic_name" header='กลยุทธ์' />
              <Column body={edittactic} header="จัดการ" style={{ textAlign: 'center', width: '20em' }} />
            </DataTable>
          </div>
          <div className="text-right mt-4">
            <Button label="ปิด" icon="pi pi-times" className="p-button-danger" onClick={onHide} style={{ height: '2.5em' }} />
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          title={<p className="m-0">{'แก้ไขข้อมูลเป้าประสงค์'}</p>}
          open={displayBasic1}
          onCancel={onHide1}
          footer={null}
          width={700}
        >
          <InputText
            value={datagoal}
            onChange={(e) => setDatagoal(e.target.value)}
            style={{ marginTop: '.5em' }}
            placeholder="ชื่อเป้าประสงค์"
          />
          <div className="text-right mt-4">
            <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em'}} onClick={onHide1} />
            <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updategoal(id, datagoal)} autoFocus />
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          title={<p className="m-0">{'แก้ไขข้อมูลตัวชี้วัด หน่วยนับ ค่าเป้าหมาย'}</p>}
          open={displayBasic2}
          onCancel={onHide2}
          footer={null}
          width={700}
        >
          <h4 style={{ marginTop: '.5em' }}>ตัวชี้วัด</h4>
          <InputText
            value={dataindic}
            onChange={(e) => setDataindic(e.target.value)}
            placeholder="ชื่อตัวชี้วัด"
          />
          <h4 style={{ marginTop: '.5em' }}> หน่วยนับ</h4>
          <InputText
            value={dataunit}
            onChange={(e) => setDataunit(e.target.value)}
            placeholder="ชื่อหน่วยนับ"
          />
          <h4 style={{ marginTop: '.5em' }}> ค่าเป้าหมาย</h4>
          <InputText
            value={datacost}
            onChange={(e) => setDatacost(e.target.value)}
            placeholder="ชื่อค่าป้าหมาย"
          />
          <div className="text-right mt-4">
            <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em'}} onClick={onHide2} />
            <Button label="ตกลง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em'}} onClick={() => updateindic(id, dataindic, dataunit, datacost)} autoFocus />
          </div>
        </Modal>
      </div>


      <div>
        <Modal
          title={<p className="m-0">{'แก้ไขข้อมูลกลยุทธ์'}</p>}
          open={displayBasic3}
          onCancel={onHide3}
          footer={null}
          width={700}
        >
          <InputText
            value={dataTactic}
            onChange={(e) => setDataTactic(e.target.value)}
            style={{ marginTop: '.5em' }}
            placeholder="ชื่อกลยุทธ์"
          />
          <div className="text-right mt-4">
            <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em'}} onClick={onHide3} />
            <Button label="ตกลง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em'}}onClick={() => updatetactic(id, dataTactic)} autoFocus />
          </div>
        </Modal>
      </div>
    </div>

  )
}

export default DataGoal