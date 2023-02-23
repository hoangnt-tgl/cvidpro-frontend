import React from "react";
import TableAssess from "../../../customComponents/TableAssess/TableAssess";
import useGetTableAssessData from "../../../hooks/useGetTableAssessData";

const TableResume = () => {
  const { tableData } = useGetTableAssessData();
  return (
    <div className='table-resume'>
      {tableData.tableData?.length > 0 && (
        <TableAssess tableLayout={tableData} title='Danh sách ứng viên' />
      )}
    </div>
  );
};

export default TableResume;
