import React, { useEffect, useState } from "react";
import img from "../img/original.png";
import { TestData3 } from "../data";
const Page3Component = (props) => {
  const [data, setData] = useState({
    address: ["", ""],

    date: ["", ""],
    invono: ["", ""],

    total: ["", ""],
  });
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (props.finalData) {
      setData(props.finalData);
    }
    console.log(props.finalData);
  }, [props.finalData]);
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
            if (str != "") {
              return (
                <p style={{ marginBottom: "0" }}>
                  {str} {index === myArray.length - 2 ? "" : ","}
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
      <fieldset>
        <div class="container" style={{ minHeight: "731px" }}>
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header ImgHead">
                  <p>file name here.pdf</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <img
                    class="card-img-top"
                    src={props.final}
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
            <div class="Tabcol col card" style={{ border: "none" }}>
              <p className="TabHead">
                Predicted L<span>ables</span>
              </p>
              <div className="card-body">
                <table class="Tab ">
                  <thead>
                    <th>Label</th>
                    <th>Text</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        Invoice No
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.invono[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="Add">
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
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
                            : data.address[0].substring(0, 6) + "  ...  "}

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
                            {add(data.address[0])}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        Date
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.date[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        Total
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.total[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="TabFooter">
                {" "}
                <button
                  className="Predictbtn"
                  style={{
                    marginRight: "40px",
                    background: "white",
                    padding: "0 20px",
                    color: "#f87115",
                  }}
                  onClick={(event) => {
                    event.preventDefault();

                    props.setIndex(1);
                  }}
                >
                  {" "}
                  <span> Back </span>
                </button>
                <button
                  className="Predictbtn"
                  onClick={(event) => {
                    event.preventDefault();

                    props.setIndex(0);
                  }}
                >
                  {" "}
                  <span> Review & Submit </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default Page3Component;
