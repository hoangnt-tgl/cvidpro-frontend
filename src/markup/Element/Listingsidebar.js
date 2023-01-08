import React from "react";
import { Link } from "react-scroll";

function Listingsidebar() {
  return (
    <div className="sticky-top bg-white">
      <div className="candidate-info onepage">
        <ul>
          <li>
            <Link
              activeClass="active"
              className="scroll-bar nav-link"
              to="resume_headline_bx"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <span>Kinh nghiệm làm việc</span>
            </Link>
          </li>

          <li>
            <Link
              activeClass="active"
              className="scroll-bar nav-link"
              to="education_bx"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <span>Quá trình học tập</span>
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="scroll-bar nav-link"
              to="it_skills_bx"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <span>Các khoá đào tạo ngắn hạn</span>
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="scroll-bar nav-link"
              to="accomplishments_bx"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <span>Khả năng ngoại ngữ và vi tính</span>
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              className="scroll-bar nav-link"
              to="desired_career_profile_bx"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <span>Kỹ năng khác</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Listingsidebar;
