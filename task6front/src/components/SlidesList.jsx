import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PresentationsList({ presentations }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/presentation/${id}`);
  };

  return (
    <Table responsive className="table-borderless shadow-sm rounded bg-white">
      <thead>
        <tr>
          <th>#</th>
          <th>Preview</th>
          <th>Title</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {presentations.map((pres, index) => (
          <tr
            key={pres.id}
            onClick={() => handleRowClick(pres.id)}
            style={{ cursor: "pointer" }}
          >
            <td>{index + 1}</td>
            <td>
              <img
                src={pres.preview}
                alt="preview"
                style={{ width: "100px", height: "60px", objectFit: "cover" }}
              />
            </td>
            <td>{pres.title}</td>
            <td>{pres.author}</td>
            <td>{new Date(pres.created_at).toLocaleString()}</td>
            <td>{new Date(pres.updated_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
