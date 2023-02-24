import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  triggerKeyAuth,
  triggerSSHTunnel,
  triggerTableCompare,
  triggerToast,
  addServer,
  triggerIsLoading,
} from "../actions";
import axios from "axios";
import { constants } from "../utils";

export default function ConnectionForm() {
  const backend_service = constants.backend_service;
  const [serverObject, setServerObject] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
  });
  const [serverReady, setServerReady] = useState(false);
  const dispatch = useDispatch();
  const enableSSH = useSelector((state) => state.app.enableSSH);
  const enableKeyAuth = useSelector((state) => state.app.enableKeyAuth);
  const serversList = useSelector((state) => state.server.serverList);
  const enableTableCompare = useSelector(
    (state) => state.app.enableTableCompare
  );
  const handleSSHToggle = () => {
    setServerReady();
    dispatch(triggerSSHTunnel(!enableSSH));
  };
  const handleKeyToggle = () => {
    setServerReady();
    dispatch(triggerKeyAuth(!enableKeyAuth));
  };
  const handleTableToggle = () => {
    dispatch(triggerTableCompare(!enableTableCompare));
  };
  const handleServerHostChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, host: e.target.value });
  };
  const handleServerPortChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, port: e.target.value });
  };
  const handleServerUserChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, username: e.target.value });
  };
  const handleServerPasswordChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, password: e.target.value });
  };
  const handleServerSSHHostChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, ssh_host: e.target.value });
  };
  const handleServerSSHPortChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, ssh_port: e.target.value });
  };
  const handleServerSSHUserChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, ssh_user: e.target.value });
  };
  const handleServerSSHPasswordChange = (e) => {
    setServerReady();
    setServerObject({ ...serverObject, ssh_password: e.target.value });
  };
  const handleServerSSHKeyChange = (e) => {
    setServerReady();
    const file = e.target.files[0];
    setServerObject({ ...serverObject, ssh_key: file });
  };
  const handleServerCheck = () => {
    dispatch(triggerIsLoading(true));
    const url = `${backend_service}/check_connection`;
    const data = new FormData();
    data.append("host", serverObject.host);
    data.append("port", serverObject.port);
    data.append("user", serverObject.username);
    data.append("passwd", serverObject.password);
    const config = {
      method: "post",
      url,
      data: data,
    };
    axios(config)
      .then((response) => {
        dispatch(
          triggerToast({
            title: "Success",
            message: response.data.message,
            visible: true,
          })
        );
        setServerReady(true);
        dispatch(triggerIsLoading());
      })
      .catch((error) => {
        dispatch(
          triggerToast({
            title: "Danger",
            message: error.response.data.message,
            visible: true,
          })
        );
        setServerReady();
        dispatch(triggerIsLoading());
      });
  };

  const handleAddServer = () => {
    dispatch(addServer(serverObject));
    dispatch(
      triggerToast({
        title: "Success",
        message: "Provided info is added to servers list!",
        visible: true,
      })
    );
  };
  return (
    <>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="serverLabel">
          <Form.Label>Server options: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableSSHTunnel">
          <Form.Check
            type="checkbox"
            label="Use SSH tunnel?"
            onChange={handleSSHToggle}
          />
        </Form.Group>
        <Button
          className="wizard-form"
          variant="outline-warning"
          onClick={handleServerCheck}
        >
          Test connection
        </Button>
        <Button
          className="wizard-form"
          variant="outline-success"
          onClick={handleAddServer}
          disabled={!serverReady}
        >
          Add to servers list
        </Button>
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="serverLabel">
          <Form.Label>Server details: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverHost">
          <Form.Control
            type="text"
            placeholder="Server host"
            onChange={handleServerHostChange}
          />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverPort">
          <Form.Control
            type="text"
            placeholder="Server port"
            onChange={handleServerPortChange}
          />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverUsername">
          <Form.Control
            type="text"
            placeholder="Server username"
            onChange={handleServerUserChange}
          />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverPassword">
          <Form.Control
            type="password"
            placeholder="Server password"
            onChange={handleServerPasswordChange}
          />
        </Form.Group>
      </Form>
      {enableSSH && (
        <Form className="d-flex">
          <Form.Group className="wizard-form" controlId="SSHLabel">
            <Form.Label>SSH connection</Form.Label>
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHHost">
            <Form.Control
              type="text"
              placeholder="SSH host"
              onChange={handleServerSSHHostChange}
            />
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHPort">
            <Form.Control
              type="text"
              placeholder="SSH port"
              onChange={handleServerSSHPortChange}
            />
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHUsername">
            <Form.Control
              type="text"
              placeholder="SSH username"
              onChange={handleServerSSHUserChange}
            />
          </Form.Group>
        </Form>
      )}
      {enableSSH && (
        <Form className="d-flex">
          <Form.Group className="wizard-form" controlId="SSHLabel">
            <Form.Label>SSH credentials</Form.Label>
          </Form.Group>
          <Form.Check
            className="wizard-form"
            type="switch"
            id="custom-switch"
            label="Enable to use key authentication"
            onChange={handleKeyToggle}
          />
          {enableKeyAuth && (
            <Form.Group controlId="SSHKeyFile" className="wizard-form">
              <Form.Control type="file" onChange={handleServerSSHKeyChange} />
            </Form.Group>
          )}
          {!enableKeyAuth && (
            <Form.Group className="wizard-form" controlId="SSHPassword">
              <Form.Control
                type="password"
                placeholder="SSH password"
                onChange={handleServerSSHPasswordChange}
              />
            </Form.Group>
          )}
        </Form>
      )}
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="sourceLabel">
          <Form.Label>Select source: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceServer">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select source server
            </option>
            {serversList.map((server, key) => {
              return (
                <option id={`option${server.host}`} key={key} value={server}>
                  {`${server.username}@${server.host}:${server.port}`}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceDatabase">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select database
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceSchema">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select Schema
            </option>
          </Form.Control>
        </Form.Group>

        {enableTableCompare && (
          <Form.Group className="wizard-form" controlId="sourceTable">
            <Form.Control as="select">
              <option id="selector" value="Selector">
                Select Table
              </option>
            </Form.Control>
          </Form.Group>
        )}
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="destinationLabel">
          <Form.Label>Select destination: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationServer">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select destination server
            </option>
            {serversList.map((server, key) => {
              return (
                <option id={`option${server.host}`} key={key} value={server}>
                  {`${server.username}@${server.host}:${server.port}`}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationDatabase">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select database
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationSchema">
          <Form.Control as="select">
            <option id="selector" value="Selector">
              Select Schema
            </option>
          </Form.Control>
        </Form.Group>
        {enableTableCompare && (
          <Form.Group className="wizard-form" controlId="destinationTable">
            <Form.Control as="select">
              <option id="selector" value="Selector">
                Select Table
              </option>
            </Form.Control>
          </Form.Group>
        )}
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="optionsLabel">
          <Form.Label>Options: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableTable">
          <Form.Check
            type="checkbox"
            label="Enable table comparison?"
            onChange={handleTableToggle}
          />
        </Form.Group>
        <Button
          className="wizard-form"
          variant="outline-info"
          type="submit"
          size="sm"
        >
          Compare
        </Button>
      </Form>
    </>
  );
}
