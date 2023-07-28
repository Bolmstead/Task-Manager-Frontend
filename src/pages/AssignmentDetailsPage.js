import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import TaxRiseAPI from "../Api.js";
import UserContext from "../UserContext.js";
import ChatBox from "../components/ChatBox.js";
import TaskCard from "../components/TaskCard.js";
import { storage } from "../utils/firebase";

function AssignmentDetailsPage() {
  const { loggedInUser } = useContext(UserContext);
  const params = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loadingTask, setLoadingTask] = useState(true);
  const [fileURLs, setFileURLs] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);

  const [triggerAssignmentUpdate, setTriggerAssignmentUpdate] = useState(true);

  useEffect(() => {
    async function grabAssignmentDetails() {
      try {
        const apiResult = await TaxRiseAPI.getAssignmentDetails(params.id);
        setAssignment(apiResult);

        const { task, user, status, _id } = apiResult;
        if (loggedInUser.isClient && user.username !== loggedInUser.username) {
          return <Navigate to="/" replace={true} />;
        }

        setLoadingTask(false);
      } catch (err) {
        setLoadingTask(false);
      }
    }
    grabAssignmentDetails();
  }, [triggerAssignmentUpdate]);

  useEffect(() => {
    async function createFileUrlComponents() {
      try {
        if (!assignment) {
          return;
        }
        let currentAssignment = { ...assignment };
        const { user, _id } = currentAssignment;
        const fileListRef = ref(storage, `${user.username}/${_id}`);
        listAll(fileListRef).then((response) => {
          const tempFileUrls = [];
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              const fileObject = { url };
              tempFileUrls.push(fileObject);
              setFileURLs([...fileURLs, fileObject]);
            });
            setFilesLoaded(true);
          });
        });
      } catch (err) {
        setFilesLoaded(true);
      }
    }
    createFileUrlComponents();
  }, [assignment]);

  function updateAssignment() {
    setTriggerAssignmentUpdate(!triggerAssignmentUpdate);
  }

  if (loadingTask) {
    return (
      <Container>
        <Spinner></Spinner>
      </Container>
    );
  }
  return (
    <Container>
      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="tasks-page-title">
          <h1>Task Details</h1>
        </div>
        <TaskCard
          className="detailed-task-card"
          title={assignment.task.title}
          description={assignment.task.description}
          clientUsername={assignment.user.username}
          status={assignment.status}
        />
        <ChatBox
          responses={assignment.responses}
          currentStatus={assignment.status}
          assignmentId={assignment._id}
          updateAssignment={updateAssignment}
        />
        {fileURLs.length > 0 && (
          <div>
            <h3>{assignment.user.username}'s Files:</h3>
          </div>
        )}
        {fileURLs.map((obj, index) => {
          return (
            <Link
              className="file-link"
              target="_blank"
              rel="noopener noreferrer"
              to={obj.url}
              key={obj.url}
            >
              <i className="bi bi-file-earmark attachment-icon"></i>
              <span className="form-label"> File # {index + 1}</span>
            </Link>
          );
        })}
      </Stack>
    </Container>
  );
}

export default AssignmentDetailsPage;
