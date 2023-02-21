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
                        {/* <th scope='col'>Country</th>
                        <th scope='col'>Browser</th>
                        <th scope='col'>Platform(s)</th>
                        <th scope='col'>Engine version</th> */}
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
                      {/* <tr>
                        <td>India</td>
                        <td>Chrome OS</td>
                        <td>MAC OS</td>
                        <td>76</td>
                      </tr>
                      <tr>
                        <td>USA</td>
                        <td>Internet Explorer</td>
                        <td>Win 2010</td>
                        <td>10</td>
                      </tr> */}
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
