import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


function Tabindic({rowsData, deleteTableRows, handleChange}) {


    return(
        
        rowsData.map((data, index)=>{
            const {indicname, count, goal}= data;
            return(

                <tr key={index}>
                <td><InputText type="text" placeholder="ตัวชี้วัดความสำเร็จ" value={indicname} onChange={(evnt)=>(handleChange(index, evnt))} name="indicname" className="form-control" style={{ marginTop: "3px" }}/>
                </td>
                <td><InputText type="text" placeholder="หน่วยนับ" value={count}  onChange={(evnt)=>(handleChange(index, evnt))} name="count" className="form-control" style={{ marginTop: "3px" }} style={{ marginRight: "3px" }} /> </td>
                <td><InputText type="text" placeholder="ค่าเป้าหมาย" value={goal}  onChange={(evnt)=>(handleChange(index, evnt))} name="goal" className="form-control" style={{ marginTop: "3px" }} style={{ marginRight: "3px" }}/> </td>
                <td><Button className="p-button-danger" onClick={()=>(deleteTableRows(index))} style={{ marginTop: "3px" }}>x</Button></td>
            </tr>

            )
        })
   
    )
    
}


export default Tabindic;



