import { useState, useEffect } from 'react';
import React from 'react';
import { getDepartmentByKey } from '../services/DepartmentApi';
import { createJob, getJobForDepartment } from '../services/JobApi';
import {
  getAllListMajor,
  getListEnvironment,
  getListIndustry,
  getListJobTitle,
  getListLevel,
  getListPosition,
  getListProvince,
  getListQuestion,
} from '../services/GetListService';

const useNeedRecuited = ({ search }) => {
  let params = new URLSearchParams(search);
  let key = params.get('key');
  if (key) {
    localStorage.setItem('key', key);
  }
  key = localStorage.getItem('key');
  const objJob = {
    title: '',
    position: '',
    level: [],
    major: [],
    industry: '',
    location: '',
    workingEnvironment: '',
    experience: '',
    quantity: null,
    salaryMin: null,
    salaryMax: null,
    description: '',
    question: [],
  };
  const initQuestion = {
    name: '',
    detail: [],
    point: '',
  };
  const [reload, setReload] = useState(false);
  const [listJob, setListJob] = useState(null);
  const [department, setDepartment] = useState({});
  const [levelOptions, setLevelOptions] = useState([]);
  const [provinceOptions, setProvinceOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [addOnQuestionOptions, setAddOnQuestionOptions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(initQuestion);
  const [childQuestion, setChildQuestion] = useState('');
  const [environmentOption, setEnvironmentOption] = useState([]);
  const [newJob, setNewJob] = useState(objJob);
  const [preloadValue, setPreloadValue] = useState([]);
  useEffect(() => {
    console.log(preloadValue);
  }, [preloadValue]);
  useEffect(() => {
    // console.log(key);
    async function fetchData() {
      if (!key) return;
      setDepartment(
        await getDepartmentByKey(key).then((res) => {
          // console.log(res);
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
            console.log(res.data);
            setPreloadValue(
              res.data.map((item) => ({
                position: [
                  {
                    value: item.position,
                    label: item.position,
                  },
                ],
                level: item.level.map((item) => ({ value: item, label: item })),
                industry: [
                  {
                    value: item.industry,
                    label: item.industry,
                  },
                ],
                location: [{ value: item.location, label: item.location }],
                environment: [
                  {
                    value: item.workingEnvironment,
                    label: item.workingEnvironment,
                  },
                ],
                major: item.major.map((item) => ({ value: item, label: item })),
                experience: item.experience,
                salaryMin: item.salaryMin,
                salaryMax: item.salaryMax,
                description: item.description,
                quantity: item.quantity,
                title: [{ value: item.title, label: item.title }],
                question0: item.questions[0],
                question1: item.questions[1],
                question2: item.questions[2],
                question3: item.questions[3],
                question4: item.questions[4],
                question5: item.questions[5],
                question6: item.questions[6],
                question7: item.questions[7],
                question8: item.questions[8],
                question9: item.questions[9],
                question10: item.questions[10],
                question11: item.questions[11],
                question12: item.questions[12],
                question13: item.questions[13],
                question14: item.questions[14],
              }))
            );
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
      });
  }, []);
  const handleAddQuestion = async () => {
    let question = newQuestion;
    question.detail.push(childQuestion);
    setAddOnQuestionOptions([...addOnQuestionOptions, question]);
    setChildQuestion('');
    setNewQuestion(initQuestion);
  };
  const deleteAddOnQuestion = (index) => {
    let question = addOnQuestionOptions;
    question.splice(index, 1);
    let newQuestion = new Array(...question);
    setAddOnQuestionOptions(newQuestion);
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
    addOnQuestionOptions,
    setAddOnQuestionOptions,
    preloadValue,
  ];
};

export default useNeedRecuited;
