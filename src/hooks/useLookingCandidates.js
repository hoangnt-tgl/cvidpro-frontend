import React, { useState, useEffect } from "react";
import { getDepartmentByKey } from "../services/DepartmentApi";
import { getListSchools } from "../services/GetListService";
import { getEmployeeForJob, getJobForDepartment } from "../services/JobApi";

const useLookingCandidates = ({ search }) => {
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  key = localStorage.getItem("key");
  const [listSchool, setListSchool] = useState([]);
  const [listJob, setListJob] = useState([]);
  const [department, setDepartment] = useState({});
  const [listCandidate, setListCandidate] = useState([]);
  const [selectedParam, setSelectedParam] = useState({
    schoolName: "",
    jobTitle: "",
  });

  //function
  async function searchCandidates() {
    try {
      let params = { schoolName: selectedParam.schoolName };
      const res = await getEmployeeForJob(selectedParam.jobTitle, params).then(
        (res) => {
          console.log(res);
          return res.data;
        }
      );
      setListCandidate(res);
    } catch (error) {
      console.log(error);
    }
  }

  //useEffect
  useEffect(() => {
    async function fetchData() {
      if (!key) return;
      setDepartment(
        await getDepartmentByKey(key).then((res) => {
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
            return res.data
              .filter((job) => job.confirm2.confirmed === 1)
              .map((job) => ({ value: job._id, label: job.title }));
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [department]);
  useEffect(() => {
    getListSchools()
      .then((res) => res.data)
      .then((res) => {
        setListSchool(
          res.map((item) => ({ value: item.name, label: item.name }))
        );
      });
  }, []);

  return {
    listJob,
    listSchool,
    selectedParam,
    setSelectedParam,
    searchCandidates,
    listCandidate,
  };
};

export default useLookingCandidates;
