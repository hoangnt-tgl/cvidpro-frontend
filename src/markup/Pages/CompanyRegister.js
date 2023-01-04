import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import {
  getListCompanyType,
  getListIndustry,
} from "../../services/GetListService";
import { getInfoCompany } from "../../services/CompanyApi";

var bnr = require("./../../images/background/bg6.jpg");
function Register2(props) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [field, setField] = useState("");
  const [mainIndustry, setMainIndustry] = useState("");
  const [businessLicense, setBusinessLicense] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [original, setOriginal] = useState("");
  const [engName, setEngName] = useState("");
  const [sortName, setSortName] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);

  let errorsObj = {
    email: "",
    password: "",
    name: "",
    position: "",
    phone: "",
    companyType: "",
    field: "",
    companyName: "",
    address: "",
    taxCode: "",
    mainIndustry: "",
    businessLicense: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      let listCompanyType = (await getListCompanyType()).data;
      setCompanyTypeOptions(
        listCompanyType.map((item) => ({ value: item._id, label: item.name }))
      );
      let listField = (await getListIndustry()).data;
      setFieldOptions(
        listField.map((item) => ({ value: item._id, label: item.name }))
      );
    }
    fetchData();
  }, []);

  function uploadBusinessLicense(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setBusinessLicense(base64);
    };
  }
  function getCompanyInfo(e) {
    let value = e.target.value;
    console.log(value);
    getInfoCompany(value)
      .then((res) => {
        if (res) {
          console.log(res);
          setAddress(res.address);
          setTaxCode(res.taxCode);
          setCompanyName(res.name);
          setCompanyPhone(res.phone);
          setOriginal(res.original);
          setEngName(res.engName);
          setSortName(res.sortName);
        }
        setErrors({ ...errors, taxCode: undefined });
      })
      .catch((e) => {
        setTaxCode("");
        setErrors({ ...errors, taxCode: "Không tìm thấy công ty" });
      });
    console.log(e);
  }
  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Vui lòng nhập email";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Vui lòng nhập mật khẩu";
      error = true;
    }
    if (name === "") {
      errorObj.name = "Vui lòng nhập tên";
      error = true;
    }
    if (position === "") {
      errorObj.position = "Vui lòng nhập chức vụ";
      error = true;
    }
    if (phone === "") {
      errorObj.phone = "Vui lòng nhập số điện thoại";
      error = true;
    }
    if (companyType === "") {
      errorObj.companyType = "Vui lòng nhập loại hình công ty";
      error = true;
    }
    if (field === "") {
      errorObj.field = "Vui lòng nhập lĩnh vực hoạt động";
      error = true;
    }
    if (companyName === "") {
      errorObj.companyName = "Vui lòng nhập tên công ty";
      error = true;
    }
    if (address === "") {
      errorObj.address = "Vui lòng nhập địa chỉ";
      error = true;
    }
    if (taxCode === "") {
      errorObj.taxCode = "Vui lòng nhập mã số thuế";
      error = true;
    }
    if (mainIndustry === "") {
      errorObj.mainIndustry = "Vui lòng nhập ngành nghề chính";
      error = true;
    }
    if (businessLicense === "") {
      errorObj.businessLicense = "Vui lòng nhập giấy phép kinh doanh";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    let data = { email, password };
    dispatch(signupAction(data, props.history));
  }
  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{ backgroundImage: `url(${bnr})`, minHeight: "100vh" }}
        >
          <div className="row mx-0">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2">
                <div className="logo-header text-center p-tb30">
                  <Link to={"./"}>
                    <img src={require("./../../images/logo.png")} alt="" />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div id="login" className="tab-pane active ">
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form className=" dez-form p-b30" onSubmit={onSignUp}>
                      <h3 className="form-title m-t0">Nhà tuyển dụng</h3>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <p>Vui lòng cung cấp thông tin chính xác</p>
                      <div className="form-group">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Nhập họ và tên"
                        />
                        <div className="text-danger">
                          {errors.name && <div>{errors.name}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="form-control"
                          placeholder="Nhập chức vụ"
                        />
                        <div className="text-danger">
                          {errors.position && <div>{errors.position}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                        <div className="text-danger">
                          {errors.phone && <div>{errors.phone}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={email}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Nhập email"
                        />
                        <div className="text-danger">
                          {errors.email && <div>{errors.email}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          value={password}
                          className="form-control"
                          defaultValue="Password"
                          type="password"
                          placeholder="Nhập mật khẩu"
                          onChange={(e) => setPassword(e.target.value)}
                          minLength="6"
                        />
                        <div className="text-danger">
                          {errors.password && <div>{errors.password}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <Select
                          placeholder="Chọn loại hình công ty"
                          onChange={(e) => setCompanyType(e.label)}
                          options={companyTypeOptions}
                        />
                        <div className="text-danger">
                          {errors.companyType && (
                            <div>{errors.companyType}</div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <Select
                          isMulti
                          closeMenuOnSelect={false}
                          placeholder="Chọn lĩnh vực hoạt động"
                          onChange={(e) => setField(e.label)}
                          options={fieldOptions}
                        />
                        <div className="text-danger">
                          {errors.field && <div>{errors.field}</div>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          name={taxCode}
                          onBlur={(e) => getCompanyInfo(e)}
                          className="form-control"
                          placeholder="Nhập mã số thuế"
                        />
                        <div className="text-danger">
                          {errors.taxCode && <div>{errors.taxCode}</div>}
                        </div>
                      </div>
                      {taxCode && (
                        <>
                          <div className="form-group">
                            <input
                              value={companyName}
                              className="form-control"
                              onChange={()=>{}}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              value={address}
                              className="form-control"
                              onChange={()=>{}}
                            />
                          </div>
                        </>
                      )}
                      <div className="form-group">
                        <input
                          value={mainIndustry}
                          onChange={(e) => setMainIndustry(e.target.value)}
                          className="form-control"
                          placeholder="Nhập ngành nghề chính"
                        />
                        <div className="text-danger">
                          {errors.mainIndustry && (
                            <div>{errors.mainIndustry}</div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={uploadBusinessLicense}
                        />
                        <div className="text-danger">
                          {errors.businessLicense && (
                            <div>{errors.businessLicense}</div>
                          )}
                        </div>
                      </div>

                      <div className="form-group text-left">
                        <span className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="check1"
                            checked={isAgree}
                            onChange={(e) => setIsAgree(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="check1"
                          >
                            Tôi đồng ý với các điều khoản và điều kiện
                          </label>
                        </span>
                      </div>

                      <div className="form-group text-left">
                        <button
                          type="submit"
                          className="site-button dz-xs-flex m-r5"
                          disabled={!isAgree}
                        >
                          Đăng ký
                        </button>

                        <Link
                          data-toggle="tab"
                          to="#forgot-password"
                          className="forget-pass m-l5"
                        >
                          <i className="fa fa-unlock-alt"></i> Quên mật khẩu
                        </Link>
                      </div>
                      <div className="dz-social clearfix d-none">
                        <h5 className="form-title m-t5 pull-left">
                          Đăng ký với
                        </h5>
                        <ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
                          <li>
                            <Link
                              to={""}
                              className="fa fa-facebook  fb-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-twitter  tw-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-linkedin link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li>
                            <Link
                              to={""}
                              className="fa fa-google-plus  gplus-btn"
                              target="bank"
                            ></Link>
                          </li>
                        </ul>
                      </div>
                    </form>
                    <div className="text-center bottom">
                      <Link
                        to="login"
                        className="site-button button-md btn-block text-white"
                      >
                        <i className="fa fa-user"></i> Đăng nhập
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                  <div className="col-lg-12 text-center">
                    <span>
                      {" "}
                      © Copyright by{" "}
                      <i className="fa fa-heart m-lr5 text-red heart"></i>
                      <Link to={""}>CVIDPRO </Link> All rights reserved.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register2);
