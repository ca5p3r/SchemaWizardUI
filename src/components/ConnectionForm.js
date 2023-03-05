import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerKeyAuth, triggerSSHTunnel, triggerTableCompare, triggerToast, addServer, triggerIsLoading, updateDetailedSchema, updateDetailedTable, updateQuickSchema, updateQuickTable, setActiveTab } from "../actions";
import { constants, requester } from "../utils";
import { Select } from "antd";

export default function ConnectionForm() {
  const backend_service = constants.backend_service;
  const { Option } = Select;
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
  let activeTab = useSelector((state) => state.app.activeResultTab);

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
    setServerReady();
    setServerObject({
      host: "",
      port: "",
      username: "",
      password: "",
    });
    if (enableSSH) {
      sshHostFiled.value = "";
      sshPortField.value = "";
      sshUserField.value = "";
      sshKeyField.value = null;
      handleSSHToggle();
      handleKeyToggle();
    }
    dispatch(
      triggerToast({
        title: "Success",
        message: "Connection fields have been reset",
        visible: true,
      })
    );
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

  const handleServerChanged = async (_, option) => {
    dispatch(triggerIsLoading(true));
    if (option.type === "sourceServer") {
      setSrcServer(option.id);
    } else {
      setDestServer(option.id);
    }
    const serverObj = serversList.filter((server) => server.serverID === option.id)[0];
    const url = `${backend_service}/list/databases`;
    try {
      const response = await requester(serverObj, url);
      if (option.type === "sourceServer") {
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
  };

  const handleDBChanged = async (_, option) => {
    dispatch(triggerIsLoading(true));
    let serverObj;
    if (option.type === "sourceDatabase") {
      serverObj = serversList.filter((server) => server.serverID === srcServer)[0];
      setSrcDatabase(option.value);
    } else {
      serverObj = serversList.filter((server) => server.serverID === destServer)[0];
      setDestDatabase(option.value);
    }
    const url = `${backend_service}/list/schemas`;
    try {
      const response = await requester({ ...serverObj, dbname: option.value }, url);
      if (option.type === "sourceDatabase") {
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
  };

  const handleSchemaChanged = async (_, option) => {
    let serverObj = {};
    let currentDB = "";
    dispatch(triggerIsLoading(true));
    if (option.type === "sourceSchema") {
      serverObj = serversList.filter((server) => server.serverID === srcServer)[0];
      currentDB = srcDatabase;
      setSrcSchema(option.value);
    } else {
      serverObj = serversList.filter((server) => server.serverID === destServer)[0];
      currentDB = destDatabase;
      setDestSchema(option.value);
    }
    const url = `${backend_service}/list/tables`;
    try {
      const response = await requester({ ...serverObj, dbname: currentDB, schema: option.value }, url);
      if (option.type === "sourceSchema") {
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
  };

  const handleTableChanged = (_, option) => {
    if (option.type === "sourceTable") {
      setSrcTable(option.value);
    } else {
      setDestTable(option.value);
    }
  };

  const handleCompare = async () => {
    dispatch(triggerIsLoading(true));
    const sqlArea = document.getElementById("SQLResults");
    let possibleTabs = [];
    let exclude = [];
    let url = "";
    let sqlString = [];
    let compare_mode = "quick";
    let compare_item = "schemas";
    if (detailedCompare) {
      compare_mode = "detailed";
      possibleTabs = [1, 3];
    } else {
      possibleTabs = [0, 2];
    }
    if (enableTableCompare) {
      compare_item = "tables";
      exclude = [0, 1];
    } else {
      exclude = [2, 3];
    }
    activeTab = possibleTabs.filter((x) => exclude.includes(x));
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
          sqlArea.value = response.data.result.Columns.scripts ? response.data.result.Columns.scripts.replaceAll(";", ";\n") : "";
        } else {
          dispatch(updateDetailedSchema(response.data.result));
          for (let table in response.data.result["tables-to-be-altered"]) {
            let tableKey = Object.keys(response.data.result["tables-to-be-altered"][table]);
            let tableScripts = response.data.result["tables-to-be-altered"][table][tableKey].Columns.scripts;
            sqlString.push(tableScripts ? tableScripts : "");
          }
          sqlArea.value = sqlString.join("").replaceAll(";", ";\n");
        }
      } else {
        if (enableTableCompare) {
          dispatch(updateQuickTable(response.data.result));
          sqlArea.value = response.data.result.Columns.scripts ? response.data.result.Columns.scripts.replaceAll(";", ";\n") : "";
        } else {
          dispatch(updateQuickSchema(response.data.result));
          sqlArea.value = "";
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
    dispatch(setActiveTab(activeTab.toString()));
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
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select source server" onChange={handleServerChanged} style={{ width: 300 }}>
            {serversList.map((server, key) => {
              return (
                <Option value={`${server.username}@${server.host}:${server.port}`} type={"sourceServer"} id={server.serverID} key={key}>
                  {`${server.username}@${server.host}:${server.port}`}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select source database" onChange={handleDBChanged} style={{ width: 300 }}>
            {srcDatabases.map((database, key) => {
              return (
                <Option value={database} type="sourceDatabase" key={key}>
                  {database}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select source schema" onChange={handleSchemaChanged} style={{ width: 300 }}>
            {srcSchemas.map((schema, key) => {
              return (
                <Option value={schema} type="sourceSchema" key={key}>
                  {schema}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        {enableTableCompare && (
          <Form.Group className="wizard-form">
            <Select showSearch placeholder="Select source table" onChange={handleTableChanged} style={{ width: 300 }}>
              {srcTables.map((table, key) => {
                return (
                  <Option value={table} type="sourceTable" key={key}>
                    {table}
                  </Option>
                );
              })}
            </Select>
          </Form.Group>
        )}
      </Form>
      <Form className="d-flex">
        <Form.Group className="wizard-form" controlId="destinationLabel">
          <Form.Label>Select destination: </Form.Label>
        </Form.Group>
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select target server" onChange={handleServerChanged} style={{ width: 300 }}>
            {serversList.map((server, key) => {
              return (
                <Option value={`${server.username}@${server.host}:${server.port}`} type={"destinationServer"} id={server.serverID} key={key}>
                  {`${server.username}@${server.host}:${server.port}`}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select target database" onChange={handleDBChanged} style={{ width: 300 }}>
            {destDatabases.map((database, key) => {
              return (
                <Option value={database} type="destinationDatabase" key={key}>
                  {database}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group className="wizard-form">
          <Select showSearch placeholder="Select target schema" onChange={handleSchemaChanged} style={{ width: 300 }}>
            {destSchemas.map((schema, key) => {
              return (
                <Option value={schema} type="destinationSchema" key={key}>
                  {schema}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        {enableTableCompare && (
          <Form.Group className="wizard-form">
            <Select showSearch placeholder="Select target table" onChange={handleTableChanged} style={{ width: 300 }}>
              {destTables.map((table, key) => {
                return (
                  <Option value={table} type="destinationTable" key={key}>
                    {table}
                  </Option>
                );
              })}
            </Select>
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
