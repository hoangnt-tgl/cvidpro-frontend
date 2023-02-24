import React from "react";
import "./styles.css";
const TableAssess = ({ tableLayout, title }) => {
  return (
    <>
      <div className='tableAssess'>
        {" "}
        <div class='container'>
          <div class='row'>
            <div class='col-12'>
              <div class='card'>
                <div class='card-body text-center'>
                  <h5 class='card-title m-b-0'>{title}</h5>
                </div>
                <div class='table-responsive'>
                  <table class='table'>
                    <thead class='thead-light'>
                      <tr>
                        {tableLayout.tableTilte.map((item, index) => (
                          <th scope='col'>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody class='customtable'>
                      {tableLayout.tableData.map((item, index) => {
                        return (
                          <tr>
                            {item.map((item, index) => (
                              <td>{item}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableAssess;
