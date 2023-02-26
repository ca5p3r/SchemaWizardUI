import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";

export default function ComparisonArea() {
  const [key, setKey] = useState("tableQuick");
  const quickTable = useSelector((state) => state.results.quickTableResults);
  const quickSchema = useSelector((state) => state.results.quickSchemaResults);
  const detailedTable = useSelector(
    (state) => state.results.detailedTableResults
  );
  const detailedSchema = useSelector(
    (state) => state.results.detailedSchemaResults
  );

  return (
    <Tabs
      id="comparisonTabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      justify
      className="mt-3"
    >
      <Tab eventKey="tableQuick" title="Table Quick">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Columns to be altered</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Column name</th>
                    <th>Type</th>
                    <th>Is nullable?</th>
                    <th>Maximum length</th>
                  </tr>
                </thead>
                <tbody>
                  {quickTable.Columns &&
                    quickTable.Columns["columns-to-be-altered"].map(
                      (column, key) => {
                        return (
                          <tr>
                            <td>{column.column_name}</td>
                            <td>{column.type}</td>
                            <td>{column.is_nullable}</td>
                            <td>{column.maximum_length}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Columns to be created</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Column name</th>
                    <th>Type</th>
                    <th>Is nullable?</th>
                    <th>Maximum length</th>
                  </tr>
                </thead>
                <tbody>
                  {quickTable.Columns &&
                    quickTable.Columns["columns-to-be-created"].map(
                      (column, key) => {
                        return (
                          <tr>
                            <td>{column.column_name}</td>
                            <td>{column.type}</td>
                            <td>{column.is_nullable}</td>
                            <td>{column.maximum_length}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Columns to be deleted</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Column name</th>
                    <th>Type</th>
                    <th>Is nullable?</th>
                    <th>Maximum length</th>
                  </tr>
                </thead>
                <tbody>
                  {quickTable.Columns &&
                    quickTable.Columns["columns-to-be-removed"].map(
                      (column, key) => {
                        return (
                          <tr>
                            <td>{column.column_name}</td>
                            <td>{column.type}</td>
                            <td>{column.is_nullable}</td>
                            <td>{column.maximum_length}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="tableDetailed" title="Table Detailed">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Columns</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>To be altered</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Column name</th>
                          <th>Type</th>
                          <th>Is nullable?</th>
                          <th>Maximum length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.Columns &&
                          detailedTable.Columns["columns-to-be-altered"].map(
                            (column, key) => {
                              return (
                                <tr>
                                  <td>{column.column_name}</td>
                                  <td>{column.type}</td>
                                  <td>{column.is_nullable}</td>
                                  <td>{column.maximum_length}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>To be deleted</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Column name</th>
                          <th>Type</th>
                          <th>Is nullable?</th>
                          <th>Maximum length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.Columns &&
                          detailedTable.Columns["columns-to-be-removed"].map(
                            (column, key) => {
                              return (
                                <tr>
                                  <td>{column.column_name}</td>
                                  <td>{column.type}</td>
                                  <td>{column.is_nullable}</td>
                                  <td>{column.maximum_length}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>To be created</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Column name</th>
                          <th>Type</th>
                          <th>Is nullable?</th>
                          <th>Maximum length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.Columns &&
                          detailedTable.Columns["columns-to-be-created"].map(
                            (column, key) => {
                              return (
                                <tr>
                                  <td>{column.column_name}</td>
                                  <td>{column.type}</td>
                                  <td>{column.is_nullable}</td>
                                  <td>{column.maximum_length}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Primary keys</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>To be altered</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>PK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.PKs &&
                          detailedTable.PKs["pks-to-be-altered"].map(
                            (pk, key) => {
                              return (
                                <tr>
                                  <td>{pk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>To be deleted</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>PK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.PKs &&
                          detailedTable.PKs["pks-to-be-removed"].map(
                            (pk, key) => {
                              return (
                                <tr>
                                  <td>{pk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>To be created</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>PK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.PKs &&
                          detailedTable.PKs["pks-to-be-created"].map(
                            (pk, key) => {
                              return (
                                <tr>
                                  <td>{pk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Foriegn keys</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>To be altered</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>FK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.FKs &&
                          detailedTable.FKs["fks-to-be-altered"].map(
                            (fk, key) => {
                              return (
                                <tr>
                                  <td>{fk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>To be deleted</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>FK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.FKs &&
                          detailedTable.FKs["fks-to-be-removed"].map(
                            (fk, key) => {
                              return (
                                <tr>
                                  <td>{fk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>To be created</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>FK name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.FKs &&
                          detailedTable.FKs["fks-to-be-created"].map(
                            (fk, key) => {
                              return (
                                <tr>
                                  <td>{fk}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Indexes</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>To be altered</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Index name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.IDXs &&
                          detailedTable.IDXs["idx-to-be-altered"].map(
                            (idx, key) => {
                              return (
                                <tr>
                                  <td>{idx}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>To be deleted</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Index name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.IDXs &&
                          detailedTable.IDXs["idx-to-be-removed"].map(
                            (idx, key) => {
                              return (
                                <tr>
                                  <td>{idx}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>To be created</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Index name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedTable.IDXs &&
                          detailedTable.IDXs["idx-to-be-created"].map(
                            (idx, key) => {
                              return (
                                <tr>
                                  <td>{idx}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="schemaQuick" title="Schema Quick">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tables to be created</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Table name</th>
                  </tr>
                </thead>
                <tbody>
                  {quickSchema["tables-to-be-created"] &&
                    quickSchema["tables-to-be-created"].map((table, key) => {
                      return (
                        <tr>
                          <td>{table}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tables to be removed</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Table name</th>
                  </tr>
                </thead>
                <tbody>
                  {quickSchema["tables-to-be-removed"] &&
                    quickSchema["tables-to-be-removed"].map((table, key) => {
                      return (
                        <tr>
                          <td>{table}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="schemaDetailed" title="Schema Detailed">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tables to be created</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Table name</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedSchema["tables-to-be-created"] &&
                    detailedSchema["tables-to-be-created"].map((table, key) => {
                      return (
                        <tr>
                          <td>{table}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tables to be removed</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Table name</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedSchema["tables-to-be-removed"] &&
                    detailedSchema["tables-to-be-removed"].map((table, key) => {
                      return (
                        <tr>
                          <td>{table}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Tables to be altered</Accordion.Header>
            <Accordion.Body>
              {detailedSchema["tables-to-be-altered"] &&
                detailedSchema["tables-to-be-altered"].map((table, key) => {
                  return (
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey={key}>
                        <Accordion.Header>
                          {Object.keys(table)[0]}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Columns</Accordion.Header>
                              <Accordion.Body>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      To be altered
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Column name</th>
                                            <th>Type</th>
                                            <th>Is nullable?</th>
                                            <th>Maximum length</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[
                                              Object.keys(table)[0]
                                            ].Columns[
                                              "columns-to-be-altered"
                                            ].map((column, key) => {
                                              return (
                                                <tr>
                                                  <td>{column.column_name}</td>
                                                  <td>{column.type}</td>
                                                  <td>{column.is_nullable}</td>
                                                  <td>
                                                    {column.maximum_length}
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                      To be deleted
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Column name</th>
                                            <th>Type</th>
                                            <th>Is nullable?</th>
                                            <th>Maximum length</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[
                                              Object.keys(table)[0]
                                            ].Columns[
                                              "columns-to-be-removed"
                                            ].map((column, key) => {
                                              return (
                                                <tr>
                                                  <td>{column.column_name}</td>
                                                  <td>{column.type}</td>
                                                  <td>{column.is_nullable}</td>
                                                  <td>
                                                    {column.maximum_length}
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                      To be created
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Column name</th>
                                            <th>Type</th>
                                            <th>Is nullable?</th>
                                            <th>Maximum length</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[
                                              Object.keys(table)[0]
                                            ].Columns[
                                              "columns-to-be-created"
                                            ].map((column, key) => {
                                              return (
                                                <tr>
                                                  <td>{column.column_name}</td>
                                                  <td>{column.type}</td>
                                                  <td>{column.is_nullable}</td>
                                                  <td>
                                                    {column.maximum_length}
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Primary keys</Accordion.Header>
                              <Accordion.Body>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      To be altered
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>PK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].PKs[
                                              "pks-to-be-altered"
                                            ].map((pk, key) => {
                                              return (
                                                <tr>
                                                  <td>{pk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                      To be deleted
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>PK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].PKs[
                                              "pks-to-be-removed"
                                            ].map((pk, key) => {
                                              return (
                                                <tr>
                                                  <td>{pk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                      To be created
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>PK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].PKs[
                                              "pks-to-be-created"
                                            ].map((pk, key) => {
                                              return (
                                                <tr>
                                                  <td>{pk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Foriegn keys</Accordion.Header>
                              <Accordion.Body>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      To be altered
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>FK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].FKs[
                                              "fks-to-be-altered"
                                            ].map((fk, key) => {
                                              return (
                                                <tr>
                                                  <td>{fk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                      To be deleted
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>FK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].FKs[
                                              "fks-to-be-removed"
                                            ].map((fk, key) => {
                                              return (
                                                <tr>
                                                  <td>{fk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                      To be created
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>FK name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].FKs[
                                              "fks-to-be-created"
                                            ].map((fk, key) => {
                                              return (
                                                <tr>
                                                  <td>{fk}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Indexes</Accordion.Header>
                              <Accordion.Body>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      To be altered
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Index name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].IDXs[
                                              "idx-to-be-altered"
                                            ].map((idx, key) => {
                                              return (
                                                <tr>
                                                  <td>{idx}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                      To be deleted
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Index name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].IDXs[
                                              "idx-to-be-removed"
                                            ].map((idx, key) => {
                                              return (
                                                <tr>
                                                  <td>{idx}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                      To be created
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <Table
                                        striped
                                        bordered
                                        hover
                                        size="sm"
                                        responsive
                                      >
                                        <thead>
                                          <tr>
                                            <th>Index name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table &&
                                            table[Object.keys(table)[0]].IDXs[
                                              "idx-to-be-created"
                                            ].map((idx, key) => {
                                              return (
                                                <tr>
                                                  <td>{idx}</td>
                                                </tr>
                                              );
                                            })}
                                        </tbody>
                                      </Table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab eventKey="SQL" title="Generated SQLs"></Tab>
    </Tabs>
  );
}
