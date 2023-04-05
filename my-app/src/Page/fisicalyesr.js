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
import { Calendar } from "primereact/calendar";
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card'
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import moment from "moment";
import {Col,Divider,Form,Input} from "antd"


const formItemLayout = {
  labelAlign: "center",
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 5 },
    sm: { span: 15 },
  },

};
const Years = () => {
    const [year, setYear] = useState()
    console.log('ddjj',year);
    const date = moment(year).add(543, 'year').format('YYYY')
    const [menu, setMenu] = useState(false)
    const [form] = Form.useForm()
    const toggleMobileMenu = () => {
      setMenu(true)
    }


      const updatefisicalyear =() =>{ 
        console.log('dd',date);
        const ID = 1
        axios.put(`http://localhost:3001/plan/updateyears/${ID}`, { 
          years: date
      })
      
    }
    const onFinish = (value) =>{
      console.log(value)
      updatefisicalyear(value)
    }
    
        
    return (
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar /> 
        
        <div className="page-wrapper">
        <h>ตั้งค่าปีงบประมาณ
        </h>
        <Card>
        <Form
        form={form}
        onFinish={onFinish}
        name="dynamic_rule"
        layout="inline"
        style={{
          justifyItems: 'center',
          maxWidth: '100%',
          border: 'none', 
          boxShadow: 'none' 
        }}
      >
        
        <Form.Item
          //{...formItemLayout}
          style={{textAlign: 'center'}}
          name="yearsfi"
          label="ปีงบประมาณ"
          rules={[
            {
              required: true,
              message: "ปีงบประมาณ",
            },
          ]}
        >
         <Calendar
              id="yearpicker"
              value={year}
              onChange={(e) => setYear(e.value)}
              view="year"
              dateFormat="yy"
            />
        </Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            className="p-button-success"
           // onClick={() => addstrategic(value1)}
          >
           เพิ่ม
          </Button>
    </Form>
        {/* <Calendar
              id="yearpicker"
              value={year}
              onChange={(e) => setYear(e.value)}
              view="year"
              dateFormat="yy"
            />
             <Button
            label="ตั้งค่า"
            className="p-button-success"
            onClick={updatefisicalyear}
            style={{ marginLeft: "8px" }}/>
             */}
        </Card>
        </div>
        </div>
    );
}

export default Years