import React, { useRef, useEffect, useState,useLayoutEffect } from "react";
import img1 from "../img/img1.png";
import img2 from "../img/original.png";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';


const RectangleComponent = (props) => {
  console.log("rect comp", props);
  const [modalShow, setModalShow] = useState(true);
  const canvas = useRef();
  const targetRef = useRef();
  let ctx = null;
  const[imgh,setImgh]=useState(0)
  const[imgw,setImgw]=useState(0)

  const [myImage, setMyImage] = useState(props.img);
  
  let final = props.final;
  let setMyFinal = props.setMyFinal;
  let currh = props.currh;
  let setCurrh = props.setCurrh;

  let currw = props.currw;
  let setCurrw = props.setCurrw;

  // initialize the canvas context
  useLayoutEffect(() => {
    if (targetRef.current) {
         console.log("Before",targetRef.current.offsetWidth,targetRef.current.offsetHeight)
        
      //  setCurrh(targetRef.current.offsetHeight)
      //  setCurrw(targetRef.current.offsetWidth)
      //  console.log(currh,currw)

    }
  }, []);
  useEffect(() => {
    console.log(props.img);
    // dynamically assign the width and height to canvas

    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
    const image = document.getElementById("myimg");
    image.style.height = currh;
    image.style.width = currw;
    console.log("After",image)

    console.log(currh, currw);
    //ctx.drawImage(image, 0, 0);

    const timer = setTimeout(() => {
      ctx.drawImage(image,0,0, currw, currh);

      const r1Info = props.coordinates;
      const r1Style = { borderColor: "red", borderWidth: 2 };
      drawRect(r1Info, r1Style);
      props.setImg(canvasEle.toDataURL("image/png"));
      setMyImage(canvasEle.toDataURL("image/png"));
      setMyFinal(canvasEle.toDataURL("image/png"));
    }, 1000);
  }, []);

  const drawRect = (info, style = {}) => {
    console.log(info);
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillText(props.txt, x, y-2 );
    setMyFinal(canvas.current.toDataURL("image/png"));
  };
  const canvasToImg = (_) => {
    let tagA = document.createElement("a");
    document.body.appendChild(tagA);
    tagA.href = canvas.current.toDataURL();
    tagA.download = "canvas-image.png";
    tagA.click();
    document.body.removeChild(tagA);
    //  myImage = canvas.toDataURL("image/png");
  };

  return (
   
      
       <Modal style={{width:"fit-content"}} show={modalShow} onHide={() => {setModalShow(false);props.setRect(false)}} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Successfully Extracted text for {props.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container style={{width:"fit-content !important"}}>
          <Row style={{paddingRight:"auto",paddingLeft:"auto"}}>
            <Col >
            <canvas ref={canvas} style={{ height: currh, width: currw }}>
        <img ref={targetRef} id="myimg" src={myImage} alt=".." />
      </canvas>
      
            </Col>
            <Col>
              Extracted text:
              {props.extract}
            </Col>
          </Row>

                  </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{props.setCancel(true);setModalShow(false);props.setRect(false)}}>Save changes</Button>
        <Button onClick={()=>{props.revert();setModalShow(false);props.setRect(false)}}>Discard changes</Button>
      </Modal.Footer>
     
    </Modal>
     
     
   
  );
};

export default RectangleComponent;
