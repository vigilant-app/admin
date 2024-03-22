import {
  Button,
  Input,
  Select,
  Space,
  Checkbox,
  Table,
  Modal,
  Form,
  Radio,
  DatePicker,
} from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import ExportZone from './ExportZone';
import {
  SearchIcon,
  FilterIcon,
  DirLeft,
  DirRight,
  listIcon,
} from '../utility/svg';
import Link from 'next/link';
import axios from 'axios';
import NodeRSA from 'node-rsa';
import CryptoJS from 'crypto-js';
import { OverlayContext } from './Layout';
import { CSVLink } from 'react-csv';

const key = new NodeRSA({ b: 256 });


const data = [
  {
    key: '1',
    fullName: 'Iyanuloluwa Dina',
    username: 'iyanex',
    email: 'atandadray@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'Sept 17, 2022',
    report: 45,
    status: 'Active',
    views: (
      <div className="view-btn">
        <Link
          href={'/user-details'}
          onClick={() => setDefaultUSerTab('1')}
          passHref
        >
          <Button className="view-profile">View profile</Button>
        </Link>

        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '2',
    fullName: 'Jide Ola',
    username: 'Ola',
    email: 'jideola@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'Jun 12, 2020',
    report: 2,
    status: 'Inactive',
    views: (
      <div className="view-btn">
        <Link
          href={'/user-details'}
          onClick={() => setDefaultUSerTab('1')}
          passHref
        >
          <Button className="view-profile">View profile</Button>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '3',
    fullName: 'Specter Omo',
    username: 'Specter Damilare',
    email: 'Specter@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'May 8, 2021',
    report: 10,
    status: 'Active',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '4',
    fullName: 'Jesse Finn',
    username: 'Finn',
    email: 'jessefinn@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'Aug 16, 2020',
    report: 22,
    status: 'Inactive',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>

        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '5',
    fullName: 'Atanda Damilare',
    username: 'Ola',
    email: 'jessefinn@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'Sept 17, 2022',
    report: 45,
    status: 'Active',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '6',
    fullName: 'Jide Ola',
    username: 'Damilare',
    email: 'atandadray@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'Jun 12, 2020',
    report: 2,
    status: 'Inactive',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '7',
    fullName: 'Henry Etta',
    username: 'Omo',
    email: 'atandadray@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'May 8, 2021',
    report: 10,
    status: 'Active',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '8',
    fullName: 'Jesse Finn',
    username: 'Ola',
    email: 'jessefinn@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'May 8, 2021',
    report: 22,
    status: 'Inactive',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '9',
    fullName: 'Specter Omo',
    username: 'Finn',
    email: 'jessefinn@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'May 8, 2021',
    report: 42,
    status: 'Active',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
  {
    key: '10',
    fullName: 'Atanda Damilare',
    username: 'Etta',
    email: 'henryetta@gmail.com',
    phone: '+2348123456790',
    dateRegistered: 'May 8, 2021',
    report: 2,
    status: 'Inactive',
    views: (
      <div className="view-btn">
        <Link href={'/user-details'} passHref>
          <Link
            href={'/user-details'}
            onClick={() => setDefaultUSerTab('1')}
            passHref
          >
            <Button className="view-profile">View profile</Button>
          </Link>
        </Link>
        <Link
          href={'/user-details?defaultpage=2'}
          onClick={() => setDefaultUSerTab('2')}
          passHref
        >
          <Button className="view-report">View reports</Button>
        </Link>
      </div>
    ),
  },
];

export default function ManageUsers() {
  
  const { setDefaultUSerTab } = OverlayContext();
  const [incidentsData, setIncidentsData] = useState([]);
  const { Search } = Input;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState('all');

  //SearchQuery
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
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
        item.email.toUpperCase().includes(searchQuery.toUpperCase()) ||
        item.username.toUpperCase().includes(searchQuery.toUpperCase())
    );
    });

    setFilteredData(filtered);
  }, [currentPage, searchQuery]);


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // rsa start

  const [plaintext, setPlaintext] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');

  const handleEncrypt = () => {
    // const encryptedData = key.encrypt(plaintext, 'base64');
    // setEncrypted(encryptedData);

    console.log({ key: key, iv: iv });

    const encrypted = CryptoJS.AES.encrypt(inputText, key, {
      iv: iv,
    }).toString();
    setOutputText(encrypted);
    console.log(encrypted);
  };

  // Function to filter the data based on the search query
  const filterData = () => {
    const filtered = data.filter(item => {
      return (
        item.email.toUpperCase().includes(searchQuery.toUpperCase()) ||
        item.username.toUpperCase().includes(searchQuery.toUpperCase())
    );
    });
    setFilteredData(filtered);
  };



  useEffect(() => {
    filterData();
  }, [searchQuery]);

   // Function to handle search input changes
   const handleSearchInputChange = e => {
    setSearchQuery(e.target.value);
  };


  





  const handleDecrypt = () => {
    // const decryptedData = key.decrypt(encrypted, 'utf8');
    // setDecrypted(decryptedData);

    console.log({ key: key, iv: iv });
    console.log(outputText);

    const decrypted = CryptoJS.AES.decrypt(outputText, key, {
      iv: iv,
    }).toString(CryptoJS.enc.Utf8);
    setOutputText(decrypted);
    console.log(decrypted);
  };

  // rsa end

  const onSearch = value => console.log(value);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onChangeCheck = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const columns = [
    {
      title: ' ',
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: text => (
        <div>
          <Checkbox onChange={onChange} />
        </div>
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: text => <span className="last-name">{text}</span>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: 'Total Reports',
      dataIndex: 'report',
      key: 'report',
      render: text => <span className="report">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <div>
          <span className={`user-status ${text}`}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Date Registered',
      dataIndex: 'dateRegistered',
      key: 'dateRegistered',
    },
    {
      title: ' ',
      dataIndex: 'views',
      key: 'views',
    },
  ];


  const FetchJoke = async () => {
    const url = 'https://icanhazdadjoke.com';

    try {
      const { data } = await axios(url, {
        headers: { Accept: 'application/json' },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    FetchJoke();
    // generateRandomNumber();
    setKey(CryptoJS.lib.WordArray.random(16));
    setIv(CryptoJS.lib.WordArray.random(16));
  }, []);

  const [inputText, setInputText] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [outputText, setOutputText] = useState('');


  function exportToCSV(data) {
    const csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(data[0]).join(",");
    const csvData = data.map((row) => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${csvData}`;
    const encodedUri = encodeURI(csvContent + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  



  return (
    <section>

      <CSVLink data={data} filename={'exported-data.csv'}>
        <ExportZone h4="All Users" />
      </CSVLink>

   

    
    

      <div className="container search-filter">
        <div className="row justify-content-between gap-3">
          <div className="col-md-auto d-flex flex-wrap gap-3 me-lg-5">
            <div className="the-search">
              <Search
                prefix={SearchIcon}
                placeholder="Search by Fullname"
                onSearch={onSearch}
                className="searching"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                Page <span className="our-color">{currentPage}</span> of{' '}
                <span className="our-color">{Math.ceil(data.length / itemsPerPage)}</span>
              </p>
              <div className="dir">
                <a href="#"onClick={goToPreviousPage}>
                  <span className="">{DirLeft}</span>
                </a>
                <a href="#"onClick={goToNextPage}>
                  <span className="">{DirRight}</span>
                </a>
              </div>
            </div>
            <div>
              <Space wrap>
                <Select
                  defaultValue="10 per page'"
                  style={{
                    width: 120,
                  }}
                 
                  options={[
                    {
                      value: '10 per page',
                      label: '10 ',
                    },
                    {
                      value: '25',
                      label: '25 ',
                    },
                    {
                      value: '50',
                      label: '50 ',
                    },
                    {
                      value: '100',
                      label: '100 ',
                    },
                    {
                      value: '250',
                      label: '250 ',
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
          <Table columns={columns} dataSource={filteredData} pagination={false} />
          {/* <div className="our-pagination d-flex justify-content-center">
            <div className="d-flex gap-lg-4 gap-3 align-items-center flex-wrap">
              <p className="det">
                Page <span className="our-color">2</span> of{' '}
                <span className="our-color">1000</span>
              </p>
              <div className="dir">
                <a href="">
                  <span className="">{DirLeft}</span>
                </a>
                <a href="">
                  <span className="">{DirRight}</span>
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Modal
        title="Filter by:"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        className="our-modal"
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="status" label="Status:">
            <Radio.Group onChange={onChangeCheck} value={value}>
              <Radio value={'all'}>All</Radio>
              <Radio value={'active'}>Active</Radio>
              <Radio value={'inactive'}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="rangeFilter"
            label="Date range:"
            className="date-filter"
          >
            <Space direction="" className="flex-wrap" style={{ width: '100%' }}>
              <DatePicker
                onChange={() => onChange(e)}
                placeholder="From"
                style={{
                  width: '250px',
                }}
              />
              <DatePicker
                onChange={() => onChange(e)}
                placeholder="To"
                style={{
                  width: '250px',
                }}
              />
            </Space>
          </Form.Item>

          <Form.Item className="buttons">
            <Button
              // type="primary"
              onClick={() => setModalOpen(false)}
              htmlType="submit"
              className="me-3"
              style={{ background: '#7D0003', color: '#fff' }}
            >
              Apply
            </Button>
            <Button
              type="primary"
              onClick={() => setModalOpen(false)}
              style={{ background: '#FFF', color: '#1C1C1C' }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
