import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable({ rows, columns, clickHandler }) {
  return (
    <div style={{ height: "80vh", minWidth: "800px" }}>
      <DataGrid
        onRowClick={clickHandler}
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
