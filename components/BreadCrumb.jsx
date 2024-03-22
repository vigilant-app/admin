import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { HomeNav } from "../utility/svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { OverlayContext } from "./Layout";

export default function BreadCrumb({ tab, location }) {
  const router = useRouter();
  const [backdrop, setBackdrop] = useState(false);

  function MouseOver() {
    setBackdrop(true);
  }
  function MouseOut() {
    setBackdrop(false);
  }
  const { user } = OverlayContext();

  return (
    <>
      <section className="primary-bg breadCrumb">
        <div className="container">
          {/* <div
            className={backdrop ? 'backdrop d-block' : 'backdrop d-none'}
          ></div> */}

          <div className="row page-navigation align-items-center">
            <ul className="navbar-nav flex-row col">
              <li
                className={
                  tab == "home"
                    ? " nav-item home-nav-icon active"
                    : "nav-item home-nav-icon"
                }
              >
                <Link href={"/dashboard"}>{HomeNav}</Link>
              </li>
              <li className={tab == "users" ? "nav-item active" : "nav-item"}>
                <div className="parent">
                  <div>
                    <a>Users</a>

                    <div className="children">
                      <div className="backdrop" />
                      <ul className="">
                        <li>
                          <Link href={"/manage-users"}>Manage Users</Link>
                        </li>
                        {/* <li>
                          <Link href={''}>Logged-In Users</Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className={tab == "reports" ? "nav-item active" : "nav-item"}>
                <div className="parent">
                  <div>
                    <a>Incidents</a>
                    <div className="children">
                      <div className="backdrop" />
                      <ul className="transaction-list">
                        <li>
                          <Link href={"/incident-reports"}>
                            Incidents reports
                          </Link>
                        </li>
                        {/* <li>
                          <Link href={'/transaction-report-authorized'}>
                            Authorized Transaction reports
                          </Link>
                        </li>
                        <li>
                          <Link href={'/transaction-report-manual'}>
                            Manual Transaction reports
                          </Link>
                        </li>
                        <li>
                          <Link href={'/transaction-report-manual-authorized'}>
                            Authorized Manual Transaction reports
                          </Link>
                        </li>
                        <li>
                          <Link href={'/transaction-type'}>
                            Transaction types
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              {[11, 12, 13, 14].includes(user?.role_id) && (
                <>
                  <li
                    className={
                      tab == "adminMembers" ? "nav-item active" : "nav-item"
                    }
                    onMouseOver={() => MouseOver}
                    onMouseOut={MouseOut}
                  >
                    <div className="parent">
                      <div>
                        <a>Admin Users</a>
                        <div className="children">
                          <div className="backdrop" />
                          <ul className="">
                            <li>
                              <Link href={"/admin-members"}>Users</Link>
                            </li>
                            {/* <li>
                <Link href={'/banks'}>Banks</Link>
              </li> */}
                            <li>
                              <Link href={"/partners"}>Partners</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li
                    className={tab == "roles" ? "nav-item active" : "nav-item "}
                  >
                    <div className="parent">
                      <div>
                        <a>Roles</a>
                        <div className="children">
                          <div className="backdrop" />
                          <ul className="">
                            <li>
                              <Link href={"/roles"}>Roles</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              )}

              <li
                className={tab == "settings" ? "nav-item active" : "nav-item "}
              >
                <div className="parent">
                  <div>
                    <a>Settings</a>
                    <div className="children">
                      <div className="backdrop" />
                      <ul className="" style={{ maxWidth: "100%" }}>
                        <li style={{ maxWidth: "100%" }}>
                          <Link href={"/allBank"}>Banks</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              {[11, 12, 13, 14].includes(user?.role_id) && (
                <li
                  className={
                    tab == "configurations" ? "nav-item active" : "nav-item "
                  }
                >
                  <div className="parent">
                    <div>
                      <a>Configurations</a>
                      <div className="children last">
                        <div className="backdrop" />
                        <ul className="" style={{ maxWidth: "100%" }}>
                          <li style={{ maxWidth: "100%" }}>
                            <Link href={"/app-configuration"}>
                              App Configuration{" "}
                            </Link>
                          </li>
                          <li style={{ maxWidth: "100%" }}>
                            <Link href={"/admin-configuration"}>
                              Admin Configuration{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {location ? (
              location.map((el, index) => (
                <Breadcrumb.Item key={index}>
                  <a href={el.link}>{el.location}</a>
                </Breadcrumb.Item>
              ))
            ) : (
              <Breadcrumb.Item>
                <a href="">Dashboard</a>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </div>
      </section>
    </>
  );
}
