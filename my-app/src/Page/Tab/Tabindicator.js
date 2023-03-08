import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


function Tabindicator({ rowsData, deleteTableRows, handleChange }) {

    return (rowsData.map((data, index) => {

        const { indicatorname, count, goal } = data;
        return (

            <tr key={index}>
                <td><h4>ตัวชี้วัด : </h4>
                    <InputText type="text" value={indicatorname} onChange={(evnt) => (handleChange(index, evnt))} name="indicatorname" className="form-control" placeholder="ตัวชี้วัด" style={{ marginTop: "3px" }} ></InputText>
                    <InputText type="text" value={count} onChange={(evnt) => (handleChange(index, evnt))} name="count" className="form-control" placeholder="ตัวชี้วัด" style={{ marginTop: "15px" }} ></InputText>
                    <InputText type="text" value={goal} onChange={(evnt) => (handleChange(index, evnt))} name="goal" className="form-control" placeholder="ตัวชี้วัด" style={{ marginTop: "15px", marginBottom: '1em' }} ></InputText>

                </td>
                <td><Button className="p-button-danger" onClick={() => (deleteTableRows(index))} style={{ marginTop: "25px" }}>x</Button></td>
            </tr>
            //     <div  key={index}>
            //     <div className="fit">
            //     <div className="grid p-fluid">
            //       <div className="col-12 md:col-2">
            //         <h3>ตัวชี้วัด:</h3>
            //       </div>

            //       <div className="col-12 md:col-5">
            //       <div className="p-inputgroup">
            //       <InputText type="text" value={indicatorname} onChange={(evnt)=>(handleChange(index, evnt))} name="indicatorname" className="form-control"style={{ marginTop: "3px" }} ></InputText>
            //         </div>

            //       </div>
            //       <div className="col-12 md:col-1">
            //       {/* <Button type="button" onClick={handleAdd} >+</Button> */}
            //         <div className="p-inputgroup">
            //         </div>
            //       </div>
            //     </div>
            //   </div>

            //   <div className="fit">
            //     <div className="grid p-fluid">
            //       <div className="col-12 md:col-2">
            //         <h3>หน่วยนับ:</h3>
            //       </div>

            //       <div className="col-12 md:col-5">
            //         <div className="p-inputgroup">
            //           c
            //         </div>
            //       </div>

            //       <div className="col-12 md:col-5">
            //         <div className="p-inputgroup">
            //         </div>
            //       </div>
            //     </div>
            //   </div>

            //   <div className="fit">
            //     <div className="grid p-fluid">
            //       <div className="col-12 md:col-2">
            //         <h3>ค่าเป้าหมาย:</h3>
            //       </div>

            //       <div className="col-12 md:col-5">
            //         <div className="p-inputgroup">
            //           c
            //         </div>
            //         {/* <Tabindicator rowsData={inputValues1} deleteTableRows={handleRemove} handleChange={handleChange2} style={{ marginRight: "10px" }} /> */}

            //       </div>

            //       <div className="col-12 md:col-5">

            //       </div>
            //     </div>
            //   </div>

            //     </div>




        )
    })

    )

}

export default Tabindicator;