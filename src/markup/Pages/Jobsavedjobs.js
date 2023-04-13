import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header2 from './../Layout/HeaderEmployee'
import Footer from './../Layout/Footer'
import SavedJobs from './../Element/SavedJobs'
import { Form, FormControl, Modal, Button } from 'react-bootstrap'
import Select from 'react-select'
import Profilesidebar from './../Element/Profilesidebar'
import { getMyResume, findJob } from '../../services/EmployeeApi'
import { displaySalary } from '../../services/DisplayService'
import {
  getListLevel,
  getListSchools,
  getAllListMajor,
  getListJobTitle,
  getListPosition,
  getListCompanyType,
  getListProvince,
  getListEnvironment,
  getListIndustry,
} from '../../services/GetListService'
import '../../css/jobsave.css'
import { createOrder } from '../../services/OrderApi'
import swal from 'sweetalert'
import loginbg from './../../images/bg6.jpg'
function Jobsavedjobs(props) {
  const [modalFindJob, setModalFindJob] = useState(false)
  const [resume, setResume] = useState('')
  const [reload, setReload] = useState(false)
  const [modalSelectJob, setModalSelectJob] = useState(false)
  const [jobId, setJobId] = useState('')

  const [position, setPosition] = useState(null)
  const [jobTitle, setJobTitle] = useState(null)
  const [companyType, setCompanyType] = useState(null)
  const [province, setProvince] = useState(null)
  const [environment, setEnvironment] = useState(null)
  const [industry, setIndustry] = useState(null)
  const [major, setMajor] = useState(null)

  // const [levelOption, setLevelOption] = useState([]);
  const [jobTitleOption, setJobTitleOption] = useState([])
  const [envrionmentOption, setEnvrionmentOption] = useState([])
  const [majorOption, setMajorOption] = useState([])
  const [positionOption, setPositionOption] = useState([])
  // const [schoolOption, setSchoolOption] = useState([]);
  const [provinceOption, setProvinceOption] = useState([])
  const [industryOption, setIndustryOption] = useState([])
  const [typeBusinessOption, setTypeBusinessOption] = useState([])
  const [listJob, setListJob] = useState([])

  const formatValue = (value) => {
    if (value) {
      return { label: value, value: value }
    }
    return null
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      let data = await getMyResume()
      setResume(data)
      if (data.jobCriteria.status) {
        findJob(data._id, data.jobCriteria).then((res) => {
          setListJob(res.data)
        })
      }

      setPosition(
        data.jobCriteria.position.map((item) => ({ label: item, value: item })),
      )
      setJobTitle(formatValue(data.jobCriteria.jobTitle))
      setEnvironment(
        data.jobCriteria.environment.map((item) => ({
          label: item,
          value: item,
        })),
      )
      setMajor(formatValue(data.jobCriteria.major))
      setCompanyType(formatValue(data.jobCriteria.companyType))
      setProvince(formatValue(data.jobCriteria.province))
      let listMajorOfResume = [data.major]
      data.workExperience.forEach((company) => {
        company.process.forEach((process) => {
          if (process.major && !listMajorOfResume.includes(process.major))
            listMajorOfResume.push(process.major)
        })
      })
      setMajorOption(
        listMajorOfResume.map((item) => ({
          value: item,
          label: item,
        })),
      )
    }

    fetchData()
  }, [reload])

  const handleSelectJob = (id) => {
    swal({
      title: 'Xác nhận ứng tuyển',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await createOrder({
          jobId: id,
          employeeId: resume._id,
        })
        swal('Xác nhận thành công!', {
          icon: 'success',
        })
        props.history.push('/jobs-applied-job')
      } else {
        swal('Xác nhận không thành công!')
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      getListPosition().then((res) => {
        setPositionOption(
          res.data.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        )
      })
      getListCompanyType().then((res) => {
        setTypeBusinessOption(
          res.data.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        )
      })
      getListProvince().then((res) => {
        setProvinceOption(
          res.data.map((item) => ({
            value: item,
            label: item,
          })),
        )
      })

      getListEnvironment().then((res) => {
        setEnvrionmentOption(
          res.data.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        )
      })

      getListIndustry().then((res) => {
        setIndustryOption(
          res.data.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        )
      })
      getListJobTitle().then((res) => {
        setJobTitleOption(
          res.data.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        )
      })
    }
    fetchData()
  }, [])

  const handleFindJob = async (e) => {
    e.preventDefault()
    let status = resume.jobCriteria.status
    setResume({
      ...resume,
      jobCriteria: { ...resume.jobCriteria, status: !status },
    })
    let data = {
      position: position ? position.map((item) => item.value) : undefined,
      jobTitle: jobTitle ? jobTitle.value : undefined,
      companyType: companyType ? companyType.value : undefined,
      province: province ? province.value : undefined,
      environment: environment
        ? environment.map((item) => item.value)
        : undefined,
      industry: industry ? industry.map((item) => item.value) : undefined,
      major: major ? major.value : undefined,
      status: !status,
    }
    let jobs = await findJob(resume._id, data)
    setListJob(jobs.data)
  }
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div
            className="section-full bg-white p-t50 p-b20"
            // style={{
            //   backgroundImage: 'url(' + loginbg + ')',
            //   backgroundSize: 'cover',
            // }}
          >
            <div className="container-1">
              <div className=" m-b30">
                {/* <div className="section-full">
                  <div className="find-job-bx">
                    <form className="dezPlaceAni">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chuyên nghành mong muốn"
                              value={major}
                              options={majorOption}
                              onChange={(e) => setMajor(e)}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chức danh mong muốn"
                              options={jobTitleOption}
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e)}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Chức vụ mong muốn"
                              options={positionOption}
                              onChange={(e) => setPosition(e)}
                              value={position}
                              isClearable={true}
                              isMulti={true}
                              closeMenuOnSelect={false}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Môi trường làm việc mong muốn"
                              options={envrionmentOption}
                              value={environment}
                              onChange={(e) => setEnvironment(e)}
                              isClearable={true}
                              isMulti={true}
                              closeMenuOnSelect={false}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Lĩnh vực mong muốn"
                              value={industry}
                              options={industryOption}
                              onChange={(e) => setIndustry(e)}
                              isClearable={true}
                              isMulti={true}
                              closeMenuOnSelect={false}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Loại hình đơn vị tuyển dụng"
                              options={typeBusinessOption}
                              value={companyType}
                              onChange={(e) => setCompanyType(e)}
                              isClearable={true}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <FormControl
                              as={Select}
                              custom
                              placeholder="Nơi làm việc mong muốn"
                              value={province}
                              options={provinceOption}
                              onChange={(e) => setProvince(e)}
                              isClearable={true}
                              isDisabled={resume.jobCriteria?.status}
                              className="job-pri"
                            ></FormControl>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <button
                            type="submit"
                            className="site-button btn-block"
                            style={{ zIndex: 'auto' }}
                            onClick={handleFindJob}
                          >
                            {resume.jobCriteria?.status
                              ? 'Dừng tìm'
                              : 'Tìm kiếm'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    {/* <div className="form-group">
                      <FormControl
                        as={Select}
                        custom
                        placeholder="Công việc"
                        value={major}
                        options={majorOption}
                        onChange={(e) => setMajor(e)}
                        isDisabled={resume.jobCriteria?.status}
                        className="job-pri"
                      ></FormControl>
                    </div> */}
                    <div className="form-group">
                      <FormControl
                        as={Select}
                        custom
                        placeholder="Chức vụ mong muốn"
                        options={positionOption}
                        onChange={(e) => setPosition(e)}
                        value={position}
                        isClearable={true}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isDisabled={resume.jobCriteria?.status}
                        className="job-pri"
                      ></FormControl>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-5 col-sm-12">
                    <div className="form-group">
                      <FormControl
                        as={Select}
                        custom
                        placeholder="Công ty"
                        options={envrionmentOption}
                        value={environment}
                        onChange={(e) => setEnvironment(e)}
                        isClearable={true}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isDisabled={resume.jobCriteria?.status}
                        className="job-pri"
                      ></FormControl>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-5 col-sm-12">
                    <div className="form-group">
                      <FormControl
                        as={Select}
                        custom
                        placeholder="Tất cả địa điểm"
                        value={province}
                        options={provinceOption}
                        onChange={(e) => setProvince(e)}
                        isClearable={true}
                        isDisabled={resume.jobCriteria?.status}
                        className="job-pri"
                      ></FormControl>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12">
                    <button
                      type="submit"
                      className="site-button btn-block"
                      style={{
                        zIndex: 'auto',
                        height: 38,
                        padding: 0,
                        lineHeight: '38px',
                        marginBottom: 20,
                      }}
                      onClick={handleFindJob}
                    >
                      {resume.jobCriteria?.status ? 'Dừng tìm' : 'Tìm kiếm'}
                    </button>
                  </div>
                </div>
                <div className="job-container">
                  <div className="filter">
                    <div className="filter-item">
                      <h6>Hình thức làm việc</h6>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Toàn thời gian</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Bán thời gian</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Thực tập sinh</label>
                      </div>
                    </div>
                    <div className="filter-item">
                      <h6>Kinh nghiệm làm việc</h6>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Chưa có kinh nghiệm</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>1 năm</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>2 năm</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>3 năm</label>
                      </div>
                    </div>
                    <div className="filter-item">
                      <h6>Cấp bậc</h6>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Nhân viên</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Trưởng phòng</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Phó giám đốc</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Giám đốc</label>
                      </div>
                    </div>
                    <div className="filter-item">
                      <h6>Mức lương</h6>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Dưới 10 triệu</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>10 - 20 triệu</label>
                      </div>
                      <div className="filter-item-checkbox">
                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        ></input>
                        <label>Trên 20 triệu</label>
                      </div>
                    </div>
                  </div>
                  <div className="job-bx clearfix job-primary listJob">
                    {/* <div className="job-bx-title clearfix "></div> */}
                    <h3>Danh sách việc làm</h3>
                    <ul className="post-job-bx browse-job-grid post-resume row">
                      {listJob.length === 0 && resume.jobCriteria?.status && (
                        <>
                          <div className="col-lg-12 col-md-12">
                            <div className="post-bx-1">
                              <div className="d-flex">
                                <div className="job-post-info">
                                  <h5 className="m-b0">
                                    <Link to={'/jobs-profile'}>
                                      Không có việc làm phù hợp
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {listJob.map((item, index) => (
                        <li className="col-lg-12" key={index}>
                          <div className="post-bx">
                            {/* <div className="d-flex m-b20"> */}
                            <div>
                              <div className="d-flex">
                                <div className="job-post-info">
                                  <h5 className="m-b0">
                                    <Link to={'/employee/job-detail/:09'}>
                                      {item.title}
                                    </Link>
                                  </h5>
                                  <p className="m-b5 font-13">
                                    <Link to={'#'} className="text-primary">
                                      {item.position}{' '}
                                    </Link>
                                  </p>
                                  <ul>
                                    <li>
                                      <i className="fa fa-map-marker"></i>
                                      {item.location}
                                    </li>
                                    <li>
                                      <i className="fa fa-money"></i>
                                      {displaySalary(
                                        item.minSalary,
                                        item.maxSalary,
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="job-time m-t15 m-b10">
                                {item.major.map((element, index) => (
                                  <>
                                    <Link to={'#'} className="mr-1">
                                      <span>{element}</span>
                                    </Link>
                                  </>
                                ))}
                              </div>
                            </div>

                            {/* <Link
                            to={'/files/pdf-sample.pdf'}
                            target="blank"
                            className="job-links"
                            style={{ top: '8px', right: '8px' }}
                          >
                            <i className="fa fa-download"></i>
                          </Link> */}
                            <Button
                              style={{ top: '80%', right: '8px' }}
                              onClick={() => {
                                handleSelectJob(item._id)
                              }}
                            >
                              Ứng tuyển
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobsavedjobs
