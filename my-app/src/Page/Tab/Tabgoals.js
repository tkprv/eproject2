import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown'
import axios from "axios";


function Tabgoal({rowsData, deleteTableRows, handleChange,id}) {
  const [goals, setGoals] = useState([])
  console.log("error",id);
  useEffect(() => {
    getGoals()
  }, []);

  const getGoals = () => {
    axios
      .get(`http://localhost:3001/goaal${id}`, {})
      .then((res) => {
        setGoals(res.data);
        console.log("error",res.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }
    return(
        rowsData.map((data, index)=>{
            const {headname}= data
            return(
                <div key={index}>
                  <div className="grid p-fluid">
              <div className="col-12 md:col-0">
              
              </div>

              <div className="col-12 md:col-11">
                <div className="p-inputgroup">
                <Dropdown value={headname} onChange={(evnt) => handleChange(index, evnt)} options={goals} optionLabel="goal_name"    name="headname"
                placeholder="Select " 
                placeholder="headname"
                style={{ marginTop: "10px" }}
                style={{ marginRight: "3px" }}
              />   
                </div>

              </div>
              <div className="col-12 md:col-1">
                <div className="p-inputgroup">
                <Button className="p-button-danger" onClick={()=>(deleteTableRows(index))} style={{ marginTop: "3px" }}>x</Button>
                </div>
              </div>
            </div>
                             
            </div>
            )

        })
    )
    
}

export default Tabgoal;




                

