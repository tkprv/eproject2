import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown'
import axios from "axios";


function Tabhead({rowsData, deleteTableRows, handleChange}) {
    const [person, setPerson] = useState([])

  useEffect(() => {
    getheadproject()
  }, []);

  const getheadproject = () => {
    axios
      .get("http://localhost:3001/person", {})
      .then((res) => {
        setPerson(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                <Dropdown value={headname} onChange={(evnt) => handleChange(index, evnt)} options={person} optionLabel="fname"    name="headname"
                placeholder="Select " 
                placeholder="n"
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

export default Tabhead;




                

