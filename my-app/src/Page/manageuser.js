import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import Adduser from "./adduser";
import "./addsert.css";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import axios from "axios";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const Manageuser = () => {
  const [person, setPerson] = useState([]);
  const [personfill, setPersonfill] = useState([]);
  const [lazyItems, setLazyItems] = useState([]);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [position, setPosition] = useState();
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setNewSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState();
  const [displayBasic, setDisplayBasic] = useState(false)
  const [privilege, setPrivilege] = useState('ผู้บริหาร');
  const [agency ,setAgency] = useState([])
  const [selectposition, setSelectposition] = useState(null);
  const [id, setId] = useState()
  const [menu, setMenu] = useState(false)
    
  const toggleMobileMenu = () => {
      setMenu(!menu)
  }

  // const [section, setSection] = useState([])
  let section = [];

  useEffect(() => {
    axios
      .get("http://localhost:3001/agency")
      .then((res) => {
        setPosition(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLazyItems(Array.from({ length: 100000 }));
    setLazyLoading(false);
  }, []);

  useEffect(() => {
    getperson();
  }, []);

  const getperson = () => {
    axios
      .get("http://localhost:3001/manageuser/person", {})
      .then((res) => {
        setPerson(res.data);
        setPersonfill(res.data)

        ///const director ,manager ,superviser,supplies,addmin,responsibles
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateuser = (ID,) => {
    console.log("agency",selectposition)
    axios.put(`http://localhost:3001/manageuser/updateuser/${ID}`, { 
      section_id: privilege === 'ผู้บริหาร' ? 0 : selectposition.section_id,
      director: privilege === 'ผู้บริหาร' ? 1 : 0,
      manager: agency.some((item)=>{return item === 'เจ้าหน้าที่แผน'}) ? 1 : 0,
      supervisor: agency.some((item)=>{return item === 'หัวหน้าฝ่าย'}) ? 1 : 0,
      supplies: agency.some((item)=>{return item === 'เจ้าหน้าที่พัสดุ'}) ? 1 : 0,
      responsible: agency.some((item)=>{return item === 'ผู้รับผิดชอบโครงงาน'}) ? 1 : 0,
      admin: agency.some((item)=>{return item === 'ผู้ดูแลระบบ'}) ? 1 : 0
        
    }
        )
        onHide()
        getperson();
    
  };

  const statususer = (node) => {
    if(node.flag === 1) {
      return <Tag className="mr-2" severity="success" value="ยังอยู่ในหน่วยงาน" rounded></Tag>
    } else if(node.flag === 0) {
      return <Tag className="mr-2" severity="danger" value="ลาออกจากหน่วยงาน" rounded></Tag>
    }
  }

  const actionTemplate = (node, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginRight: ".5em" }} onClick={()=> show(node.user_id)}
        > </Button>       
       

        
       <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ width: "3.7em" }}
          onClick={() => {
            updatestatusperson(node.user_id, 0);
          }}
        ></Button>
      </div>
    );
  };
  const deleteperson = (p_id) => {
    axios.delete(`http://localhost:3001/manageuser/delete/${p_id}`);
    alert(`Delete id${p_id} sucessful`)
    getperson();
  };
 
  const section2 = (rowData) => {
    
    const collunm = person.find((obj) => {
      return obj.user_id === rowData.user_id;
    });
    section = [];
    if (Boolean(+collunm.director)) {
      section.push("ผู้บริหาร")
    }
    if (Boolean(+collunm.manager)) {
      section.push("เจ้าหน้าที่แผน")
    }
    if (Boolean(+collunm.supervisor)) {
      section.push("หัวหน้าฝ่าย")
    }
    if (Boolean(+collunm.supplies)) {
      section.push("เจ้าหน้าที่พัสดุ")
    }
    if (Boolean(+collunm.responsible)) {
      section.push("ผู้รับผิดชอบโครงการ")
    }
    if (Boolean(+collunm.admin)) {
      section.push("ผู้ดูแลระบบ")
    }
    let rol = "" 
    section.forEach(element => {
      rol += element+"  "
    });
    return <div>{rol}</div>
  }
  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    
}
const show = (id) => {
    setDisplayBasic(true);
    setId(id)
   
}

const onHide = () => {
    setDisplayBasic(false);
}


const confirm2 = (id,dataUpdate) => {
  updateuser(id)
};

const renderFooter = () => {
  return (
      <div>
          <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
          <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={()=>confirm2(id)} autoFocus />
      </div>
      
  
  );
}

const onCityChange = (e) => {
  let selectedagency = [...agency];

  if (e.checked)
      selectedagency.push(e.value);
  else
      selectedagency.splice(selectedagency.indexOf(e.value), 1);

  setAgency(selectedagency);
}

const onPositionChange = (e) => {
  
  setSelectedPosition(e.value);
  const q = e.value.section_name
  const setst = personfill.filter((person) => person.section_name === q);
  setPerson(setst);
  
}


const updatestatusperson = async (id, n) => {
  console.log('tt', id)
    console.log('rr', n)
    axios
      .put(`http://localhost:3001/manageuser/updatestatusperson/${id}`, {
        flag: n
      })
    alert(`ต้องการนำผู้ใช้งานคนนี้${id} ออกจากระบบใช่หรือไม่?`)
}

  return (
    <>
    <Header onMenuClick={(value) => toggleMobileMenu()} />
    <Sidebar /> 
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
    <div className="page-wrapper">
    <h3>กำหนดสิทธิผู้ใช้งาน
        </h3>
    <Card>
    <div className="text-left">
      <div className="fit">
        <Dropdown
          value={selectedPosition}
          options={position}
          onChange={onPositionChange}
          optionLabel="section_name"
          placeholder="select"
        />
        <div className="text-right">
          <Adduser />
        </div>
      </div>
      <DataTable
        id="myTable"
        value={person}
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
        style={{ marginTop: "30px" }}
      >
        <Column field="user_id" header="ลำดับ" style={{ width: "2%", textAlign: 'center' }} />
        <Column field="username" header="Username" />
        <Column field="fname" header="ชื่อ" style={{ width: "12%" }}/>
        <Column field="lname" header="นามสกุล" style={{ width: "12%" }}/>
        <Column field="section_name" header="หน่วยงาน" />
        <Column body={statususer} header="สถานะ" style={{ textAlign: "center", width: "12%" }} />
        <Column field="user_id" body={section2} header="สิทธิผู้ใช้งาน" />
        <Column
          body={actionTemplate}
          header="จัดการ"
          style={{ textAlign: "center", width: "13%" }}
        />
      </DataTable>
      <div>   
          <Dialog  visible={displayBasic} style={{ width: '450px' }} header="แก้ไขสิทธิผู้ใช้งาน" modal className="p-fluid"  footer={renderFooter} onHide={onHide}>
          
            
      
      {privilege === 'ผู้ใช้งาน' ?
                    <div className="field">
                        <label htmlFor="description">หน่วยงานของผู้ใช้งาน</label>
                        {/* <DropdownDemo/> */}
                        <div>
                        <Dropdown value={selectposition} options={position} onChange={(e) => setSelectposition(e.target.value)} optionLabel="section_name" placeholder="select" /> 

                        </div>
                    </div>
                : 
                null}

                <h5>กำหนดสิทธิให้กับผู้ใช้งาน</h5>
        
                <div className="field-radiobutton">
                    <RadioButton inputId="ผู้บริหาร" name="ผู้บริหาร" value="ผู้บริหาร" onChange={(e) => setPrivilege(e.value)} checked={privilege === 'ผู้บริหาร'} />
                    <label htmlFor="ผู้บริหาร">ผู้บริหาร</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="ผู้ใช้งาน" name="ผู้ใช้งาน" value="ผู้ใช้งาน" onChange={(e) => setPrivilege(e.value)} checked={privilege === 'ผู้ใช้งาน'} />
                    <label htmlFor="ผู้ใช้งาน">สิทธิ์ของผู้ใช้ในหน่วยาน</label>
                </div>

                {privilege === 'ผู้ใช้งาน' ?
                    <div>
                        <div className="field-checkbox">
                            <Checkbox inputId="1" name="เจ้าหน้าที่แผน" value="เจ้าหน้าที่แผน" onChange={onCityChange} checked={agency.indexOf('เจ้าหน้าที่แผน') !== -1} 
                                        disabled={agency.length === 3 && agency.every((value) => {return value!== 'เจ้าหน้าที่แผน'})}/>
                            <label htmlFor="เจ้าหน้าที่แผน">เจ้าหน้าที่แผน</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="2" name="หัวหน้าฝ่าย" value="หัวหน้าฝ่าย" onChange={onCityChange} checked={agency.indexOf('หัวหน้าฝ่าย') !== -1} 
                                disabled={agency.length === 3 && agency.every((value) => {return value!== 'หัวหน้าฝ่าย'})}/>
                            <label htmlFor="หัวหน้าฝ่าย">หัวหน้าฝ่าย</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="3" name="เจ้าหน้าที่พัสดุ" value="เจ้าหน้าที่พัสดุ" onChange={onCityChange} checked={agency.indexOf('เจ้าหน้าที่พัสดุ') !== -1} 
                                disabled={agency.length === 3 && agency.every((value) => {return value!== 'เจ้าหน้าที่พัสดุ'})}/>
                            <label htmlFor="เจ้าหน้าที่พัสดุ">เจ้าหน้าที่พัสดุ</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="4" name="ผู้ดูแลระบบ" value="ผู้ดูแลระบบ" onChange={onCityChange} checked={agency.indexOf('ผู้ดูแลระบบ') !== -1} 
                                disabled={agency.length === 3 && agency.every((value) => {return value!== 'ผู้ดูแลระบบ'})}/>
                            <label htmlFor="ผู้ดูแลระบบ">ผู้ดูแลระบบ</label>
                        </div>
                
                    </div>
                :
                null}

          </Dialog>
        </div >
      <div/>
    </div>
    </Card>
    </div>
  </div>
  </>
  );
};

export default Manageuser