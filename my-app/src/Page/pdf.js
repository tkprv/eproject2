import React, { useState, useEffect , useRef} from 'react'
import axios from 'axios'
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown'
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Button, Checkbox, Form, Input } from 'antd'
import { Table } from 'antd';

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
const ReportstPDF = () => {
    const [form] = Form.useForm()
    const [datareport ,setDatareport] = useState()
    const [year,setYear] = useState()
    const [section,setSection] = useState() 
    const [status,setStatus] = useState()
    const [menu, setMenu] = useState(false)
    const [data, setData] = useState() 
    const [newreport, setNewreport] = useState() 

    const toggleMobileMenu = () => {
      setMenu(true)
    }
    useEffect(()=>{
        getfilepdf()
        getfiyears()
        getsection()
    },[])
    const  getfilepdf = () =>{
        axios
          .get("http://localhost:3001/report/reportst",{})
          .then((res) => {
            setDatareport(res.data)
            
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    
    const  getfiyears = () =>{
        axios
          .get("http://localhost:3001/report/fiyear",{})
          .then((res) => {
            setYear(res.data)
            
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    const  getsection = () =>{
        axios
          .get("http://localhost:3001/report/section",{}) 
          .then((res) => {
            setSection(res.data)
            console.log("sec",res.datas);
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    const statusproject = [
        { value:0,label: 'รอหัวหน้าฝ่ายพิจารณา' },
        { value:1,label: 'รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ' },
        { value:2,label: 'ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย' },
        { value:3,label: 'รอผู้บริหารพิจารณา' },
        { value:4,label: 'ผ่านอนุมัติ' },
        { value:5,label: 'ไม่ผ่านอนุมัติ' },
        { value:6,label: 'ปิดโครงการ/เสร็จตามระยะเวลา'},
        // { 7: 'ปิดโครงการ/เสร็จไม่ครงตามระยะเวลา'}
    ];

    const onFinish = (values) => {
        console.log(values);
        setData( values)
        // Oder()
        const setreport = datareport.filter(({fiscalyear,section_name,status}) => fiscalyear === values.fiyear.fiscalyear && section_name === values.section.section_name && status === values.status) 
        setNewreport(setreport)
        console.log("datttttt",setreport)
    
    }
  
      

    const columns = [
        {
          title: 'ชื่อโครงการ',
          dataIndex: 'project_name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'ฝ่าย',
          dataIndex: 'section_name',
          align: 'right',
        },
        
      {
        title: 'สถานะโครงการ',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: value => {
            if (value === 0 ) {
                return 'รอหัวหน้าฝ่ายพิจารณา'
            } else if(value === 1) {
                return 'รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ'
            }else if(value === 2) {
                return 'ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย'
            }else if(value === 3) {
                return 'รอผู้บริหารพิจารณา'
            }else if(value === 4) {
                return 'ผ่านอนุมัติ'
            }else if(value === 5) {
                return 'ไม่ผ่านอนุมัติ'
            }else if(value === 6) {
                return 'ปิดโครงการ/เสร็จตามระยะเวลา'
            }
            else{
                return ''
            }
        },
        width: 100,
    }]

      

   
        
    return (
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar /> 
        
        <div className="page-wrapper">
        
        <Card>

        <Form
      {...formItemLayout}
      form ={form}
      onFinish={onFinish}
     
    >
      <Form.Item
        name="fiyear"
        label="ปีงบประมาณ"
        rules={[
          {
            required: true,
            message: 'กรุณาเลือกปีงบปรมาณ',
          },
        ]}
        hasFeedback
      >
       <Dropdown options={year} optionLabel="fiscalyear" className="md:w-30rem"  placeholder="ปีงบประมาณ" />
      </Form.Item>

      <Form.Item
        name="section"
        label="ฝ่าย"
        rules={[
          {
            required: true,
            message: 'กรุณาเลือกฝ่าย',
          },
        ]}
        hasFeedback
      >
       <Dropdown options={section} value= {section} optionLabel="section_name"  className="w-full md:w-30rem"  placeholder="ฝ่าย" />
      </Form.Item>

      <Form.Item
        name="status"
        label="สถานะโครงการ"
        rules={[
          {
            required: true,
            message: 'กรุณาเลือกสถานะโครงการ',
          },
        ]}
        hasFeedback
      >
       <Dropdown options={statusproject} optionLabel="label" className="w-full md:w-30rem"  placeholder="สถานะโครงการ" />
      </Form.Item>

      

      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

      <Table
    columns={columns}
    dataSource={newreport}
    bordered
  />
    </Form>
        </Card>
        </div>
        </div>
    );
}

export default ReportstPDF