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
  const [listCandidate, setListCandidate] = useState([
    {
      confirm1: {
        confirmed: 1,
        confirmAt: "2023-02-19T03:56:47.819Z",
        confirmBy: "63c3e86ccb42d24cb46aaa20",
        note: "",
      },
      confirm2: {
        confirmed: 1,
        confirmAt: "2023-02-19T03:56:54.199Z",
        confirmBy: "63c3e86ccb42d24cb46aaa20",
        note: "",
      },
      jobCriteria: {
        province: "",
        district: "",
        industry: [],
        companyType: "",
        position: [],
        jobTitle: "Nhân viên vệ sinh công cộng",
        environment: [],
        major: "Nguội căn bản",
        status: true,
      },
      _id: "63f19640fb0fe3d827d46998",
      name: "Nguyễn Văn A",
      birthday: "2023-02-07T00:00:00.000Z",
      gender: "Nam",
      avatar: "https://static.thenounproject.com/png/5034901-200.png",
      province: "Trà Vinh",
      district: "Cầu Ngang",
      ward: "Hiệp Mỹ Tây",
      level: "Trung cấp",
      school: "Trường Trung cấp Mai Lĩnh Quảng Trị",
      startYear: "2014-01-01T00:00:00.000Z",
      endYear: "2017-01-01T00:00:00.000Z",
      major: "Văn hoá các dân tộc thiểu số Việt Nam",
      jobTitle: "IT",
      confirmPhone: true,
      confirmEmail: true,
      confirmIdentity: false,
      pointList: [],
      points: 0,
      skillLanguage: [],
      skillOther: [],
      workExperience: [
        {
          company: "Nuo",
          start: "2010-12-01T00:00:00.000Z",
          end: "2022-11-01T00:00:00.000Z",
          address: "11",
          leaving: "Nghỉ theo yêu cầu",
          process: [
            {
              jobTitle: "Nhân viên vệ sinh công cộng",
              from: "2010-12",
              to: "2022-11",
              isCurrent: false,
              major: "Nguội căn bản",
              address: "Dk",
              result: "Trên mức đề ra",
              workDescription: "OO",
            },
          ],
          isWorking: true,
          isCurrent: false,
          _id: "63f37c25a473a976dcd9661d",
        },
      ],
      skillEducation: [],
      shortTraining: [],
      createdAt: "2023-02-19T03:23:44.763Z",
      updatedAt: "2023-02-20T14:21:08.880Z",
      __v: 0,
      otp: null,
    },
  ]);
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
