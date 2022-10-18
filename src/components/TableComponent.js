import React, { useEffect, useState } from "react";
import {Table} from "../data"

const TableComponent = (props) => {
    const [tdata,setTdata]=  useState({headers:props.headers,values:props.values})
    const [edit,setEdit] = useState(-1)
    const [disable, setDisable] = useState(false);
    const [txt,setTxt]= useState('')
    let data=props.data;
    let setData = props.setData;
    
    const setBg = (index) => {
        return { background: "green" }
    }
  return (
    <table class="Tab ">
                          <thead>
                            {
                                tdata.headers.map((item)=>{
                                    return <th>{item}</th>
                                })
                            }
                            <th >
                              {" "}
                              <span className="Pen"><iconify-icon  icon="uil:pen"></iconify-icon>{" "}</span> 
                            </th>
                            
                          </thead>
                          <tbody>
                           
                             
                             
                                {
                                    tdata.values.map((it,index)=>{
                                        return <tr>
                                            {
                                                
                                                 it.map((dat)=>{
                                                    console.log(data)
                                                    return  <td> <input
                                                    style={{ border: "none" }}
                                                    className="typing-container"
                                                    value={dat}
                                                    onChange={(event) => {
                                                      let temp = data;
                                                      temp.values[index] = event.target.value;
                                                      setTxt(event.target.value);
                                                      setData(temp);
                                                      console.log(temp.invono[0]);
                                                    }}
                                                    readOnly={
                                                      edit === index && disable ? false : true
                                                    }
                                                  /> </td>
                                                })
                                            }
                                            <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setEdit(index);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === index && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                                        </tr>
                                       
                                    })
                                }
                              
                             
                              </tbody>
                              </table>
  )
}

export default TableComponent