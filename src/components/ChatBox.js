// import { storage } from "firebase";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import TaxRiseAPI from "../Api";
import UserContext from "../UserContext";

// This was created from a template of an already created Chat Box UI:
// https://github.com/mdbootstrap/react-chat

export default function ChatBox({
  responses,
  currentStatus,
  assignmentId,
  updateAssignment,
}) {
  const usersCurrentStatus = currentStatus;
  const { loggedInUser, setAlert } = useContext(UserContext);

  const [response, setResponse] = useState("");
  const [allResponses, setAllResponses] = useState(responses);

  const [status, setStatus] = useState(currentStatus);
  const [fileURL, setFileURL] = useState(null);
  const [sendingResponse, setSendingResponse] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [file, setFile] = useState(null);

  // function handleFile(event) {
  //   setFile(event.target.files[0]);
  // }
  // async function uploadFile() {
  //   if (file == null) return;
  //   console.log("🚀 ~ file: ChatBox.js:85 ~ uploadFile ~ file", file);

  //   const fileRef = ref(storage, `${loggedInUser.username}/${uuid()}`);
  //   uploadBytes(fileRef, file).then(() => {
  //     alert("Image Uploaded");
  //   });
  //   try {
  //     setUploadingFile(true);
  //     let fileURL;

  //     let apiResult = await TaxRiseAPI.editAssignment(assignmentId, {
  //       uploadedFile: fileURL,
  //     });

  //     setUploadingFile(false);
  //   } catch (error) {
  //     setUploadingFile(false);

  //     console.log("🚀 ~ file: ChatBox.js:22 ~ sendResponse ~ error:", error);
  //   }
  // }

  async function editAssignment(field) {
    try {
      if (field === "response") {
        setSendingResponse(true);
        setResponse("");
        const apiResult = await TaxRiseAPI.editAssignment(assignmentId, {
          response,
        });


        setAllResponses(apiResult.responses);
        setSendingResponse(false);
      } else if (field === "status") {
        setUpdatingStatus(true);

        const apiResult = await TaxRiseAPI.editAssignment(assignmentId, {
          status,
        });

        setAlert({
          type: "success",
          message: "Your Task's Status was updated",
        });
        setStatus(apiResult.status);
        setUpdatingStatus(false);
        updateAssignment();
      }
    } catch (error) {
      setSendingResponse(false);
      setUpdatingStatus(false);

    }
  }


  return (
    <MDBCard id="chat2" className="chat-box">
      <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">Responses</h5>
      </MDBCardHeader>

      <MDBCardBody className="chat-box-body">
        <div className="d-flex flex-row justify-content-end mb-4 pt-1">
          <div>
            {allResponses.map((response) => {
              const key = uuid();
              return (
                <div
                  key={key}
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary chat-text">
                    {response}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {allResponses.length === 0 && (
          <div className="d-flex flex-row justify-content-center mb-4 ">
            No responses yet
          </div>
        )}
      </MDBCardBody>
      {loggedInUser.isClient && (
        <MDBCardFooter className="text-muted d-flex  align-items-center p-3">
          <Form.Control
            type="text"
            id="exampleFormControlInput1"
            placeholder="Type response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <Button
            variant="primary"
            type="button"
            className="chat-btn"
            disabled={sendingResponse || response.length < 1}
            onClick={!sendingResponse ? () => editAssignment("response") : null}
          >
            {sendingResponse ? "Sending..." : "Send"}
          </Button>
        </MDBCardFooter>
      )}
      {loggedInUser.isClient && (
        <MDBCardFooter className="text-muted d-flex  align-items-center p-3">
          <Form.Group className="d-flex flex-fill">
            <Form.Control disabled type="file" />
            {/* <input
              type="file"
              name="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            /> */}
            <Button
              variant="primary"
              type="button"
              className="chat-btn"
              disabled={true}
              // onClick={!uploadingFile ? uploadFile : null}
            >
              {uploadingFile ? "Uploading" : "Upload"}
            </Button>
          </Form.Group>
        </MDBCardFooter>
      )}
      {loggedInUser.isClient && (
        <MDBCardFooter className="text-muted d-flex  align-items-center p-3">
          <Form.Group className="d-flex justify-content-between flex-fill">
            <Form.Label className="fs-5 px-3">Status:</Form.Label>

            <Form.Select
              className="w-75 px-3"
              value={status}
              aria-label="Status:"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
            <Button
              variant="primary"
              type="button"
              className="chat-btn"
              disabled={updatingStatus}
              onClick={!updatingStatus ? () => editAssignment("status") : null}
            >
              {updatingStatus ? "Saving..." : "Save"}
            </Button>
          </Form.Group>
        </MDBCardFooter>
      )}
    </MDBCard>
  );
}
