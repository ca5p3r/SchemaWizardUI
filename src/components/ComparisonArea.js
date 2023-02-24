import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function ComparisonArea() {
  const [key, setKey] = useState("tableQuick");

  return (
    <Tabs
      id="comparisonTabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      justify
      className="mt-3"
    >
      <Tab eventKey="tableQuick" title="Table Quick"></Tab>
      <Tab eventKey="tableDetailed" title="Table Detailed"></Tab>
      <Tab eventKey="schemaQuick" title="Schema Quick"></Tab>
      <Tab eventKey="schemaDetailed" title="Schema Detailed"></Tab>
      <Tab eventKey="SQL" title="Generated SQLs"></Tab>
    </Tabs>
  );
}
