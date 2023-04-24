/**
 * App Header
 */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  headerlogo,
  lnEnglish,
  lnFrench,
  lnSpanish,
  lnGerman,
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_06,
  Avatar_08,
  Avatar_09,
  Avatar_13,
  Avatar_17,
  Avatar_21,
} from "../../Entryfile/imagepath";
import { Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { removeLocalUser } from "../../helper/utill"
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined, } from "@ant-design/icons"
import kmu from '../Sidebar/img/kmu.png';
import { Modal } from "antd"
const { confirm } = Modal
const Header = (props) => {
  let history = useHistory()

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };

  const items = [
    {
      label: <a href="/login">Logout</a>,
      key: "2",
    },
  ]
  const Logout = () => {
    removeLocalUser()
    history.push("/Page/login")
  }

  const showConfirm = (value) => {
    confirm({
      title: "ออกจากระบบ",
      icon: <ExclamationCircleFilled />,
      content: "โปรดยืนยันออกจากระบบ",
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        console.log("ยืนยัน");
        Logout()

      },
      onCancel() {
        console.log("ยกเลิก");
      },
    });
  }

  return (
    <div className="header" style={{ right: "0px" }}>
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={kmu} width={350} height={100} alt="" />
        </Link>
      </div>

      <a id="toggle_btn" onClick={handlesidebar}>
        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3>ระบบบริหารและประเมินโครงการ</h3>
      </div>
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
          </div>
        </li>
        <a>
          <Button type="primary" style={{ marginTop: '1em' ,marginRight: '1em'}} onClick={showConfirm}>
            logout
          </Button>
        </a>
        {/* <a href="#" className="nav-item dropdown has-arrow main-drop">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <span className="user-img me-1">
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />{" "}
                  <span className="status online" />
                </span>

              </a>
              <a onClick={(e) => removeLocalUser()}></a>
            </Dropdown>
          </a> */}
      </ul >
    </div>
  );
};

export default withRouter(Header);
