import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';
import React, { useState, useEffect , useRef} from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
// import { Button, Form } from 'antd';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';




const Managesys = () => {
    const [person, setPerson] = useState([])
    const [lazyItems, setLazyItems] = useState([])
    const [lazyLoading, setLazyLoading] = useState(false)
    const [position,setPosition] = useState()
    const [globalFilter, setGlobalFilter] = useState('')
    const [value1, setValue1] = useState('')
    const [displayBasic, setDisplayBasic] = useState(false)
    const [dataUpdate ,setDataUpdate] = useState('')
    const [id, setId] = useState()
    
      
    const [menu, setMenu] = useState(false)
    const toggleMobileMenu = () => {
      setMenu(!menu)
    }
    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }))
        setLazyLoading(false);
    },[])

    
    useEffect(() => {
        getposition()
    },[]) 
    
    
      const getposition = () => {
        axios
          .get("http://localhost:3001/agency",{})
          .then((res) => {
            setPosition(res.data)
        })
          .catch((error) => {
            console.log(error)
          });
      }

    useEffect(() => {
            if(globalFilter.length === 0){
                getposition()
            }
    },[globalFilter])
    const header = (
        <div className="table-header">
            {/* <h5 className="mx-0 my-1"> </h5> */}
            <span className="p-input-icon-left">
                 {/* pi-search" /> */}
                {/* <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." /> */}
                {/* <Dropdown value={globalFilter} options={position} onChange={(e) => setGlobalFilter(e.target.value)} optionLabel="a_name" placeholder="select" /> */}
            </span>
        </div>
    );

    const actionTemplate = (node, column) => {
        return(
            <div >
            <Button type="button" icon="pi pi-pencil" className="p-button-warning"  style={{ marginRight: '.5em' }} onClick={()=> show(node.section_id)}></Button>
            {/* <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={() => {deleteperson(node.section_id)}}></Button> */}
        </div>
        ) 
        
    }
        const deleteperson = (a_id) => {
        axios.delete(`http://localhost:3001/delete2/${a_id}`)
        alert(`Delete id${a_id} sucessful`)
        getposition()
      }
    const addposition = (value1) => {
      try {
         axios.post('http://localhost:3001/createagency', {
            section_name: value1

            
        })
        getposition()
        setValue1('')
    } catch (e) {
    } 
    }
    const updateposiion = (ID,dataUpdate) => {

        axios.put(`http://localhost:3001/updateagency/${ID}`, { 
            section_name: dataUpdate
            
        }
            )
            onHide()
            getposition()
        
      };
    
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

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    

    const confirm2 = (id,dataUpdate) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
        updateposiion(id,dataUpdate)
    };

  

    
    

    const renderFooter = () => {
        return (
        
            <div>
                <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={()=>confirm2(id,dataUpdate)} autoFocus />
            </div>
            
        
        );
    }
        
    return (
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar /> 
        
        <div className="page-wrapper">
        <h3>กำหนดโครงสร้างหน่วยงาน
        </h3>
        <Card>
       
            <div className = 'text-left'> 
            <div className = 'mt-4' >
                <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{ marginRight: '.6em' }}/>
                <Button label="เพิ่มหน่วยงาน" icon=""className="p-button-success" onClick={()=>addposition(value1)} style={{ marginLeft: '.6em' }}/>
            </div>   
                <Dialog style={{ width: '450px' }} header="แก้ไขหน่วยงาน" modal className="p-fluid" visible={displayBasic} footer={renderFooter} onHide={onHide}>
                <label htmlFor="description">หน่วยงานของผู้ใช้งาน</label>
                <div>
                <InputText value={dataUpdate} placeholder="ชื่อหน่วยงาน" onChange={(e) => setDataUpdate(e.target.value)} />

                </div>
                </Dialog>
            
            <div >
            <div/>
            <br/>
            <div >
                <DataTable value={position}  columnResizeMode="fit" showGridlines responsiveLayout="scroll" >
                <Column field="section_id" header="ลำดับ"style={{width:'3%'}} />
                <Column field="section_name" header="ชื่อหน่วยงาน" />
                <Column body={actionTemplate} header="แก้ไข" style={{ textAlign: 'center', width: '15%' }} />
           
                 </DataTable>

             </div>
            </div>
            </div>
            
            </Card>
            </div>
            </div>
    );
}

export default Managesys