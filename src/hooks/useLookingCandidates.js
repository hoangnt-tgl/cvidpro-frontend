import React, { useState, useEffect } from "react";
import { getDepartmentByKey } from "../services/DepartmentApi";
import { getJobForDepartment } from "../services/JobApi";
const useLookingCandidates = ({ search }) => {
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  key = localStorage.getItem("key");
  const [listJob, setListJob] = useState([]);
  const [department, setDepartment] = useState({});
  useEffect(() => {
    console.log(key);
    async function fetchData() {
      if (!key) return;
      setDepartment(
        await getDepartmentByKey(key).then((res) => {
          console.log(res);
          return res.data;
        })
      );
    }
    fetchData();
  }, [key]);

  useEffect(() => {
    if (!department?._id) return;
    async function fetchData() {
      try {
        setListJob(
          await getJobForDepartment(department._id).then((res) => {
            return res.data.filter((job) => job.cofirm2.confirmed === 1);
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [department]);
  return <div>useLookingCandidates</div>;
};

export default useLookingCandidates;
