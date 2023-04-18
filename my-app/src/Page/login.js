import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toast from "./toast/Toast";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Form } from 'antd';
import { InputText } from "primereact/inputtext";
import "./sigin.css";
import { setLocalUser } from '../helper/utill'
import logo from '../logo kmutnb.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const testListSuccess = [
  {
    id: 1,
    title: "Login Successfull",
    description: "",
    backgroundColor: "#5cb85c",
    // icon: checkIcon,
  },
];

const testListError = [
  {
    id: 1,
    title: "Email or Password weren't correct.",
    description: "Please check your Email and Password",
    backgroundColor: "#d9534f",
    // icon: errorIcon,
  },
];

const formItemLayout = {
  labelAlign: "left",
  labelCol: {
    xs: { span: 15 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 5 },
    sm: { span: 15 },
  },

};

function Signin() {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    username: String,
    email: String,
    scopes: "student"
    /*  currentUser: null,
    message: "", */
  });
  const [getuser, setGetuser] = useState();

  useEffect(() => { }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };




  const onSubmit = (e) => {
    e.preventDefault();
    /*   console.log(user); */

    fetch("http://localhost:3001/user/apilogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      /*   .then((res) => {
        if (res.ok) {
          history.push("/home");
        }
      }) */
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/Page/admindashboard")

        }, 500)
        if (data) {
          setLocalUser(data[0].user_id, data[0].displayname, data[0].section_id, data[0].director, data[0].manager, data[0].supervisor, data[0].supplies, data[0].responsible, data[0].admin)
        }

      })

      .catch((err) => {
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };


  return (
    <div className="signIn">
      <Toast
        triger={success}
        toastList={testListSuccess}
        position="top-right"
      />
      <Toast triger={error} toastList={testListError} position="top-right" />

      <div class="loginForm">
        <div style={{ marginLeft: '22.5em', marginTop: '10.5em' }}>
          <img src={logo} alt="logo" style={{ width: '22em' }} />
        </div>
        <div style={{ marginLeft: '19em', marginTop: '.5em' }}>
          <h2>ระบบบริหารและประเมินผลโครงการ</h2>
        </div>

        <div className="form-div" style={{ marginLeft: '31em' }}>
          <form /* onSubmit={this.onSubmit} */>
            <h2 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h2>
            <Form
              name="dynamic_form_item"
              onFinish={onSubmit}
              form={form}
              layout="vertical"
              size={'large'}
              style={{
                maxWidth: '100%',
                border: 'none',
                boxShadow: 'none'
              }}
            > 
            <div>
              <label style={{ marginTop: '1em' }}>ชื่อผู้ใช้งาน</label>
              <div style={{ marginTop: '.5em' }}>
              <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกชื่อผู้ใช้งาน',
                      }]}
                  >
                <InputText
                  type="Text"
                  name="username"
                  value={user.username}
                  onChange={onChange}
                />
                </Form.Item>
              </div>
            </div>
            <div>
              <label style={{ marginTop: '1em' }}>รหัสผ่าน</label>
              <div style={{ marginTop: '.5em' }}>
                <Form.Item
                  {...formItemLayout}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'กรุณากรอกรหัสผ่าน',
                    },
                  ]}
                >
                  <InputText
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    style={{ width: '25em' }}
                  />
                </Form.Item>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: '4.5em' }}>
                <Button className="buy-button" type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={onSubmit}
                  icon='pi pi-sign-in'
                  label="Sign In"
                >
                </Button>
              </div>
            </div>
            <div>
              <hr style={{ marginTop: '2em' }}></hr>
            </div>
            <div style={{ marginTop: '2em' }}>
              <h4>ติดต่อสอบถาม</h4>
              <h5 style={{ marginTop: '.5em' }}>1. ข้อมูลแผนข้อมูลหน่วยงาน ติดต่อ : คุณนางศรินญา พงศ์สุริยา โทร.</h5><h5>2215</h5>
              <h5 style={{ marginTop: '.5em' }}>2. กรณีไม่พบข้อมูลบุคลากรหรือ Account หรือไม่สามารถใช้งานระบบ</h5><h5>ได้ติดต่อ : นางสาวกุณฑล กระบวนรัตน์ โทร. 2232</h5>
            </div>
            </Form>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;