import React, { useState, useEffect } from "react";
import AddIcon from "./Vectors/AddIcon";
import SettingsVector2 from "./Vectors/settings2";
import Link from "next/link";
import {
  Button,
  Input,
  Select,
  Space,
  Checkbox,
  Spin,
  Table,
  Modal,
  Form,
  Radio,
  DatePicker,
  Switch,
} from "antd";
import { SearchIcon, FilterIcon, DirLeft, DirRight } from "../utility/svg";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";

import { fetchAllBanks } from "../apis";

export default function AllBanks() {
  const { Search } = Input;
  const token = Cookies.get("token");
  const [sunmitLoading, setSunmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddMember, setModalAddMember] = useState(false);
  const [modalEditMember, setModalEditMember] = useState(false);
  const [value, setValue] = useState("all");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
  });
  console.log(data);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [filteredData, setFilteredData] = useState(data); // Add filteredData state

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);

    const filtered = slicedData.filter((item) => {
      return (
        (typeof item.email === "string" &&
          item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof item.username === "string" &&
          item.username.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  }, [currentPage, searchQuery]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  //Legacy Code base
  //const onSearch = value => console.log(value);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChangeCheck = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "all") {
      setPagination({ pageSize: 9999 });
    } else {
      setPagination({ pageSize: parseInt(value, 10) });
    }
  };

  const onSearch = (value) => {
    // Handle search button click or use this value for any specific action.
    // You can remove the console.log if not needed.
    console.log("Search query:", value);
    setSearchQuery(value); // Update searchQuery state with the entered query
  };

  // ...

  // Function to filter the data based on the search query
  const filterData = () => {
    const filtered = data.filter((item) => {
      return item.bank_name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankData = await fetchAllBanks(token);
        setData(bankData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    filterData();
  }, [token, searchQuery, data]);

  const columns = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
      render: (text) => <span className="max-content">{text}</span>,
    },
    {
      title: "Bank Code",
      dataIndex: "bank_code",
      key: "bank_code",
      render: (text) => <div className="max-content">{text}</div>,
    },
    {
      title: "Bank Logo",
      dataIndex: "bank_logo_url",
      key: "bank_logo_url",
      render: (text) => (
        <div>
          <Image src={text} alt="img" width={100} height={100} />
        </div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];


  const handleCreateBank = async () => {
    const apiUrl = "https://sea-turtle-app-7ta2e.ondigitalocean.app/api/identity/verify-account-name";
    
    // Obtain values from the form inputs
    const accountNumber = document.getElementById("accountNumberInput").value;
    const bankCode = document.getElementById("bankCodeInput").value;
    
    // Create the payload using the obtained values
    const payload = {
      bank_account: {
        account_number: accountNumber,
        bank_code: bankCode
      }
    };
  
    try {
      const response = await axios.post(apiUrl, payload);
      // Handle the response here (e.g., show a success message)
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("API Error:", error);
    }
  };
  
  

  return (
    <section>
      <div className="container">
        <div className="row _tabs-wrapper">
          <div className="col-auto">
            <h4 className="_tabs">Banks</h4>
          </div>
          <div className="col-auto d-flex gap-4">
            <Button
              icon={<AddIcon />}
              style={{ background: "#7D0003", color: "#fff" }}
              onClick={() => setModalAddMember(true)}
            >
              Add new Bank
            </Button>
          </div>
        </div>
      </div>

      <div className="container search-filter">
        <div className="row justify-content-between gap-3">
          <div className="col-md-auto d-flex flex-wrap gap-3 me-lg-5">
            <div className="the-search">
              <Search
                prefix={SearchIcon}
                placeholder="Search by name..."
                onSearch={onSearch}
                className="searching"
                onChange={(e) => setSearchQuery(e.target.value)} // Add this line
              />
            </div>
            {/* <div className="filter-btn-wrapper">
                            <Button icon={FilterIcon} onClick={() => setModalOpen(true)}>
                                Filter by:
                            </Button>
                        </div> */}
          </div>
          <div className="col-md-auto d-flex justify-content-end gap-lg-5 gap-4">
            <div className="d-flex gap-lg-4 gap-3 align-items-center flex-wrap">
              <p className="det">
                Page <span className="our-color">{currentPage}</span> of{" "}
                <span className="our-color">
                  {Math.ceil(data.length / itemsPerPage)}
                </span>
              </p>
              <div className="dir">
                <a href="#" onClick={goToPreviousPage}>
                  <span className="">{DirLeft}</span>
                </a>
                <a href="#" onClick={goToNextPage}>
                  <span className="">{DirRight}</span>
                </a>
              </div>
            </div>
            <div>
              <Space wrap>
                <Select
                  defaultValue="All per page"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "all",
                      label: "All per page",
                    },
                    {
                      value: "10",
                      label: "10 per page",
                    },
                    {
                      value: "100",
                      label: "100 per page",
                    },
                    {
                      value: "1000",
                      label: "1000 per page",
                    },
                  ]}
                />
              </Space>
            </div>
          </div>
          <div className="select-all">
            {/* <Checkbox onChange={onChange}>Select All</Checkbox> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="table-wrapper ">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={pagination}
          />
          <div className="our-pagination d-flex justify-content-center">
            <div className="d-flex gap-lg-4 gap-3 align-items-center flex-wrap">
              <p className="det">
                Page <span className="our-color">{currentPage}</span> of{" "}
                <span className="our-color">
                  {Math.ceil(data.length / itemsPerPage)}
                </span>
              </p>
              <div className="dir">
                <a href="#" onClick={goToPreviousPage}>
                  <span className="#">{DirLeft}</span>
                </a>
                <a href="#" onClick={goToNextPage}>
                  <span className="#">{DirRight}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered
        open={modalAddMember}
        onOk={() => setModalAddMember(false)}
        onCancel={() => setModalAddMember(false)}
        className="our-modal add-page-modal"
        footer={null}
      >
        <div className="headings text-center">
          <h4>Add New Bank</h4>
          <p>Fill the fields below to add Bank.</p>
        </div>
        <Form layout="vertical">
        
            <Form.Item
            name="Bank Name" 
            label="Bank Name" 
            className="heights"

            >
              <Input
                placeholder="Bank User"
                id="accountNumberInput" // Add this ID 
              />   

            </Form.Item>
    

            <Form.Item name="Bank Code" label="Bank Code" className="heights">
              <Input
                placeholder="Enter Bank Code"
                id="bankCodeInput" // Add this ID
              />
            </Form.Item>
          

          <div className="pt-lg-5 pt-4">
            <Button
              htmlType="submit"
              style={{ background: "#7D0003", color: "#FFF" }}
              onClick={handleCreateBank} // Add this event handler
              className={
                sunmitLoading
                  ? "our-btn-fade w-100 mt-4 mb-4"
                  : "w-100 mt-4 mb-4"
              }
              // loading={sunmitLoading}
              disabled={sunmitLoading}
            >
              {sunmitLoading ? (
                <Spin
                  className="white-spinner d-flex align-items-center justify-content-center"
                  style={{ color: "white" }}
                />
              ) : (
                <> Create Bank</>
              )}
            </Button>
          </div>

        </Form>
      </Modal>
    </section>
  );
}
