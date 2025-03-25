import React, { useState } from "react";

const DepartmentHeadManagement = () => {
  const [departmentHeads, setDepartmentHeads] = useState([
    { id: 1, name: "Jane Smith" },
    { id: 2, name: "John Doe" },
  ]);

  const handleRemoveDepartmentHead = (id) => {
    setDepartmentHeads(departmentHeads.filter((head) => head.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department Head Management</h2>
      <ul>
        {departmentHeads.map((head) => (
          <li key={head.id}>
            {head.name}
            <button
              onClick={() => handleRemoveDepartmentHead(head.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentHeadManagement;
