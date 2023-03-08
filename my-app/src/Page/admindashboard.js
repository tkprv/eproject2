
/**
 * Signin Firebase
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//import {User,Avatar_19,Avatar_07,Avatar_06,Avatar_14} from '../Entryfile/imagepath';
//import '../Entryfile/imagepath';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import "../Page/index.css"
import axios from 'axios';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


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
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Admin!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>{IT.length}</h3> */}
                    <span>IT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    {/* <h3>{License.length}</h3> */}
                    <span>License</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>Network</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>User</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Activties</h3>
                      {/* <div id="bar-charts" /> */}
                      <ResponsiveContainer width='100%' height={300}>
                      {/* ถ้าจะทำลบ > barchart ออก */}
                        <BarChart> 

                          {/* data={barchartdata}
                          margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                          }}
                        >
                          <CartesianGrid />
                          <XAxis dataKey="y" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Total Income" fill="#ff9b44" />
                          <Bar dataKey="Total Outcome" fill="#fc6075" /> */}
                        </BarChart>
                      </ResponsiveContainer>

                    </div>
                  </div>
                </div>

                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Assest Category</h3>
                      <ResponsiveContainer width='100%' height={300}>
                      <LineChart data={linechartdata}>
                          {/* margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid  />
                        <XAxis dataKey="y" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total Sales" stroke="#ff9b44" fill="#ff9b44" strokeWidth={3} dot={{r : 3}} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="Total Revenue" stroke="#fc6075" fill="#fc6075" strokeWidth={3} dot={{r : 3}} activeDot={{ r: 7 }} /> */}
                      </LineChart>
                      </ResponsiveContainer>
                      
                      {/* <div id="line-charts" /> */}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}

export default withRouter(AdminDashboard);


