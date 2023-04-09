import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Header2 from "../Layout/HeaderDepartment";
import Footer from "../Layout/Footer";
import { Form, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import CompanySidebar from "../Element/DepartmentSidebar";
import useLookingCandidates from "../../hooks/useLookingCandidates";
import FormSearch from "../../components/CompanyComponents/CompanyBrowseCandidates/FormSearch/FormSearch";
import CardCandidates from "../../components/CompanyComponents/CompanyBrowseCandidates/CardCandidates/CardCandidates.jsx";
const managerBlog = [
  {
    id: 1,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Alexander Weir",
  },
  {
    id: 2,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Jennifer Wood",
  },
  {
    id: 3,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "Melissa Hassib",
  },
];
function Companymanage(props) {
  let search = props.location.search;
  let params = new URLSearchParams(search);
  let key = params.get("key");
  if (key) {
    localStorage.setItem("key", key);
  }
  key = localStorage.getItem("key");
  const {
    listJob,
    listSchool,
    selectedParam,
    setSelectedParam,
    searchCandidates,
    listCandidate,
    currentJobLookingFor,
  } = useLookingCandidates(search);

  const [company, setCompany] = useState(false);
  const [contacts, setContacts] = useState(managerBlog);
  function handleSubmit(e) {
    e.preventDefault();
    searchCandidates();
  }
  return (
    <>
      <Header2 />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20'>
            <div className='container'>
              <div className='m-b30'>
                <div className='section-full'>
                  <div className='find-job-bx'>
                    <FormSearch
                      setSelectedParam={setSelectedParam}
                      handleSubmit={handleSubmit}
                      listJob={listJob}
                      listSchool={listSchool}
                    />
                  </div>
                </div>
                <div className='job-bx browse-job clearfix'>
                  <div className='job-bx-title  clearfix'>
                    <h5 className='font-weight-700 pull-left'>
                      Tìm thấy {listCandidate.length} ứng viên
                    </h5>
                  </div>

                  <ul className='post-job-bx browse-job-grid post-resume row'>
                    {listCandidate.map((item, index) => (
                      <CardCandidates
                        item={item}
                        key={index}
                        selectedParam={selectedParam}
                        currentJobLookingFor={currentJobLookingFor}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companymanage;
