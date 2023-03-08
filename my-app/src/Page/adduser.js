import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { classNames, ConnectedOverlayScrollHandler } from 'primereact/utils';
// import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Formik, Form, Field } from 'formik';
import { Message } from 'primereact/message';



// import './DataTableDemo.css';

const Adduser = ({getuser}) => {

    let emptyProduct = {
        id: null,
        name: '',
        description: '',
        category: null,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const [user, setUser] = useState([])
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectposition, setSelectposition] = useState(null);
    const [position,setPosition] = useState()
    const [cities, setCities] = useState([]);
    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [test1,setTest1] =useState()
    const [privilege, setPrivilege] = useState('ผู้บริหาร');
    const [filteredResults, setFilteredResults] = useState([])

    useEffect(() => {
        onPositionChange()
    },[selectposition])

    useEffect(() => {
        axios.get("http://localhost:3001/agency")
          .then((res) => {
            setPosition(res.data)
        })
          .catch((error) => {
            console.log(error)
          });
      }, []);

      const onCityChange = (e) => {
          let selectedCities = [...cities];
  
          if (e.checked)
              selectedCities.push(e.value);
          else
              selectedCities.splice(selectedCities.indexOf(e.value), 1);
  
          setCities(selectedCities);
      }
      
  
    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }));
        setLazyLoading(false);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const onPositionChange = () => {
        
        console.log('position',selectposition)
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const saveProduct = async() => {
        hideDialog()
        // if(selectposition === null)
        //     alert('ไม่สามารถเพิ่มผู้ใช้งานได้เนื่องจากข้อมูลไม่ถูกต้อง')
      try {
        const {data} = await axios.post('http://localhost:3001/manageuser/create', {
            section_id: privilege === 'ผู้บริหาร' ? 0 : selectposition.section_id,
            username: filteredResults.username,
            fname: filteredResults.firstname_en,
            lname: filteredResults.lastname_en,
            email: filteredResults.email,
            director: privilege === 'ผู้บริหาร' ? 1 : 0,
            manager: cities.some((item)=>{return item === 'เจ้าหน้าที่แผน'}) ? 1 : 0,
            supervisor: cities.some((item)=>{return item === 'หัวหน้าฝ่าย'}) ? 1 : 0,
            supplies: cities.some((item)=>{return item === 'เจ้าหน้าที่พัสดุ'}) ? 1 : 0,
            responsible: cities.some((item)=>{return item === 'ผู้รับผิดชอบโครงงาน'}) ? 1 : 0,
            admin: cities.some((item)=>{return item === 'ผู้ดูแลระบบ'}) ? 1 : 0,
            flag : 1,
            displayname: filteredResults.displayname   
        })
        console.log(data)
    } catch (e) {
        console.log(e)
    }

    }
    
    const apiuser = () => {
        console.log("user",user)
        try {
           axios.post('http://localhost:3001/manageuser/api', {
            username: user   
          }).then((res) => {
            setFilteredResults(res.data.userInfo)
            
          })
          
      } catch (e) {} 
      }
const handerUser =(e) =>{
    apiuser()
}
      
    
    const onCategoryChange = (e) => {
        let _product = {...product};
        _product['category'] = e.value;
        setProduct(_product);
    }

    
  const onSubmit = (value) => {
        console.log(value);
  }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    )
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            {/* {test1.map((d, index) => <li key={index}>{d}</li>)} */}
            <div >
            <Button label="เพิ่มบัญชีผู้ใช้งาน" icon="pi pi-plus"className="p-button-success" onClick={openNew}/>
            </div>

          
            <Dialog visible={productDialog} style={{ width: '450px' }} header="เพิ่มบัญชีผู้ใช้งาน" modal className="p-fluid"  footer={productDialogFooter}  onHide={hideDialog}>
                 <div className="field">
                    <label htmlFor="name">Username</label>
                     <InputText  value={user} onChange={(e) => setUser(e.target.value)} />
                    <Button onClick={handerUser}></Button>
                      </div>
                
            
            
            <div>
            <div className="field">
                <label htmlFor="name">firstname</label>
                <InputText  value={filteredResults.firstname_en} onChange={(e) => setFirstname(e.target.value)}  />
                {submitted && !product.name && <small className="p-error">Username is required.</small>}
            </div>
            <div className="field">
                <label htmlFor="name">lastname</label>
                <InputText value={filteredResults.lastname_en} onChange={(e) => setLastname(e.target.value)} />
                {submitted && !product.name && <small className="p-error">Username is required.</small>}
            </div>
            <div className="field">
                <label htmlFor="name">email</label>
                <InputText value={filteredResults.email} onChange={(e) => setEmail(e.target.value)}  />
                {submitted && !product.name && <small className="p-error">Username is required.</small>}
            </div>
         </div>

            
           
            

                {privilege === 'ผู้ใช้งาน' ?
                    <div className="field">
                        <label htmlFor="description">หน่วยงาน</label>
                        {/* <DropdownDemo/> */}
                        <Dropdown value={selectposition} options={position} onChange={(e) => setSelectposition(e.target.value)} optionLabel="section_name" placeholder="select" /> 
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
                            <Checkbox inputId="1" name="เจ้าหน้าที่แผน" value="เจ้าหน้าที่แผน" onChange={onCityChange} checked={cities.indexOf('เจ้าหน้าที่แผน') !== -1} 
                                        disabled={cities.length === 3 && cities.every((value) => {return value!== 'เจ้าหน้าที่แผน'})}/>
                            <label htmlFor="เจ้าหน้าที่แผน">เจ้าหน้าที่แผน</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="2" name="หัวหน้าฝ่าย" value="หัวหน้าฝ่าย" onChange={onCityChange} checked={cities.indexOf('หัวหน้าฝ่าย') !== -1} 
                                disabled={cities.length === 3 && cities.every((value) => {return value!== 'หัวหน้าฝ่าย'})}/>
                            <label htmlFor="หัวหน้าฝ่าย">หัวหน้าฝ่าย</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="3" name="เจ้าหน้าที่พัสดุ" value="เจ้าหน้าที่พัสดุ" onChange={onCityChange} checked={cities.indexOf('เจ้าหน้าที่พัสดุ') !== -1} 
                                disabled={cities.length === 3 && cities.every((value) => {return value!== 'เจ้าหน้าที่พัสดุ'})}/>
                            <label htmlFor="เจ้าหน้าที่พัสดุ">เจ้าหน้าที่พัสดุ</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="4" name="ผู้ดูแลระบบ" value="ผู้ดูแลระบบ" onChange={onCityChange} checked={cities.indexOf('ผู้ดูแลระบบ') !== -1} 
                                disabled={cities.length === 3 && cities.every((value) => {return value!== 'ผู้ดูแลระบบ'})}/>
                            <label htmlFor="ผู้ดูแลระบบ">ผู้ดูแลระบบ</label>
                        </div>
                
                    </div>
                :
                null}
                     
            </Dialog>
             
        </div>
    );
}
              
export default Adduser 