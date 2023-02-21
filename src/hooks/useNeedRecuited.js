import { useState, useEffect } from "react";
import React from "react";
import { getDepartmentByKey } from "../services/DepartmentApi";
import { createJob, getJobForDepartment } from "../services/JobApi";
import {
  getAllListMajor,
  getListEnvironment,
  getListIndustry,
  getListJobTitle,
  getListLevel,
  getListPosition,
  getListProvince,
  getListQuestion,
} from "../services/GetListService";

const useNeedRecuited = ({ search }) => {
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  key = localStorage.getItem("key");
  const objJob = {
    title: "",
    position: "",
    level: [],
    major: [],
    industry: "",
    location: "",
    workingEnvironment: "",
    experience: "",
    quantity: 0,
    salaryMin: 0,
    salaryMax: 0,
    description: "",
    question: [],
  };
  const initQuestion = {
    name: "",
    detail: [],
    point: 0,
  };
  const [reload, setReload] = useState(false);
  const [listJob, setListJob] = useState([]);
  const [department, setDepartment] = useState({});
  const [levelOptions, setLevelOptions] = useState([]);
  const [provinceOptions, setProvinceOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(initQuestion);
  const [childQuestion, setChildQuestion] = useState("");
  const [environmentOption, setEnvironmentOption] = useState([]);
  const [newJob, setNewJob] = useState(objJob);
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
            return res.data;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [reload, department]);
  useEffect(() => {
    getListLevel()
      .then((res) => res.data)
      .then((res) => {
        setLevelOptions(res.map((item) => ({ value: item, label: item })));
      });

    getListProvince()
      .then((res) => res.data)
      .then((res) => {
        setProvinceOption(
          res.map((item) => ({
            value: item,
            label: item,
          }))
        );
      });

    getListJobTitle()
      .then((res) => res.data)
      .then((res) => {
        setJobTitleOption(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });
    getListPosition()
      .then((res) => res.data)
      .then((res) => {
        setPositionOptions(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getListIndustry()
      .then((res) => res.data)
      .then((res) => {
        setIndustryOptions(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getAllListMajor()
      .then((res) => res.data)
      .then((res) => {
        setMajorOptions(
          res.map((item) => ({
            value: item,
            label: item,
          }))
        );
      });

    getListEnvironment()
      .then((res) => res.data)
      .then((res) => {
        setEnvironmentOption(
          res.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      });

    getListQuestion()
      .then((res) => res.data)
      .then((res) => {
        setQuestionOptions(res);
        setNewJob({ ...newJob, question: res });
      });
  }, []);
  const handleAddQuestion = async () => {
    let question = newQuestion;
    question.detail.push(childQuestion);
    setNewJob({ ...newJob, question: [...questionOptions, newQuestion] });
    setQuestionOptions([...questionOptions, newQuestion]);
    setChildQuestion("");
    setNewQuestion(initQuestion);
  };
  const deleteAddOnQuestion = (index) => {
    let question = questionOptions;
    question.splice(index, 1);
    let newQuestion = new Array(...question);
    setQuestionOptions(newQuestion);
  };
  return [
    listJob,
    department,
    levelOptions,
    provinceOptions,
    jobTitleOption,
    industryOptions,
    positionOptions,
    majorOptions,
    questionOptions,
    newQuestion,
    childQuestion,
    environmentOption,
    handleAddQuestion,
    newJob,
    setNewJob,
    setQuestionOptions,
    setNewQuestion,
    setChildQuestion,
    setReload,
    deleteAddOnQuestion,
  ];
};

export default useNeedRecuited;
