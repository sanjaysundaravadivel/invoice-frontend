import React, { useState } from "react";

const Page1Component = (props) => {
  const [files, setFiles] = useState([]);
  let file = props.file;
  let setFile = props.setFile;
  function overrideEventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleDragAndDropFiles(event) {
    overrideEventDefaults(event);
    if (!event.dataTransfer) return;
    handleFiles(event.dataTransfer.files);
  }
  const handleFiles = (fileList) => {
    if (fileList) {
      let files = Array.from(fileList);
      setFiles(files);
      props.setFile(files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        props.setImg(reader.result.toString() || "")
      );
      reader.readAsDataURL(files[0]);
      props.setIndex(1);
      console.log(props.img);
    }
  };

  return (
    <>
      <fieldset>
        

        <form
          id="file-upload-form"
          class="uploader"
          onDrop={handleDragAndDropFiles}
          onDragEnter={overrideEventDefaults}
          onDragLeave={overrideEventDefaults}
          onDragOver={overrideEventDefaults}
        >
          <input
            id="file-upload"
            type="file"
            name="fileUpload"
            onChange={(e) => {
              if (e.target.files) {
                e.preventDefault();

                props.setFile(e.target.files[0]);
                props.setIndex(1);
                console.log(e.target.files);
                const reader = new FileReader();
                reader.addEventListener("load", () =>
                  props.setImg(reader.result.toString() || "")
                );
                reader.readAsDataURL(e.target.files[0]);
                console.log(props.img);
              }
            }}
          />
          <label for="file-upload" id="file-drag">
            <img id="file-image" src="#" alt="Preview" class="hidden" />
            <div id="start">
            <p class="lead">File format supported : pdf, jpg, png</p>
              <div style={{ color: "#000000", fontWeight: "600" }}>
                Select a file or drag here
              </div>
              <div id="notimage" class="hidden">
                Please select an image
              </div>
              <span id="file-upload-btn" class="btn btn-primary">
                Select a file
              </span>
            </div>
            <div id="response" class="hidden">
              <div id="messages"></div>
              <progress class="progress" id="file-progress" value="0">
                <span>0</span>%
              </progress>
            </div>
          </label>
        </form>
      </fieldset>
    </>
  );
};

export default Page1Component;
