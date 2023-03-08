import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


function Tabstra({rowsData, deleteTableRows, handleChange}) {
    return(
        rowsData.map((data, index)=>{
            const {fullName}= data
            return(
                <div key={index}>
                <InputText type="text" value={fullName} onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control" placeholder="กลยุทธ์" style={{ marginTop: "15px" }}/>
                <Button className="p-button-danger" onClick={()=>(deleteTableRows(index))} style={{ marginTop: "10px", width: '3em' }}>x</Button>
                </div>
            )

        })
    )
    
}

export default Tabstra;