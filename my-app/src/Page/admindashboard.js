
/**
 * Signin Firebase
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import "../Page/index.css"
import axios from 'axios';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Card } from 'primereact/card';
import logo from './font/Master Logo_KMUTNB_Thai PNG.png'
import image from './font/123841312.jpeg'
import image2 from './font/kmutnb.jpg'

import { Row,Col } from 'antd'
import { Carousel } from 'primereact/carousel';

const barchartdata = [
  { y: '2006', "Total Income": 100, 'Total Outcome': 90 },
  { y: '2007', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2008', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2009', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2010', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2011', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2012', "Total Income": 100, 'Total Outcome': 90 }
];
const linechartdata = [
  { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
  { y: '2007', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2008', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2009', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2010', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2011', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];
const AdminDashboard = () => {

  
  const [IT, setIt] = useState()
  const [License, setLicense] = useState()
  const [Admin, setAdmin] = useState()

  const [menu, setMenu] = useState(false)
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });

  useEffect(() => {
    getIT()
  }, [])

  const getIT = async () => {
    try {
      //const { data } = await axios.get('http://localhost:5000/DB/test')
      // console.log(data.length)
     // setIt(data)
    } catch (error) {

    }
  }
  //console.log(IT.length)

  useEffect(() => {
    getLicense()
  }, [])

  const cardStyle = { backgroundColor: '#7B8189' }
 
    const contentStyle = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    }
 
  const getLicense = async () => {
    try {
      //const { data } = await axios.get('http://localhost:5000/DB/notebook')
      // console.log(data.length)
       //setLicense(data)
    } catch (error) {

    }
  }

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:5000/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
  //   } catch (error) {

  //   }
  // }

  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar /> 
      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard </title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
    <Card style={cardStyle}>
    <Row>
      <Col>
      <div style={{ marginLeft: '50px' }}>
        <img src={logo} width={150} height={50} alt=""  /> 
       
        </div>
        </Col>  
        <Col>
        <div style={{ marginLeft: '50px', marginTop: '20px', fontFamily: "'THSarabunNew', sans-serif", fontWeight: 'bold', fontSize: '26px', color: '#FFFFFF' }}>
          <p>
          มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ <br></br>
          KING MONGKUT'S UNIVERSITY OF TECHNOLOGY NORTH BANGKOK<br></br>
          ระบบบริหารและประเมินโครงการ   
          </p>
      </div>
      </Col>
      </Row>         
      </Card>
            <br></br>
         <Card>
           <Row>
         <img src={image2} width={1600} height={1200} alt="" /> 
         </Row>
         </Card>

        </div>
      </div>
    </div>

  );
}

export default withRouter(AdminDashboard);


