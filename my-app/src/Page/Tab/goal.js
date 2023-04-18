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
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [goal, setGoal] = useState();
  const [datagoal, setDatagoal] = useState();
  const [goalid, setGoalid] = useState();
  const [indic, setIndic] = useState();
  const [dataindic, setDataindic] = useState();
  const [indicid, setIndicid] = useState();
  const [dataunit, setDataunit] = useState();
  const [datacost, setDatacost] = useState();
  const [tactic, setTactic] = useState();
  const [datatactic, setDatatactic] = useState();
  const [tacticid, setTacticid] = useState();
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
    setDisplayBasic(false);
    setVisible1(false)
    setVisible2(false)
    setVisible3(false)
  }

  const showgoal = (item) => {
    console.log('111', item)
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
    setVisible1(true)
  };

  const updategoal = (id, datagoal) => {
    console.log('4444', id)
    axios.put(`http://localhost:3001/stg/updategoal/${goalid}`, {
      goal_name: datagoal
    }
    )
    alert(`ต้องการแก้ไขเป้าประสงค์ใช่มั้ย?`)
    onHide(false)
    showgoal()
  };

  const showindic = (item) => {
    console.log('12222', item)
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
    setVisible2(true)
  };

  const updateindic = (id, dataindic, dataunit, datacost) => {
    console.log('9994', id)
    axios.put(`http://localhost:3001/stg/updateindic/${indicid}`, {
      indic_goal: dataindic,
      unit: dataunit,
      cost: datacost
    }
    )
    alert(`ต้องการแก้ไขตัวชี้วัด หน่วยนับ และค่าเป้าหมายใช่มั้ย?`)
    onHide(false)
    showindic()
  };

    const showtactic = (item) => {
    console.log('111', item)
    setTacticid(item.tactic_id)
    axios
      .get(`http://localhost:3001/stg/showtactic/${item.tactic_id}`, {})
      .then((res) => {
        setTactic(res.data[0].tactic_id)
        setDatatactic(res.data[0].tactic_name)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible3(true)
  };

  const updatetactic = (id, datatactic) => {
    console.log('4444', id)
    axios.put(`http://localhost:3001/stg/updatetactic/${tacticid}`, {
      tactic_name: datatactic
    }
    )
    alert(`ต้องการแก้ไขกลยุทธ์ใช่มั้ย?`)
    onHide(false)
    showtactic()
  };

  const actionTemplate = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-search"
          label='ดูตัวชี้วัดกับกลยุทธ์'
          className="p-button-success"
          style={{ marginRight: ".5em" }}
          onClick={() => show(node.goal_id)}
        ></Button>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขเป้าประสงค์'
          className="p-button-warning"
          style={{ marginRight: ".5em" }}
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
          style={{ textAlign: 'center', width: '10em' }}
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
          style={{ textAlign: 'center', width: '10em' }}
          onClick={() => showtactic(node)}
        ></Button>
      </div>
    );
  }

  const renderFooter1 = () => {
    return (

      <div>
        <Button label="ปิด" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        {/* <Button label="Yes" icon="pi pi-check" onClick={()=>confirm2(idd,dataUpdate)} autoFocus /> */}
      </div>
    );
  }

  const renderFooter2 = () => {
    return (

      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={() => updategoal(id, datagoal)} autoFocus />
      </div>
    );
  }

  const renderFooter3 = () => {
    return (

      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={() => updateindic(id, dataindic, dataunit, datacost)} autoFocus />
      </div>
    );
  }

  const renderFooter4 = () => {
    return (

      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={() => updatetactic(id, datatactic)} autoFocus />
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
          <div className="col-12 md:col-6" style={{ marginTop: "20px" }}>
            <div className="p-inputgroup"></div>
            <Dropdown
              value={filldata}
              options={newDatafillter}
              onChange={onnewDatagoaChange}
              optionLabel="goal_name"
              placeholder="เป้าประสงค์ "
            />
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


          {/* <Column field="tactic_name" header="กลยุทธ์" /> */}
        </DataTable>
      </div>

      <Dialog style={{ width: '800px' }} header={"ข้อมูลเป้าประสงค์"} modal className="p-fluid" visible={displayBasic} footer={renderFooter1} onHide={onHide}>
        <div>
          <DataTable value={indictable} columnResizeMode="fit" showGridlines responsiveLayout="scroll"  >
            <Column field="indic_goal" header="ตัวชี้วัด" />
            <Column field="unit" header="หน่วยนับ" />
            <Column field="cost" header="ค่าเป้าหมาย" />
            <Column body={editindic} header="จัดการ" style={{ textAlign: 'center', width: '20em' }} />
          </DataTable>
          {/* <h3 >กลยุทธ์ : </h3> */}
          <DataTable value={tactable} columnResizeMode="fit" showGridlines responsiveLayout="scroll"  >
            <Column field="tactic_name" header='กลยุทธ์' />
            <Column body={edittactic} header="จัดการ" style={{ textAlign: 'center', width: '20em' }} />
          </DataTable>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="แก้ไขเป้าประสงค์" modal className="p-fluid"
        visible={visible1}
        footer={renderFooter2}
        onHide={onHide}
      >
        <InputText
          value={datagoal}
          onChange={(e) => setDatagoal(e.target.value)}
          placeholder="ชื่อเป้าประสงค์"
        />
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="แก้ไขตัวชี้วัด หน่วยนับ ค่าป้าหมาย" modal className="p-fluid"
        visible={visible2}
        footer={renderFooter3}
        onHide={onHide}
      >
        <h4> ตัวชี้วัด</h4>
        <InputText
          value={dataindic}
          onChange={(e) => setDataindic(e.target.value)}
          placeholder="ชื่อตัวชี้วัด"
        />
        <h4 style={{ marginTop: '.5em'}}> หน่วยนับ</h4>
        <InputText
          value={dataunit}
          onChange={(e) => setDataunit(e.target.value)}
          placeholder="ชื่อหน่วยนับ"
        />
        <h4 style={{ marginTop: '.5em'}}> ค่าเป้าหมาย</h4>
        <InputText
          value={datacost}
          onChange={(e) => setDatacost(e.target.value)}
          placeholder="ชื่อค่าป้าหมาย"
        />
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="แก้ไขกลยุทธ์" modal className="p-fluid"
        visible={visible3}
        footer={renderFooter4}
        onHide={onHide}
      >
        <InputText
          value={datatactic}
          onChange={(e) => setDatatactic(e.target.value)}
          placeholder="ชื่อกลยุทธ์"
        />
      </Dialog>
    </div>

  )
}

export default DataGoal