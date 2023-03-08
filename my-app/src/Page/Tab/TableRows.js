import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'


function TableRows({rowsData, deleteTableRows, handleChange}) {


    return (
//onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" 
        rowsData.map((data, index) => {
            const {fullName, datestart, dateend} = data
            return (
                
                <tr key={index}>
                    <td><InputText type="text" value={fullName} onChange={(evnt) => (handleChange(index, evnt))}
                                   name="fullName" className="form-control" style={{marginTop: '3px'}}/>
                    </td>
                    <td><Calendar id="basic" placeholder="เลือกวันที่" value={datestart}
                                  onChange={(evnt) => (handleChange(index, evnt))} dateFormat="dd/mm/yy"  name="datestart" 
                                  className="form-control" style={{marginTop: '3px'}} style={{marginRight: '3px'}}/>
                    </td>
                    <td><Calendar id="basic" placeholder="เลือกวันที่" value={dateend}
                                  onChange={(evnt) => (handleChange(index, evnt))} dateFormat="dd/mm/yy"  name="dateend"
                                  className="form-control" style={{marginTop: '3px'}} style={{marginRight: '3px'}}/>
                    </td>
                    <td><Button className="p-button-danger" onClick={() => (deleteTableRows(index))}
                                style={{marginTop: '3px'}}>x</Button></td>
                </tr>

            )
        })

    )

}

export default TableRows
