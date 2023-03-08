/**
 * App Header
 */
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21
} from '../../Entryfile/imagepath'

// import LogoOnlineAssest from '../Sidebar/img/LogoOnlineAssest.png';
// import user from '../Sidebar/img/user.jpg';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';



const Header = (props) => {

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }
  const onMenuClik = () => {
    props.onMenuClick()
  }

  const items = [
    {
      label: <a href="/app/profile/employee-profile">My Profile</a>,
      key: '0',
    },
    {
      label: <a href="/settings/companysetting">Settings</a>,
      key: '1',
    },
    {
      label: <a href="/login">Logout</a>,
      key: '2',
    },
  ];
  //let pathname = location.pathname

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          {/* <img src={LogoOnlineAssest} width={100} height={50} alt="" /> */}
        </Link>
      </div>


      {/* /Logo */}

      <a id="toggle_btn"  onClick={handlesidebar}>
        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}

      {/* /Header Title */}
      {/* <a id="mobile_btn" className="mobile_btn" href="#" onClick={() => onMenuClik()}><i className="fa fa-bars" /></a> */}
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
            {/* <a href="javascript:void(0);" className="responsive-search">
              <i className="fa fa-search" />
            </a> */}
            {/* <form>
              <input className="form-control" type="text" placeholder="Search here" />
              {/* <button className="btn" type="submit"><i className="fa fa-search" /></button> */}
            {/* </form>  */}
          </div>
        </li>
        {/* /Search */}

        {/* Notifications */}


        {/* <li className="nav-item dropdown has-arrow main-drop"> 
          <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <span className="user-img me-1"><img src={user} alt="" />
              <span className="status online" /></span>
            <span>Admin</span>
          </a>
          <div className="DownOutlindropdown-menu dropdown-menu-righted">
            <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
            <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
            <Link className="dropdown-item" to="/login">Logout</Link>
          </div>
        </li>  */}

        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="nav-item dropdown has-arrow main-drop">
          
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
              <span className="user-img me-1">
                {/* <img src={user} alt="" /> */}
              <span className="status online" /></span>
                {/* <span>
                  Click me
                  <DownOutlined />
                </span> */}
              </a>
            </Dropdown>
          </a>
          
        </li> 

        
       

        
      </ul>
      {/* /Header Menu */}

      


     



    </div>


  );
}


export default withRouter(Header);