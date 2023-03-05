import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { renderSingleColumnTable, renderTable, detailedTableView } from "./helpers";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, triggerToast } from "../actions";

export default function ComparisonArea() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.app.activeResultTab);
  const quickTable = useSelector((state) => state.results.quickTableResults);
  const quickSchema = useSelector((state) => state.results.quickSchemaResults);
  const detailedTable = useSelector((state) => state.results.detailedTableResults);
  const detailedSchema = useSelector((state) => state.results.detailedSchemaResults);
  const detailedChangesCount = useSelector((state) => state.results.detailedChangesCount);
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
            <Accordion.Header>Tables to be altered - Modifications count: {detailedChangesCount}</Accordion.Header>
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
