/**
 * App Header
 */
 import React, { useEffect,useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

 
const Sidebar = (props) => {

const [isSideMenu, setSideMenu] = useState("")
const [level2Menu, setLevel2Menu] = useState("")
const [level3Menu, setLevel3Menu] = useState("")

const toggleSidebar = (value) => {
  console.log (value);
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
                <span>Main</span>
              </li>
             
              <li className={pathname.includes('admindashboard') ? "active" : ""}>
                  <Link to="/Page/admindashboard"><i className="la la-users" /> <span>Dashboard</span></Link>
                </li>
              {/* <li className="submenu">
                <a href="#" className={isSideMenu == "dashboard" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="dashboard" ? "": "dashboard")}><i className="la la-dashboard" /> <span> Dashboard</span> <span className="menu-arrow" /></a>
                { isSideMenu == "dashboard" ? 
                <ul >
                  <li><Link className={pathname.includes('main/dashboard') ?"active" :""} to="/app/main/dashboard">Admin Dashboard</Link></li>
                  <li><Link className={pathname.includes('main/employee-') ?"active" :""} 
                        to="/app/main/employee-dashboard">Employee Dashboard</Link></li>
                </ul>
                	:"" 
                }
              </li> */}


              {/* <li className="submenu">
                <a href="#" className={isSideMenu == "apps" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="apps" ? "": "apps")} ><i className="la la-cube" /> <span> Apps</span> <span className="menu-arrow" /></a>
                { isSideMenu == "apps" ? 
                <ul>
                  <li><Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">Chat</Link></li>
                  <li className="submenu">
                    <a href="#" className={level2Menu == "calls" ? "subdrop" : ""} onClick={()=> toggleLvelTwo(level2Menu =="calls" ? "": "calls")}><span> Calls</span> <span className="menu-arrow" /></a>
                    { level2Menu == "calls" ?  
                    <ul>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/voice-call">Voice Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/video-call">Video Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/outgoing-call">Outgoing Call</Link></li>
                      <li><Link onClick={()=>localStorage.setItem("minheight","true")} to = "/conversation/incoming-call">Incoming Call</Link></li>
                    </ul>
                    :"" 
                  }
                  </li>
                  <li><Link className={pathname.includes('apps/calendar') ?"active" :""} to="/app/apps/calendar">Calendar</Link></li>
                  <li><Link onClick={()=>localStorage.setItem("minheight","true")} className={pathname.includes('contacts') ?"active" :""} to="/app/apps/contacts">Contacts</Link></li>
                  <li><Link to = "/email/inbox">Email</Link></li>
                  <li><Link className={pathname.includes('file-manager') ?"active" :""} to="/app/apps/file-manager">File Manager</Link></li>
                </ul>
                	:"" 
                }
              </li>       */}

                <li className={pathname.includes('managesys') ? "active" : ""}>
                  <Link to="/manage"><i className="la la-users" /> <span>กำหนดโครงสร้างหน่วยงาน</span></Link>
                </li>      
              {/* <li className="submenu" >             
                <a href="#" className= {isSideMenu == "employee" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="employee" ? "": "employee")}><i className="la la-user" /> <span className="noti-dot"> Employees</span> <span className="menu-arrow" /></a>
                { isSideMenu == "employee" ? 
                
                <ul >
                  
                      
                  <li><Link className={pathname.includes('allemployees') ?"active" :pathname.includes('employees-list') ?"active" :""} 
                        to="/Page/allemployee">All Employees</Link></li>
                  <li><Link className={pathname.includes('holidays') ?"active" :""} to="/app/employee/holidays">Holidays</Link></li>
                  <li><Link className={pathname.includes('es-admin') ?"active" :""} to="/app/employee/leaves-admin">Leaves (Admin) <span className="badge badge-pill bg-primary float-end">1</span></Link></li>
                  <li><Link className={pathname.includes('ves-employee') ?"active" :""} to="/app/employee/leaves-employee">Leaves (Employee)</Link></li>
                  <li><Link className={pathname.includes('e-settings') ?"active" :""} to="/app/employee/leave-settings">Leave Settings</Link></li>
                  <li><Link className={pathname.includes('nce-admin') ?"active" :""} to="/app/employee/attendance-admin">Attendance (Admin)</Link></li>
                  <li><Link className={pathname.includes('ce-employee') ?"active" :""} to="/app/employee/attendance-employee">Attendance (Employee)</Link></li>
                  <li><Link className={pathname.includes('departments') ?"active" :""} to="/app/employee/departments">Departments</Link></li>
                  <li><Link className={pathname.includes('designations') ?"active" :""} to="/app/employee/designations">Designations</Link></li>
                  <li><Link className={pathname.includes('timesheet') ?"active" :""} to="/app/employee/timesheet">Timesheet</Link></li>
                  <li><Link className={pathname.includes('shift-scheduling') || pathname.includes('shift-list') ?"active" :""} 
                        to="/app/employee/shift-scheduling">Shift &amp; Schedule</Link></li>
                  <li><Link className={pathname.includes('overtime') ?"active" :""} to="/app/employee/overtime">Overtime</Link></li>
                </ul>
                	:"" 
                }
              </li> */}
              <li className={pathname.includes('Activties') ?"active" :""}> 
                <Link to = "/Page/manageUser"><i className="la la-users" /> <span>กำหนดสิทธิผู้ใช้งาน</span></Link>
              </li>
              <li className="menu-title"> 
                <span>เจ้าหน้าที่ฝ่ายแผน</span>
              </li>
              <li className={pathname.includes('strategicplan') ?"active" :""}> 
                <Link to = "/Page/strategicplan"><i className="la la-users" /> <span>จัดการข้อมูลแผนยุทธ์ศาสตร์</span></Link>
              </li>
              <li className={pathname.includes('strategicissues') ?"active" :""}> 
                <Link to = "/Page/strategicissues"><i className="la la-users" /> <span>จัดการข้อมูลประเด็นยุทธ์ศาสตร์ เป้าประสงค์ กลยุทธ์</span></Link>
              </li>
              <li className={pathname.includes('Datamanager') ?"active" :""}> 
                <Link to = "/Page/Datamanager"><i className="la la-users" /> <span>จัดการข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datamanager') ?"active" :""}> 
                <Link to = "/Page/Datamanager"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title"> 
                <span>หัวหน้าฝ่าย</span>
              </li>
              <li className={pathname.includes('Dataleader') ?"active" :""}> 
                <Link to = "/Page/Dataleader"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Dataleader') ?"active" :""}> 
                <Link to = "/Page/Dataleader"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title"> 
                <span>ผู้รับผิดชอบโครงการ</span>
              </li>
              <li className={pathname.includes('Newproject') ?"active" :""}> 
                <Link to = "/Page/Newproject"><i className="la la-users" /> <span>สร้างโครงการใหม่</span></Link>
              </li>
              <li className={pathname.includes('Dataproject') ?"active" :""}> 
                <Link to = "/Page/Dataproject"><i className="la la-users" /> <span>จัดการข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datareport') ?"active" :""}> 
                <Link to = "/Page/Datareport"><i className="la la-users" /> <span>จัดการรายงานความก้าวหน้า</span></Link>
              </li>
              <li className={pathname.includes('Dataproject') ?"active" :""}> 
                <Link to = "/Page/"><i className="la la-users" /> <span>โครงการที่ไม่ผ่านอนุมัติ</span></Link>
              </li>
              <li className="menu-title"> 
                <span>ผู้บริหาร</span>
              </li>
              <li className={pathname.includes('Datadirector') ?"active" :""}> 
                <Link to = "/Page/Datadirector"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datadirector') ?"active" :""}> 
                <Link to = "/Page/Datadirector"><i className="la la-users" /> <span>จัดการรายงาน</span></Link>
              </li>
              <li className="menu-title"> 
                <span>นักวิชาการพัสดุ</span>
              </li>
              <li className={pathname.includes('Datasupplies') ?"active" :""}> 
                <Link to = "/Page/Datasupplies"><i className="la la-users" /> <span>ข้อมูลโครงการ</span></Link>
              </li>
              <li className={pathname.includes('Datastatuspurchase') ?"active" :""}> 
                <Link to = "/Page/Datastatuspurchase"><i className="la la-users" /> <span>จัดการสถานะการจัดซื้อจัดจ้าง</span></Link>
              </li>
            </ul>
          </div>
        </div>
        </Scrollbars>
      </div>
       
      );
   
}

export default withRouter(Sidebar);
