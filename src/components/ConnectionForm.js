import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerKeyAuth, triggerSSHTunnel, triggerTableCompare, triggerToast, addServer, triggerIsLoading, updateDetailedSchema, updateDetailedTable, updateQuickSchema, updateQuickTable } from "../actions";
import { constants, requester } from "../utils";

export default function ConnectionForm() {
  const backend_service = constants.backend_service;
  const [serverObject, setServerObject] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
  });
  const [srcServer, setSrcServer] = useState("");
  const [destServer, setDestServer] = useState("");
  const [srcDatabase, setSrcDatabase] = useState("");
  const [destDatabase, setDestDatabase] = useState("");
  const [srcSchema, setSrcSchema] = useState("");
  const [destSchema, setDestSchema] = useState("");
  const [srcTable, setSrcTable] = useState("");
  const [destTable, setDestTable] = useState("");
  const [serverReady, setServerReady] = useState(false);
  const [srcDatabases, setSrcDatabases] = useState([]);
  const [destDatabases, setDestDatabases] = useState([]);
  const [srcSchemas, setSrcSchemas] = useState([]);
  const [destSchemas, setDestSchemas] = useState([]);
  const [srcTables, setSrcTables] = useState([]);
  const [destTables, setDestTables] = useState([]);
  const [detailedCompare, setDetailedCompare] = useState(false);
  const [enableSQL, setEnableSQL] = useState(false);
  const dispatch = useDispatch();
  const enableSSH = useSelector((state) => state.app.enableSSH);
  const enableKeyAuth = useSelector((state) => state.app.enableKeyAuth);
  const serversList = useSelector((state) => state.server.serverList);
  const enableTableCompare = useSelector((state) => state.app.enableTableCompare);

  const handleSSHToggle = () => {
    setServerReady();
    setServerObject({ ...serverObject, use_tunnel: !enableSSH });
    dispatch(triggerSSHTunnel(!enableSSH));
  };

  const handleKeyToggle = () => {
    setServerReady();
    dispatch(triggerKeyAuth(!enableKeyAuth));
  };

  const handleTableToggle = () => {
    dispatch(triggerTableCompare(!enableTableCompare));
  };

  const handleSQLToggle = () => {
    setEnableSQL(!enableSQL);
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

  const handleCleanFields = () => {
    const hostField = document.getElementById("serverHost");
    const portField = document.getElementById("serverPort");
    const userField = document.getElementById("serverUsername");
    const passwordField = document.getElementById("serverPassword");
    const sshHostFiled = document.getElementById("SSHHost");
    const sshPortField = document.getElementById("SSHPort");
    const sshUserField = document.getElementById("SSHUsername");
    const sshKeyField = document.getElementById("SSHKeyFile");
    hostField.value = "";
    portField.value = "";
    userField.value = "";
    passwordField.value = "";
    if (enableSSH) {
      sshHostFiled.value = "";
      sshPortField.value = "";
      sshUserField.value = "";
      sshKeyField.value = null;
      handleSSHToggle();
      handleKeyToggle();
    }
  };

  const handleServerCheck = async () => {
    dispatch(triggerIsLoading(true));
    const url = `${backend_service}/check_connection`;
    try {
      const response = await requester(serverObject, url);
      dispatch(
        triggerToast({
          title: "Success",
          message: response.data.message,
          visible: true,
        })
      );
      setServerReady(true);
      dispatch(triggerIsLoading());
    } catch (error) {
      dispatch(
        triggerToast({
          title: "Danger",
          message: error.response.data.message,
          visible: true,
        })
      );
      setServerReady();
      dispatch(triggerIsLoading());
    }
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
    setServerReady();
    handleCleanFields();
  };

  const handleServerChanged = async (e) => {
    const targetID = e.target.id;
    const index = e.target.selectedIndex;
    const element = e.target.childNodes[index];
    const option = element.getAttribute("id");
    if (option !== "selector") {
      dispatch(triggerIsLoading(true));
      if (targetID === "sourceServer") {
        setSrcServer(option);
      } else {
        setDestServer(option);
      }
      const serverObj = serversList.filter((server) => server.serverID === option)[0];
      const url = `${backend_service}/list/databases`;
      try {
        const response = await requester(serverObj, url);
        if (targetID === "sourceServer") {
          setSrcDatabases(response.data.result);
        } else {
          setDestDatabases(response.data.result);
        }
        dispatch(
          triggerToast({
            title: "Success",
            message: response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      } catch (error) {
        dispatch(
          triggerToast({
            title: "Danger",
            message: error.response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      }
    } else {
      if (targetID === "sourceServer") {
        setSrcDatabases([]);
      } else {
        setDestDatabases([]);
      }
    }
  };

  const handleDBChanged = async (e) => {
    const targetID = e.target.id;
    const index = e.target.selectedIndex;
    const element = e.target.childNodes[index];
    const option = element.getAttribute("id");
    let serverObj = {};
    if (option !== "selector") {
      dispatch(triggerIsLoading(true));
      if (targetID === "sourceDatabase") {
        serverObj = serversList.filter((server) => server.serverID === srcServer)[0];
        setSrcDatabase(option);
      } else {
        serverObj = serversList.filter((server) => server.serverID === destServer)[0];
        setDestDatabase(option);
      }
      const url = `${backend_service}/list/schemas`;
      try {
        const response = await requester({ ...serverObj, dbname: option }, url);
        if (targetID === "sourceDatabase") {
          setSrcSchemas(response.data.result);
        } else {
          setDestSchemas(response.data.result);
        }
        dispatch(
          triggerToast({
            title: "Success",
            message: response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      } catch (error) {
        dispatch(
          triggerToast({
            title: "Danger",
            message: error.response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      }
    } else {
      if (targetID === "sourceDatabase") {
        setSrcSchemas([]);
      } else {
        setDestSchemas([]);
      }
    }
  };

  const handleSchemaChanged = async (e) => {
    const targetID = e.target.id;
    const index = e.target.selectedIndex;
    const element = e.target.childNodes[index];
    const option = element.getAttribute("id");
    let serverObj = {};
    let currentDB = "";
    if (option !== "selector") {
      dispatch(triggerIsLoading(true));
      if (targetID === "sourceSchema") {
        serverObj = serversList.filter((server) => server.serverID === srcServer)[0];
        currentDB = srcDatabase;
        setSrcSchema(option);
      } else {
        serverObj = serversList.filter((server) => server.serverID === destServer)[0];
        currentDB = destDatabase;
        setDestSchema(option);
      }
      const url = `${backend_service}/list/tables`;
      try {
        const response = await requester({ ...serverObj, dbname: currentDB, schema: option }, url);
        if (targetID === "sourceSchema") {
          setSrcTables(response.data.result);
        } else {
          setDestTables(response.data.result);
        }
        dispatch(
          triggerToast({
            title: "Success",
            message: response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      } catch (error) {
        dispatch(
          triggerToast({
            title: "Danger",
            message: error.response.data.message,
            visible: true,
          })
        );
        dispatch(triggerIsLoading());
      }
    } else {
      if (targetID === "sourceSchema") {
        setSrcTables([]);
      } else {
        setDestTables([]);
      }
    }
  };

  const handleTableChanged = (e) => {
    const targetID = e.target.id;
    const index = e.target.selectedIndex;
    const element = e.target.childNodes[index];
    const option = element.getAttribute("id");
    if (option !== "selector") {
      if (targetID === "sourceTable") {
        setSrcTable(option);
      } else {
        setDestTable(option);
      }
    } else {
      if (targetID === "sourceTable") {
        setSrcTable("");
      } else {
        setDestTable("");
      }
    }
  };

  const handleCompare = async () => {
    dispatch(triggerIsLoading(true));
    let url = "";
    let compare_mode = "quick";
    let compare_item = "schemas";
    if (detailedCompare) {
      compare_mode = "detailed";
    }
    if (enableTableCompare) {
      compare_item = "tables";
    }
    url = `${backend_service}/compare/${compare_mode}/${compare_item}`;
    let srcObj = serversList.filter((server) => server.serverID === srcServer)[0];
    let destObj = serversList.filter((server) => server.serverID === destServer)[0];
    let comparison_connection = {
      src: {
        ...srcObj,
        dbname: srcDatabase,
        schema: srcSchema,
        table: srcTable,
      },
      dest: {
        ...destObj,
        dbname: destDatabase,
        schema: destSchema,
        table: destTable,
      },
      generate_scripts: enableSQL,
    };
    try {
      const response = await requester(comparison_connection, url, true);
      if (detailedCompare) {
        if (enableTableCompare) {
          dispatch(updateDetailedTable(response.data.result));
        } else {
          dispatch(updateDetailedSchema(response.data.result));
        }
      } else {
        if (enableTableCompare) {
          dispatch(updateQuickTable(response.data.result));
        } else {
          dispatch(updateQuickSchema(response.data.result));
        }
      }
      dispatch(
        triggerToast({
          title: "Success",
          message: response.data.message,
          visible: true,
        })
      );
      dispatch(triggerIsLoading());
    } catch (error) {
      dispatch(
        triggerToast({
          title: "Danger",
          message: error.response.data.message,
          visible: true,
        })
      );
      dispatch(triggerIsLoading());
    }
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="serverLabel">
          <Form.Label>Server options: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableSSHTunnel">
          <Form.Check type="checkbox" label="Use SSH tunnel?" checked={enableSSH} onChange={handleSSHToggle} />
        </Form.Group>
        <Button className="wizard-form" variant="outline-warning" onClick={handleServerCheck}>
          Test connection
        </Button>
        <Button className="wizard-form" variant="outline-success" onClick={handleAddServer} disabled={!serverReady}>
          Add to servers list
        </Button>
        <Button className="wizard-form" variant="outline-danger" onClick={handleCleanFields}>
          Reset
        </Button>
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="serverLabel">
          <Form.Label>Server details: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverHost">
          <Form.Control type="text" placeholder="Server host" onChange={handleServerHostChange} />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverPort">
          <Form.Control type="text" placeholder="Server port" onChange={handleServerPortChange} />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverUsername">
          <Form.Control type="text" placeholder="Server username" onChange={handleServerUserChange} />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="serverPassword">
          <Form.Control type="password" placeholder="Server password" onChange={handleServerPasswordChange} />
        </Form.Group>
      </Form>
      {enableSSH && (
        <Form className="d-flex">
          <Form.Group className="wizard-form" controlId="SSHLabel">
            <Form.Label>SSH connection</Form.Label>
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHHost">
            <Form.Control type="text" placeholder="SSH host" onChange={handleServerSSHHostChange} />
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHPort">
            <Form.Control type="text" placeholder="SSH port" onChange={handleServerSSHPortChange} />
          </Form.Group>
          <Form.Group className="wizard-form" controlId="SSHUsername">
            <Form.Control type="text" placeholder="SSH username" onChange={handleServerSSHUserChange} />
          </Form.Group>
        </Form>
      )}
      {enableSSH && (
        <Form className="d-flex">
          <Form.Group className="wizard-form" controlId="SSHLabel">
            <Form.Label>SSH credentials</Form.Label>
          </Form.Group>
          <Form.Check className="wizard-form" type="switch" id="keyPasswordSwitch" label="Enable to use key authentication" onChange={handleKeyToggle} checked={enableKeyAuth} />
          {enableKeyAuth && (
            <Form.Group controlId="SSHKeyFile" className="wizard-form">
              <Form.Control type="file" onChange={handleServerSSHKeyChange} />
            </Form.Group>
          )}
          {!enableKeyAuth && (
            <Form.Group className="wizard-form" controlId="SSHPassword">
              <Form.Control type="password" placeholder="SSH password" onChange={handleServerSSHPasswordChange} />
            </Form.Group>
          )}
        </Form>
      )}
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="sourceLabel">
          <Form.Label>Select source: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceServer">
          <Form.Control as="select" onChange={handleServerChanged}>
            <option id="selector" value="Selector">
              Select source server
            </option>
            {serversList.map((server, key) => {
              return (
                <option id={server.serverID} key={key}>
                  {`${server.username}@${server.host}:${server.port}`}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceDatabase">
          <Form.Control as="select" onChange={handleDBChanged}>
            <option id="selector" value="Selector">
              Select database
            </option>
            {srcDatabases.map((database, key) => {
              return (
                <option id={database} key={key}>
                  {database}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="sourceSchema">
          <Form.Control as="select" onChange={handleSchemaChanged}>
            <option id="selector" value="Selector">
              Select Schema
            </option>
            {srcSchemas.map((schema, key) => {
              return (
                <option id={schema} key={key}>
                  {schema}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        {enableTableCompare && (
          <Form.Group className="wizard-form" controlId="sourceTable">
            <Form.Control as="select" onChange={handleTableChanged}>
              <option id="selector" value="Selector">
                Select Table
              </option>
              {srcTables.map((table, key) => {
                return (
                  <option id={table} key={key}>
                    {table}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        )}
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="destinationLabel">
          <Form.Label>Select destination: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationServer">
          <Form.Control as="select" onChange={handleServerChanged}>
            <option id="selector" value="Selector">
              Select destination server
            </option>
            {serversList.map((server, key) => {
              return (
                <option id={server.serverID} key={key}>
                  {`${server.username}@${server.host}:${server.port}`}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationDatabase">
          <Form.Control as="select" onChange={handleDBChanged}>
            <option id="selector" value="Selector">
              Select database
            </option>
            {destDatabases.map((database, key) => {
              return (
                <option id={database} key={key}>
                  {database}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="destinationSchema">
          <Form.Control as="select" onChange={handleSchemaChanged}>
            <option id="selector" value="Selector">
              Select Schema
            </option>
            {destSchemas.map((schema, key) => {
              return (
                <option id={schema} key={key}>
                  {schema}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        {enableTableCompare && (
          <Form.Group className="wizard-form" controlId="destinationTable">
            <Form.Control as="select" onChange={handleTableChanged}>
              <option id="selector" value="Selector">
                Select Table
              </option>
              {destTables.map((table, key) => {
                return (
                  <option id={table} key={key}>
                    {table}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        )}
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="optionsLabel">
          <Form.Label>Options: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableDetailedCompare">
          <Form.Check
            type="switch"
            label="Enable detailed comparison?"
            checked={detailedCompare}
            onChange={() => {
              setDetailedCompare(!detailedCompare);
            }}
          />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableTable">
          <Form.Check type="checkbox" label="Enable table comparison?" onChange={handleTableToggle} checked={enableTableCompare} />
        </Form.Group>
        <Form.Group className="wizard-form" controlId="enableScripts">
          <Form.Check type="checkbox" label="Enable SQL generation?" onChange={handleSQLToggle} checked={enableSQL} />
        </Form.Group>
        <Button className="wizard-form" variant="outline-info" onClick={handleCompare}>
          Compare
        </Button>
      </Form>
    </>
  );
}
