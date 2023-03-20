import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "./toast/Toast";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios"
import "./sigin.css";
import { setLocalUser} from '../helper/utill'

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

function Signin() {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    username: String,
    email: String,
    scopes:"student"
    /*  currentUser: null,
    message: "", */
  });
  const [getuser, setGetuser] = useState();

  useEffect(() => {}, []);

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
        if(data){
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
        <div className="form-div">
          <form /* onSubmit={this.onSubmit} */>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <div>
              <label>username</label>
              <div>
                <InputText
                  type="Text"
                  name="username"
                  type="username"
                  value={user.username}
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <label>Password</label>
              <div>
                <InputText
                  type="Text"
                  name="password"
                  value={user.password}
                  onChange={onChange}
                />
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <Button className="buy-button" type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}} onClick={onSubmit}>
                  Login
                </Button>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;