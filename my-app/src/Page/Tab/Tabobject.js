import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

function Tabobject({rowsData, deleteTableRows, handleChange}) {
    console.log('row',rowsData)
    return (
        rowsData.map((data, index) => {
            const {object} = data
            return (
                <tr key={index}>
                    <td><InputText type="text" value={object} onChange={(evnt) => (handleChange(index, evnt))}
                                   name="object" className="form-control" style={{marginTop: '3px'}}/>
                    </td>
                    <td><Button className="p-button-danger" onClick={() => (deleteTableRows(index))}
                                style={{marginTop: '3px'}}>x</Button></td>
                </tr>
            )
        })

    )

}

function TabobjectFirst({rowsData,deleteTableRows, handleChange}) {
    return (
        rowsData.map((data, index) => {
            const {object} = data
            // const {fullname} = data
            return (
                <tr key={index}>
                    <td><InputText type="text" value={object} onChange={(evnt) => (handleChange(index, evnt))}
                                   name="object" className="form-control" style={{marginTop: '3px'}}/>
                    </td>
                    {index !== 0 ?<td><Button className="p-button-danger" onClick={() => (deleteTableRows(index))}
                                 style={{marginTop: '3px'}}>x</Button></td>:null}
                </tr>
            )
        })

    )

}

export {Tabobject,TabobjectFirst}