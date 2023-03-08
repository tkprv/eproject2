import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Tabstra from "../Page/Tab/Tabstra"
import axios from "axios";
import Tabindicator from "../Page/Tab/Tabindicator"
import Tablegoal from "../Page/Tab/goal"
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';

export default function Editdatastg() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [goaldata, setGoaldata] = React.useState(null)
  const [goaldatadb, setGoaldatadb] = React.useState([])
  const [countdata, setCountdata] = React.useState(null)
  const [tactic, setTactic] = React.useState("");
  const [choice, setChoice] = React.useState()
  const [goaldetail, setGoaldetail] = React.useState(null)
  const [starg, setStarg] = React.useState(null)
  const [indicator, setIndicator] = React.useState(null)
  const [rowsData, setRowsData] = React.useState([]);
  const [inputValues1, setInputValues1] = React.useState([]);
  const [inputValuesb, setInputValuesb] = React.useState([]);
  const [oderid, setOderid] = React.useState([]);
  const [oderinddb, setOderinddb] = React.useState([])
  const [gdata, setGdata] = React.useState(null)
  const [newdatagoal, setNewdatagoal] = React.useState([])
  const [fetch, setFetch] = React.useState(false)
  let history = useHistory()
  const location = useLocation()
  const rowsInput = {
    fullName: null
  }
  const [menu, setMenu] = React.useState(false)
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }
  const rowsInput2 = {
    indicatorname: null,
    count: null,
    goal: null
  }


  useEffect(() => {
    getgoal()
  }, []);
  const getgoal = () => {
    axios
      .get("http://localhost:3001/stg/goal", {})
      .then((res) => {
        Oder(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const gettactic = (id) => {
    axios
      .get(`http://localhost:3001/stg/tactic/${id}`, {})
      .then((res) => {
        setTactic(res.data)
        console.log('res.data', res.data)

      })
      .catch((error) => {
        console.log(error)
      });
  };


  const Oder = (data) => {
    const setoder = data.filter((data) => data.strategic_id === location.state.strategic_id);
    setOderid(setoder);

  }

  const addgoal = () => {
    try {
      axios.post("http://localhost:3001/stg/creategoal", {
        strategic_id: location.state.strategic_id,
        order_goal: oderid.length + 1,
        goal_name: goaldata
      }).then((res) => {
        addindicgoal(res.data.insertId)
        addindicgoal2(res.data.insertId)

      })


    } catch (e) {
    }
  };




  const addindicgoal = (id) => {
    try {
      axios.post("http://localhost:3001/stg/createindicgoal", {
        goal_id: id,
        order_indic_goal: 1,
        indic_goal: indicator,
        unit: countdata,
        cost: goaldetail
      }).then((res) => {
        addtactic(id)

      })

      // setValue1('')
    } catch (e) {
      //handleError 
    }
  }


  const addindicgoal2 = (id) => {
    if (inputValues1.length !== 0 && inputValues1.indicatornames !== null) {
      for (const value of inputValues1) {
        const indicdata = value.inputValues1
        try {
          axios.post('http://localhost:3001/stg/createindicgoal', {
            goal_id: id,
            order_indic_goal: 1,
            indic_goal: value.indicatorname,
            unit: value.count,
            cost: value.goal
          })
          //console.log('eeee',indicdata)
        } catch (e) {
          //handle error
        }
      }
    }
  }
  const addtactic = (id) => {
    try {
      axios.post("http://localhost:3001/stg/createtactic", {
        goal_id: id,
        order_tactic: 1,
        tactic_name: starg
      })
      if (rowsData.length !== 0 && rowsData !== null) {
        for (const value of rowsData) {
          const tacdata = value.rowsData
          try {
            axios.post('http://localhost:3001/stg/createtactic', {
              goal_id: id,
              order_tactic: 1,
              tactic_name: value.fullName
            })

          } catch (e) {
            //handle error
          }
        }

      }


    } catch (e) {
      //handleError 
    }
    gettactic(id)
  }

  async function addAalldata() {
    await addgoal()
    setGoaldata('')
    setIndicator('')
    setCountdata('')
    setGoaldetail('')
    setStarg('')

    for (const index of rowsData) {
      console.log('index', index)
      deleteTableRows(index)
    }
    for (const index of inputValues1) {
      console.log('index', inputValues1)
      handleRemove(index)
    }
    // 
  }






  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Test = (label) => {
    setChoice(label);

  };

  ///stra-------

  const addTableRows = () => {


    setRowsData([...rowsData, rowsInput])

  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  }



  const handleChange2 = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...inputValues1];
    rowsInput[index][name] = value;
    setInputValues1(rowsInput);

  }
  const handleAdd = () => {
    setInputValues1([...inputValues1, rowsInput2])

  }

  const handleRemove = (index) => {
    const newInputValues = [...inputValues1];
    newInputValues.splice(index, 1);
    setInputValues1(newInputValues);
  };
  ////
  const handleChange3 = (index, event) => {
    const newInputValues2 = [...inputValuesb];
    newInputValues2[index] = event.target.value;
    setInputValuesb(newInputValues2);
  };

  const handleAdd1 = () => {
    setInputValuesb([...inputValuesb, '']);
  };

  const handleRemove3 = (index) => {
    const newInputValues2 = [...inputValuesb];
    newInputValues2.splice(index, 1);
    setInputValuesb(newInputValues2);
  };



  return (
    <>
     <Header onMenuClick={(value) => toggleMobileMenu()} />
    <Sidebar /> 
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
    <div className="page-wrapper">
    <h3>กำหนดสิทธิผู้ใช้งาน</h3>
    <Card>
     
        <h2>สร้างเป้าประสงค์ใหม่</h2>
        <div >
          <Card>
            <div className="fit">
              <div className="grid p-fluid">
                <div className="col-12 md:col-2">
                  <h3>เป้าประสงค์ :</h3>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    <InputText
                      value={goaldata}
                      onChange={(e) => setGoaldata(e.target.value)}
                      placeholder="เป้าประสงค์"
                    ></InputText>
                  </div>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    {/* <Muli/> */}
                    {/* <Button
                    type="button" onClick={handleAdd1}
                  /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="fit">
              <div className="grid p-fluid">
                <div className="col-12 md:col-2">
                  <h3>ตัวชี้วัด :</h3>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    <InputText
                      value={indicator}
                      onChange={(e) => setIndicator(e.target.value)}
                      placeholder="ตัวชี้วัด"
                    ></InputText>
                  </div>
                </div>
                <div className="col-12 md:col-1">
                  <div className="p-inputgroup">
                    <Button type="button" onClick={handleAdd} >+</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="fit">
              <div className="grid p-fluid">
                <div className="col-12 md:col-2">
                  <h3>หน่วยนับ :</h3>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    <InputText
                      value={countdata}
                      onChange={(e) => setCountdata(e.target.value)}
                      placeholder="หน่วยนับ"
                    ></InputText>
                  </div>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                  </div>
                </div>
              </div>
            </div>

            <div className="fit">
              <div className="grid p-fluid">
                <div className="col-12 md:col-2">
                  <h3>ค่าเป้าหมาย : </h3>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    <InputText
                      value={goaldetail}
                      onChange={(e) => setGoaldetail(e.target.value)}
                      placeholder="ค่าเป้าหมาย"
                    ></InputText>
                  </div>
                  <Tabindicator rowsData={inputValues1} deleteTableRows={handleRemove} handleChange={handleChange2} style={{ marginRight: "10px" }} />

                </div>
                <div className="col-12 md:col-5">
                </div>
              </div>
            </div>
            <div className="fit">
              <div className="grid p-fluid">
                <div className="col-12 md:col-2">
                  <h3>กลยุทธ์ :</h3>
                </div>

                <div className="col-12 md:col-5">
                  <div className="p-inputgroup">
                    <InputText
                      value={starg}
                      onChange={(e) => setStarg(e.target.value)}
                      placeholder="กลยุทธ์"
                    ></InputText>

                  </div>


                  <Tabstra rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                </div>
                <div className="col-12 md:col-1">
                  <div className="p-inputgroup">
                    <Button className="btn btn-outline-success" onClick={addTableRows} >+</Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div className="col-12 md:col-5"></div>
            <div className="col-12 md:col-5"></div>
            <div className="col-12 md:col-2" >
              <Button label="เพิ่ม" icon="pi pi-plus" className="p-button-success" onClick={addAalldata} />
            </div>

          </Card>

          <div style={{ marginTop: "3px" }} >
            < Tablegoal id={location.state.strategic_id} />
          </div>

        </div>
      
    </Card>
    </div>
    </div>
    </>
  )


}

