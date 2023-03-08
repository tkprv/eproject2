import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


function Tabbenefit({rowsData, deleteTableRows, handleChange}) {


    return(
        
        rowsData.map((data, index)=>{
            const {benefit}= data;
            return(
               
                <tr key={index}>
                <td><InputText type="text" value={benefit} onChange={(evnt)=>(handleChange(index, evnt))} name="benefit" className="form-control" style={{ marginTop: "3px" }}/>
                </td>
                 <td><Button className="p-button-danger" onClick={()=>(deleteTableRows(index))} style={{ marginTop: "3px" }}>x</Button></td>
            </tr>
            )
        })
   
    )
    
}

export default Tabbenefit;