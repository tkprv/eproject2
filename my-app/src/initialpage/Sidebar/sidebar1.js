/**
 * App Header
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { getLocalDirector, getLocalManager, getLocalSupervisor, getLocalSupplies, getLocalResponsible, getLocalAdmin } from './utill';

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("")
  const [level2Menu, setLevel2Menu] = useState("")
  const [level3Menu, setLevel3Menu] = useState("")
  const director = getLocalDirector()
  const manager = getLocalManager()
  const leader = getLocalSupervisor()
  const supplies = getLocalSupplies()
  const responsible = getLocalResponsible()
  const admin = getLocalAdmin()

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);

  }

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value)
  }
  const toggleLevelThree = (value) => {
    setLevel3Menu(value)
  }

  let pathname = props.location.pathname
  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        <div className="sidebar-inner slimscroll" >

          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>ผู้ดูแลระบบ</span>
              </li>
              <li className={pathname.includes('admindashboard') ? "active" : ""}>
                <Link to="/Page/admindashboard"><i className="la la-users" /> <span>Dashboard</span></Link>
              </li>
              <li className={pathname.includes('managesys') ? "active" : ""}>
                <Link to="/manage"><i className="la la-users" /> <span>กำหนดโครงสร้างหน่วยงาน</span></Link>
              </li>
              <li className={pathname.includes('Activties') ? "active" : ""}>
                <Link to="/Page/manageUser"><i className="la la-users" /> <span>กำหนดสิทธิผู้ใช้งาน</span></Link>
              </li>
              <li className="menu-title">
                <span>เจ้าหน้าที่ฝ่ายแผน</span>
              </li>
              <li className={pathname.includes('strategicplan') ? "active" : ""}>
                <Link to="/Page/strategicplan"><i className="la la-users" /> <span>จัดการข้อมูลแผนยุทธ์ศาสตร์</span></Link>
              </li>
              <li className={pathname.includes('strategicissues') ? "active" : ""}>
                <Link to="/Page/strategicissues"><i className="la la-users" /> <span>จัดการข้อมูลประเด็นยุทธ์ศาสตร์ เป้าประสงค์ กลยุทธ์</span></Link>
              </li>
              <li className={pathname.includes('Datamanager') ? "active" : ""}>
                <Link to="/Page/Datamanager"><i className="la la-users" /> <span>จัดการข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datamanager') ? "active" : ""}>
                <Link to="/Page/ReportstPDF"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title">
                <span>หัวหน้าฝ่าย</span>
              </li>
              <li className={pathname.includes('Dataleader') ? "active" : ""}>
                <Link to="/Page/Dataleader"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Dataleader') ? "active" : ""}>
                <Link to="/Page/Dataleader"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title">
                <span>ผู้รับผิดชอบโครงการ</span>
              </li>
              <li className={pathname.includes('Newproject') ? "active" : ""}>
                <Link to="/Page/Newproject"><i className="la la-users" /> <span>สร้างโครงการใหม่</span></Link>
              </li>
              <li className={pathname.includes('Dataproject') ? "active" : ""}>
                <Link to="/Page/Dataproject"><i className="la la-users" /> <span>จัดการข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datareport') ? "active" : ""}>
                <Link to="/Page/Datareport"><i className="la la-users" /> <span>จัดการรายงานความก้าวหน้า</span></Link>
              </li>
              <li className={pathname.includes('Dataproject') ? "active" : ""}>
                <Link to="/Page/"><i className="la la-users" /> <span>โครงการที่ไม่ผ่านอนุมัติ</span></Link>
              </li>
              <li className="menu-title">
                <span>ผู้บริหาร</span>
              </li>
              <li className={pathname.includes('Datadirector') ? "active" : ""}>
                <Link to="/Page/Datadirector"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datadirector') ? "active" : ""}>
                <Link to="/Page/Datadirector"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title">
                <span>นักวิชาการพัสดุ</span>
              </li>
              <li className={pathname.includes('Datasupplies') ? "active" : ""}>
                <Link to="/Page/Datasupplies"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datastatuspurchase') ? "active" : ""}>
                <Link to="/Page/Datastatuspurchase"><i className="la la-users" /> <span>จัดการสถานะการจัดซื้อจัดจ้าง</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>

  );

}

export default withRouter(Sidebar);