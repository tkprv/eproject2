import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Tabdetailreport({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { detail } = data
            return (
                <div key={index}>
                    <h4>
                        <InputText type="text" value={detail} onChange={(evnt) => (handleChange(index, evnt))} name="detail" className="form-control" placeholder="รายละเอียดความก้าวหน้า" style={{ marginTop: "1em", width: '31em' }} />
                        <Button label="x" className="p-button-danger" onClick={() => (deleteTableRows(index))} style={{ width: '3em' }}></Button>
                    </h4>
                </div>
            )

        })
    )

}

export default Tabdetailreport;