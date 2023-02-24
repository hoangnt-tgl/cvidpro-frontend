import React from "react";
import { useEffect } from "react";
import { getCandidateForDepartment } from "../services/DepartmentApi";

const useGetTableAssessData = () => {
  const [listApplyCadi, setListApplyCadi] = React.useState([]);
  let key = localStorage.getItem("key");
  async function getListApplyCandi() {
    setListApplyCadi(
      await getCandidateForDepartment(key, { sender: "employee" }).then(
        (res) => res.data
      )
    );
  }
  useEffect(() => {
    console.log(listApplyCadi);
  }, [listApplyCadi]);
  useEffect(() => {
    getListApplyCandi();
  }, []);
  return { listApplyCadi };
};

export default useGetTableAssessData;
