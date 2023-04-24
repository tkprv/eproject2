import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Tabproblem({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { problem } = data
            return (
                <div key={index}>
                    <h4>
                    <InputText type="text" value={problem} onChange={(evnt) => (handleChange(index, evnt))} name="problem" className="form-control" placeholder="ปัญหา/อุปสรรค" style={{ marginTop: "1em", width: '31em' }} />
                    <Button className="p-button-danger" onClick={() => (deleteTableRows(index))} style={{ width: '3em' }}>x</Button>
                    </h4>
                </div>
            )

        })
    )

}

export default Tabproblem;