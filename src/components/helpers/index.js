import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { tableStructure } from "../../utils";

export function renderSingleColumnTable(table, header, identifier, modifier) {
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

export function renderTable(table, modifier) {
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

export function detailedTableView(table) {
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
