import React, { useEffect, useState } from "react";
import { TestData } from "../data";
import { TestData2 } from "../data";
import { TestData3 } from "../data";
import SpinnerComponent from "./SpinnerComponent";
import original from "../img/original.png";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png"; 
import ZoomComponent from "./ZoomComponent";
import TableComponent from "./TableComponent";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ImageCropper from "./ImageCropperComponent";
import RectangleComponent from "./RectangleComponent";
import { Link } from "react-router-dom";

const Page2Component = (props) => {
  let label = ["Invoice number", "Address", "Date", "Total","Category"];
  let label1 = ["invono", "address", "date", "total","Category"];
  const [crop, setCrop] = useState(null);
  const [rect, setRect] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [bill , setBill] = useState(false);
  const [prev, setPrev] = useState(null);
  const [predicted, setPredicted] = useState(true);
  const [imageFile,setImageFile] = useState(null)
  const [data, setData] = useState({
    address: ["", ""],

    date: ["", ""],
    invono: ["", ""],

    total: ["", ""],
    image: "",
    category:[
      "Retail",
      "NA"
    ],
    headers:[],
    values:[]
  });
  const [edit, setEdit] = useState(-1);
  const [extract, setExtract] = useState('');
  const [collapse, setCollapse] = useState(false);
  const [disable, setDisable] = useState(false);
  const [spin, setSpin] = useState(false);
  const [dat, setDat] = useState(1);
  const [txt, setTxt] = useState("");
  let img = props.img;
  let setImg = props.setImg;
  const [zoom, setZoom] = useState(false);
  let setCoordinates = props.setCoordinates;
  let coordinates = props.coordinates;

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [currh, setCurrh] = useState(0);
  const [currw, setCurrw] = useState(0);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const setBg = (index) => {
    if (index == 0) {
      return data.invono[0] != "" && data.invono[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 1) {
      return data.address[0] != "" && data.address[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 2) {
      return data.date[0] != "" && data.date[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 3) {
      return data.total[0] != "" && data.total[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    return { background: "green" };
  };

  const predictlabel = async (event) => {
    setSpin(true);
    console.log(props.file);
    event.preventDefault();
    console.log(img);
    const formData1 = new FormData();
    formData1.append("files[]", props.file);
    let res = { data: { image: "", } };
    try {
      res = await axios.post("https://invoice-api-digiverz.herokuapp.com/predict", formData1);
    } catch (error) {
      window.alert("Some thing went wrong please try again")
    }
    // const byteCharacters = atob(res.data.image);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);

    // let image = new Blob([byteArray], { type: "image/jpeg" });
    // let imageUrl = URL.createObjectURL(image);
    // res.data.image = byteCharacters;
    // var image = new Image();
    // image.src = `data:image/png;base64,${res.data.image}`;
    // res.data.image = image;------

    console.log("RES",res);
   
    setDat(dat + 1);
    console.log(dat);
    event.preventDefault();

    setImg(`data:image/png;base64,${res.data.image}`);
    //setImg(img1)

    setData(res.data);

    //setData(TestData3)

    setPredicted(false);
    setSpin(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleSubmit = async () => {
    setZoom(true);

    handleClose();
    setSpin(true);
    console.log("Helll", crop);
    var arr = crop.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
  let imageFile1= new File([u8arr], "cropped.png", {type:"image/png"});
  setImageFile(crop);

    var image = new Image();
    image.src = crop;
    //let im = URL.createObjectURL(crop);
    console.log("Imageee",imageFile1);
    const formData2 = new FormData();
    formData2.append("crop[]", imageFile1);
    formData2.append("label", label[edit]);
    // var reader = new FileReader();
    // reader.readAsDataURL(image); 
    // reader.onloadend = function() {
    //   var base64data = reader.result;                
    //   console.log("Base64",crop);
    // }
    console.log("BBBB")
    console.log( crop)
    let res = { data: "" };
     try {
      res = await axios.post("https://invoice-api-digiverz.herokuapp.com/crop", formData2); 
     } catch (error) {
      window.alert("Some thing went wrong please try again")
     }
     console.log("Cropped",res)
   
      const txt = res.data;
    //const txt = "26/09/2022"
    setExtract(txt)
    console.log(res.data);
    if (edit == 0) {
      let temp = data;
      temp.invono[0] = txt;
      temp.invono[1] = "0.99";
      setTxt(txt);
      setData(temp);
    }
    if (edit == 1) {
      let temp = data;
      temp.address[0] = txt;
      temp.address[1] = "0.99";
      setTxt(txt);
      setData(temp);
    }
    if (edit == 2) {
      let temp = data;
      temp.date[0] = txt;
      temp.date[1] = "0.99";
      setTxt(txt);
      setData(temp);
    }
    if (edit == 3) {
      let temp = data;
      setTxt(txt);
      temp.total[0] = txt;
      temp.total[1] = "0.99";
      setData(temp);
    }
   
    setRect(true)
    setPrev(img);
    setSpin(false);
  };
  const revert = () => setImg(prev);
  const handleClose = () => setShow(false);
  const add = (text) => {
    const myArray = text.split("\n");
    console.log(myArray);
    return (
      <>
        {myArray.map((str, index) => {
          if (index === 0) {
            return (
              <p style={{ marginBottom: "0" }}>
                {str}
                {","}
                <span
                  class="ColBtn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => setCollapse(!collapse)}
                >
                  <iconify-icon icon="akar-icons:arrow-up"></iconify-icon>
                </span>
              </p>
            );
          } else {
            if (str != "" && str!="\f") {
              return (
                <p style={{ marginBottom: "0" }}>
                  {str} {myArray[index+1] === '\f' ? "." : ","}
                </p>
              );
            }
            return <></>;
          }
        })}
      </>
    );
  };
  return (
    <>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <button className="Predictbtn" onClick={handleSubmit}>
              Extract Text
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageCropper
            img={img}
            setCoordinates={props.setCoordinates}
            setCrop={setCrop}
            currh={currh}
            currw={currw}
            setCurrh={setCurrh}
            setCurrw={setCurrw}
          /> 
          <img src={imageFile}></img>
        </Modal.Body>
      </Modal>
      {spin ? (
        <>
          <SpinnerComponent />
        </>
      ) : (
        <>
          <fieldset style={{ padding: "auto" }}>
            <div class="container" style={{ minHeight: "731px" }}>
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-header ImgHead">
                      <p>{props.name}</p>

                      <button
                        type="button"
                        class=""
                        onClick={() => {
                          props.setIndex(0);
                        }}
                      >
                        Change File
                      </button>
                    </div>
                    <div class="card-body">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {disable && edit!==4 ? (
                          <>
                            {" "}
                            <h5 class="card-title">
                              Select value for {label[edit]}
                            </h5>
                            <Button
                              className="SelectLabels"
                              onClick={() => handleShow("xxl-down")}
                            >
                              Select Text
                            </Button>
                           
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <br/>
                      {rect && (
                        <RectangleComponent
                          img={img}
                          coordinates={coordinates}
                          setImg={setImg}
                          setMyFinal={props.setMyFinal}
                          currh={currh}
                          currw={currw}
                          setCurrh={setCurrh}
                          setCurrw={setCurrw}
                          txt={label[edit]}
                          setRect={setRect}
                          revert={revert}
                          extract={extract}
                          label={label[edit]}
                          cancel={cancel}
                          setCancel={setCancel}
                        />
                      ) 
}
                      {
                        img && ( <img
                          class="card-img-top"
                          src={img}
                          alt="Card image cap"
                        />)
                      }
                    </div>
                    <div
                      class="card-footer text-muted"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      {" "}
                      <button className="Predictbtn" onClick={predictlabel}>
                        {" "}
                        <span> Predict Lables </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="Tabcol col card" style={{ border: "none" }}>
                  {predicted ? (
                    <div className="Empt">
                      <p>
                        Tap predict labels to extract the label and text ...!
                      </p>
                    </div>
                  ) : (
                    <>
                    <div style={bill ? {display:"none"} : {} }  >
                      <p className="TabHead">
                        Predicted L<span>ables</span>
                      </p>
                      <div className="card-body Table">
                        <table class="Tab ">
                          <thead>
                            <th class="headcol"> <span style={{backgroundolor: "white"}}>Label</span> </th>
                            <th>Text</th>
                            <th>Score</th>
                            <th >
                              {" "}
                              <span className="Pen"><iconify-icon  icon="uil:pen"></iconify-icon>{" "}</span> 
                            </th>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(0)}></span>
                                Invoice No
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.invono[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.invono[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.invono[0]);
                                  }}
                                  readOnly={
                                    edit === 0 && disable ? false : true
                                  }
                                />
                              </td>
                              <td>
                                {data.invono[1] == "" ? "---" : data.invono[1]}
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(0);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 0 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="Add headcol" >
                                <span class="dot" style={setBg(1)}></span>
                                Address
                              </td>
                              <td>
                                {" "}
                                <p
                                  style={
                                    collapse
                                      ? {
                                          display: "none",
                                        }
                                      : { marginBottom: "0" }
                                  }
                                >
                                  {data.address[0] == ""
                                    ? "---"
                                    : data.address[0].substring(0, 6) +
                                      "  ...  "}

                                  <span
                                    class="ColBtn"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                    onClick={() => setCollapse(!collapse)}
                                  >
                                    <iconify-icon icon="akar-icons:arrow-down"></iconify-icon>
                                  </span>
                                </p>
                                <div
                                  className={collapse ? "" : "collapse"}
                                  id="collapseExample"
                                >
                                  <div
                                    class="card card-body"
                                    style={{
                                      border: "none",
                                      padding: "0",
                                    }}
                                  >
                                    {edit === 1 && disable ? (
                                      <>
                                        {" "}
                                        <textarea
                                          style={{
                                            border: "none",
                                            minHeight: "100px",
                                          }}
                                          className="typing-container"
                                          value={data.address[0]}
                                          onChange={(event) => {
                                            let temp = data;
                                            temp.address[0] =
                                              event.target.value;
                                            setTxt(event.target.value);
                                            setData(temp);
                                            console.log(temp.address[0]);
                                          }}
                                        />
                                      </>
                                    ) : (
                                      add(data.address[0])
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>
                                {data.address[1] == ""
                                  ? "---"
                                  : data.address[1]}
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(1);
                                    setEdit(1);
                                    setDisable(!disable);
                                    console.log(edit, 1);
                                  }}
                                >
                                  {edit === 1 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(2)}></span>
                                Invoice  Date
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.date[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.date[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.date[0]);
                                  }}
                                  readOnly={
                                    edit === 2 && disable ? false : true
                                  }
                                />
                              </td>
                              <td>
                                {data.date[1] == "" ? "---" : data.date[1]}
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(2);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 2 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(3)}></span>
                                Total
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.total[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.total[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.total[0]);
                                  }}
                                  readOnly={
                                    edit === 3 && disable ? false : true
                                  }
                                />
                              </td>
                              <td>
                                {data.total[1] == "" ? "---" : data.total[1]}
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(3);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 3 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(3)}></span>
                                Category
                              </td>
                              <td>
                                {
                                  edit === 4 && disable ? <select
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.category[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.category[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.category[0]);
                                  }}
                                 
                                >
                                  <option>Select a Category</option>
                                  <option value="Retail">Retail</option>
                                  <option value="Food">Food</option>
                                  <option value="Electronics">Electronics</option>
                                </select> :  <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.category[0]}
                          readOnly={true}
                        />
                                }
                              
                               
                              </td>
                              <td>
                                {data.category[1] == "" ? "---" : data.category[1]}
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(4);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 4 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                              
                            </tr>
                            
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(3)}></span>
                              Bill 
                              </td>
                              <td>
                             
                            
                            </td>
                              <td>
                               
                              </td>
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(5);

                                    setBill(true)
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 5 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                              </tr>
                              
                          </tbody>
                        </table>
                        <table class="Tab " style={{marginTop:"0",marginLeft:"40px"}} >
                          <thead>
                            {
                                data.headers.map((item)=>{
                                    return <th style={{borderTop:"none"}}>{item}</th>
                                })
                            }
                           
                            
                          </thead>
                          <tbody>
                            {
                               data.values.map((it,index)=>{
                                return <tr>
                                 { it.map((dat,ind)=> {
                                  if(ind>data.headers.length-1){
                                    return ''
                                  }
                                  return  <td> {dat} </td>
                                 }
                                                   
                                                    
                               )}
                                </tr>
                               })
                            }
                            </tbody>
                            </table>
                      </div>
                      </div>
                      <div style={bill ? {} : {display:"none"}}>
                      <p className="TabHead">
                       Bill of M<span>aterials</span>
                      </p>
                      <button
                        className="Predictbtn"
                        onClick={(event) => {
                          event.preventDefault();
                          setBill(false)
                        }}
                      >
                        {" "}
                        <span> Save </span>
                      </button>
                      <div className="card-body Table" style={{overflowX : "scroll"}}>
                        <TableComponent headers={data.headers} values={data.values} data={data} setData={setData} />
                        </div>
                     
                      </div>
                     
                      <br />
                      <br />
                    </>
                  )}
                  <div className="TabFooter">
                    
                    {" "}
                    {predicted ? (
                      <></>
                    ) : (
                      <button
                        className="Predictbtn"
                        onClick={(event) => {
                          event.preventDefault();
                          props.setFinalData(data);
                          props.setIndex(2);
                        }}
                      >
                        {" "}
                        <span> Save Changes </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </>
      )}
    </>
  );
};

export default Page2Component;
