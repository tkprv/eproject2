import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect , useRef} from 'react'
import { useHistory ,useLocation} from "react-router-dom";
import axios from "axios"
import { Card } from "primereact/card"
import { ConnectedOverlayScrollHandler } from 'primereact/utils';


const Goaldetail =()=>{
    const location = useLocation()
    const [newDatagoa ,setNewDatagoa] = useState()

    useEffect(() =>{
        getdatagoa()
    },[])
    async function getdatagoa(){
        await axios
        .get(`http://localhost:3001/plan/datast/${location.state.strategic_id}`,{})
        .then((res) => {
            setNewDatagoa(res.data)
            console.log("llll",res.data)

              
          })
            .catch((error) => {
              console.log(error)
            });
      };

      console.log("dd",newDatagoa)
      console.log("dd",location.state.strategic_id)

      
return(
        <div>
            <h2>แผนปฎิบัติการ</h2>
            {/* <h3>{newDatagoa.goal_name}</h3> */}
            <div className="card">
            <Card>
                <TableContainer component={Paper}>
           
                <Table>     
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                เป้าประสงค์
                            {/* <h3>{newDatagoa[0].goal_name}</h3> */}
                            </TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                            
                        </TableRow>
                        <TableRow>
                            <TableCell >เป้าประสงค์</TableCell>
                            <TableCell >ตัวชี้วัด</TableCell>
                            <TableCell >หน่วยนับ</TableCell>
                            <TableCell >ค่าเป้าหมาย</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    {newDatagoa.map((row,index)=>{
                        return(
                            <> 

                    <TableBody>
                    <TableRow key={index}>
                                     <TableCell align="left" style={{fontSize: '1em', width: '50%'}}>
                                        {row.goal_name}
                                    </TableCell>
                                    <TableCell align="left" style={{fontSize: '1em', width: '50%'}}>
                                        {row.indic_goal}
                                    </TableCell>
                                    <TableCell align="left" style={{fontSize: '1em', width: '50%'}}>
                                        {row.unit}
                                    </TableCell>
                                    <TableCell align="left" style={{fontSize: '1em', width: '50%'}}>
                                        {row.cost}
                                    </TableCell>      
                                    </TableRow>  
                                    <TableRow>
                                    <TableCell >กลยุทธ์</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell >{row.tactic_name}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    </TableRow>
                  
                                    </TableBody>
                            
                            </>
                           
                        )
                       
                    })}
                    </Table>
                    </TableContainer>
                    </Card>

                
        </div>
        </div>
    )
                    
      {/* <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
        
               
    
}
export default Goaldetail