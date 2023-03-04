import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, triggerToast } from "../actions";
import { tableStructure } from "../utils";

function renderSingleColumnTable(table, header, identifier, modifier) {
  return (
    <Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th key={"singleColumnHead"}>{header}</th>
        </tr>
      </thead>
      <tbody>
        {identifier
          ? table[identifier] &&
            table[identifier][modifier].map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item}</td>
                </tr>
              );
            })
          : table[modifier] &&
            table[modifier].map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item}</td>
                </tr>
              );
            })}
      </tbody>
    </Table>
  );
}

function renderTable(table, modifier) {
  return (
    <Table striped bordered hover size="sm" responsive>
      <thead>
        <tr key={"head"}>
          {Object.values(tableStructure).map((value, key) => {
            return <th key={key}>{value}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {table.Columns &&
          table.Columns[modifier].map((column, key) => {
            return (
              <tr key={key}>
                <td>{column.column_name}</td>
                <td>{column.type}</td>
                <td>{column.is_nullable}</td>
                <td>{column.maximum_length}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

function detailedTableView(table) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Columns - Modifications count: {table.Columns ? table.Columns["columns-to-be-altered"].length + table.Columns["columns-to-be-created"].length + table.Columns["columns-to-be-removed"].length : 0}</Accordion.Header>
        <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>To be altered - Modifications count: {table.Columns ? table.Columns["columns-to-be-altered"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderTable(table, "columns-to-be-altered")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>To be deleted - Modifications count: {table.Columns ? table.Columns["columns-to-be-removed"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderTable(table, "columns-to-be-removed")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>To be created - Modifications count: {table.Columns ? table.Columns["columns-to-be-created"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderTable(table, "columns-to-be-created")}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Primary keys - Modifications count: {table.PKs ? table.PKs["pks-to-be-altered"].length + table.PKs["pks-to-be-created"].length + table.PKs["pks-to-be-removed"].length : 0}</Accordion.Header>
        <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>To be altered - Modifications count: {table.PKs ? table.PKs["pks-to-be-altered"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "PK name", "PKs", "pks-to-be-altered")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>To be deleted - Modifications count: {table.PKs ? table.PKs["pks-to-be-removed"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "PK name", "PKs", "pks-to-be-removed")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>To be created - Modifications count: {table.PKs ? table.PKs["pks-to-be-created"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "PK name", "PKs", "pks-to-be-created")}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Foriegn keys - Modifications count: {table.FKs ? table.FKs["fks-to-be-altered"].length + table.FKs["fks-to-be-created"].length + table.FKs["fks-to-be-removed"].length : 0}</Accordion.Header>
        <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>To be altered - Modifications count: {table.FKs ? table.FKs["fks-to-be-altered"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "FK name", "FKs", "fks-to-be-altered")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>To be deleted - Modifications count: {table.FKs ? table.FKs["fks-to-be-removed"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "FK name", "FKs", "fks-to-be-removed")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>To be created - Modifications count: {table.FKs ? table.FKs["fks-to-be-created"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "FK name", "FKs", "fks-to-be-created")}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Indexes - Modifications count: {table.IDXs ? table.IDXs["idx-to-be-altered"].length + table.IDXs["idx-to-be-created"].length + table.IDXs["idx-to-be-removed"].length : 0}</Accordion.Header>
        <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>To be altered - Modifications count: {table.IDXs ? table.IDXs["idx-to-be-altered"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "Index name", "IDXs", "idx-to-be-altered")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>To be deleted - Modifications count: {table.IDXs ? table.IDXs["idx-to-be-removed"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "Index name", "IDXs", "idx-to-be-removed")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>To be created - Modifications count: {table.IDXs ? table.IDXs["idx-to-be-created"].length : 0}</Accordion.Header>
              <Accordion.Body>{renderSingleColumnTable(table, "Index name", "IDXs", "idx-to-be-created")}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default function ComparisonArea() {
  const quickTable = useSelector((state) => state.results.quickTableResults);
  const quickSchema = useSelector((state) => state.results.quickSchemaResults);
  const detailedTable = useSelector((state) => state.results.detailedTableResults);
  const detailedSchema = useSelector((state) => state.results.detailedSchemaResults);
  const activeTab = useSelector((state) => state.app.activeResultTab);
  const dispatch = useDispatch();
  const tableView = detailedTableView(detailedTable);

  const handleCopy = () => {
    const sqlContainer = document.getElementById("SQLResults");
    sqlContainer.select();
    sqlContainer.setSelectionRange(0, 10);
    navigator.clipboard.writeText(sqlContainer.value);
    dispatch(
      triggerToast({
        title: "Success",
        message: "Contents were copied to clipboard",
        visible: true,
      })
    );
  };

  return (
    <Tabs id="comparisonTabs" activeKey={activeTab} onSelect={(k) => dispatch(setActiveTab(k))} justify className="mt-3">
      <Tab eventKey={0} title="Table Quick">
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Columns to be altered - Modifications count: {quickTable.Columns ? quickTable.Columns["columns-to-be-altered"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderTable(quickTable, "columns-to-be-altered")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Columns to be created - Modifications count: {quickTable.Columns ? quickTable.Columns["columns-to-be-created"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderTable(quickTable, "columns-to-be-created")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Columns to be deleted - Modifications count: {quickTable.Columns ? quickTable.Columns["columns-to-be-removed"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderTable(quickTable, "columns-to-be-removed")}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey={1} title="Table Detailed">
        {tableView}
      </Tab>
      <Tab eventKey={2} title="Schema Quick">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tables to be created - Modifications count: {quickSchema["tables-to-be-created"] ? quickSchema["tables-to-be-created"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderSingleColumnTable(quickSchema, "Table name", undefined, "tables-to-be-created")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tables to be removed - Modifications count: {quickSchema["tables-to-be-removed"] ? quickSchema["tables-to-be-removed"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderSingleColumnTable(quickSchema, "Table name", undefined, "tables-to-be-removed")}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey={3} title="Schema Detailed">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tables to be created - Modifications count: {detailedSchema ? detailedSchema["tables-to-be-created"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderSingleColumnTable(detailedSchema, "Table name", undefined, "tables-to-be-created")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tables to be removed - Modifications count: {detailedSchema ? detailedSchema["tables-to-be-removed"].length : 0}</Accordion.Header>
            <Accordion.Body>{renderSingleColumnTable(detailedSchema, "Table name", undefined, "tables-to-be-removed")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Tables to be altered - Modifications count: {detailedSchema ? detailedSchema["tables-to-be-altered"].length : 0}</Accordion.Header>
            <Accordion.Body>
              {detailedSchema["tables-to-be-altered"] &&
                detailedSchema["tables-to-be-altered"].map((table, key) => {
                  const items_count =
                    table[Object.keys(table)[0]].Columns["columns-to-be-altered"].length +
                    table[Object.keys(table)[0]].Columns["columns-to-be-created"].length +
                    table[Object.keys(table)[0]].Columns["columns-to-be-removed"].length +
                    table[Object.keys(table)[0]].PKs["pks-to-be-altered"].length +
                    table[Object.keys(table)[0]].PKs["pks-to-be-created"].length +
                    table[Object.keys(table)[0]].PKs["pks-to-be-removed"].length +
                    table[Object.keys(table)[0]].FKs["fks-to-be-altered"].length +
                    table[Object.keys(table)[0]].FKs["fks-to-be-created"].length +
                    table[Object.keys(table)[0]].FKs["fks-to-be-removed"].length +
                    table[Object.keys(table)[0]].IDXs["idx-to-be-altered"].length +
                    table[Object.keys(table)[0]].IDXs["idx-to-be-created"].length +
                    table[Object.keys(table)[0]].IDXs["idx-to-be-removed"].length;
                  return (
                    <Accordion>
                      <Accordion.Item eventKey={key}>
                        <Accordion.Header>{`${Object.keys(table)[0]} - Modifications count: ${items_count}`}</Accordion.Header>
                        <Accordion.Body>{detailedTableView(table[Object.keys(table)[0]])}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey={4} title="Generated SQLs">
        <Form>
          <Form.Group className="mb-3" controlId="SQLResults">
            <Form.Control as="textarea" rows={19} disabled />
          </Form.Group>
        </Form>
        <div className="d-grid gap-2">
          <Button variant="outline-success" size="lg" onClick={handleCopy}>
            Copy to clipboard
          </Button>
        </div>
      </Tab>
    </Tabs>
  );
}
