import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TaxRiseAPI from "../Api";

export default function ChatBox({ responses, currentStatus, assignmentId }) {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(currentStatus);

  async function sendResponse() {
    try {
      let apiResult = await TaxRiseAPI.editAssignment(assignmentId, {
        response,
      });
      console.log(
        "🚀 ~ file: ChatBox.js:19 ~ sendResponse ~ apiResult:",
        apiResult
      );
    } catch (error) {
      console.log("🚀 ~ file: ChatBox.js:22 ~ sendResponse ~ error:", error);
    }
  }

  async function updateStatus() {
    try {
      let apiResult = await TaxRiseAPI.editAssignment(assignmentId, {
        status,
      });
      console.log(
        "🚀 ~ file: ChatBox.js:19 ~ sendResponse ~ apiResult:",
        apiResult
      );
    } catch (error) {
      console.log("🚀 ~ file: ChatBox.js:22 ~ sendResponse ~ error:", error);
    }
  }
  return (
    <MDBRow className="d-flex justify-content-center">
      <MDBCol md="10" lg="8" xl="6">
        <MDBCard id="chat2" style={{ borderRadius: "10px" }}>
          <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
            <h5 className="mb-0">Responses</h5>
          </MDBCardHeader>

          <MDBCardBody>
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                  Hiii, I'm good.
                </p>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                  How are you doing?
                </p>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                  Long time no see! Tomorrow office. will be free on sunday.
                </p>
              </div>
              {/* <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                /> */}
              <i class="bi bi-person-circle"></i>
            </div>
          </MDBCardBody>
          <MDBCardFooter className="text-muted d-flex  align-items-center p-3">
            <Form.Control
              type="text"
              class="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Type response"
              onChange={(e) => setResponse(e.target.value)}
            />
            <Button variant="primary" onClick={sendResponse}>
              Send
            </Button>{" "}
            <i class="bi bi-paperclip" style={{ fontSize: "1.5rem" }}></i>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
