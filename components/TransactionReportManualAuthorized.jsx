import React, { useState } from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  FilterIcon,
  DirLeft,
  DirRight,
  CalenderIcon,
  BankDebit,
  ExportCsv,
} from '../utility/svg';
import Link from 'next/link';
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
import AddIcon from './Vectors/AddIcon';

export default function TransactionReportManualAuthorized() {
  const { Search } = Input;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [modalsignature, setModalSignature] = useState(false);
  const [value, setValue] = useState('all');
  const [currentStatus, setCurrentStatus] = useState('Awaiting Confirmation');

  const defaultCheckedList = ['Pending'];
  const defaultCheckedList2 = ['All'];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkedList2, setCheckedList2] = useState(defaultCheckedList2);
  const [checkAll, setCheckAll] = useState(false);
  const [checkAll2, setCheckAll2] = useState(false);
  const [createReport, setCreateReport] = useState(false);

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onSearch = value => console.log(value);

  const onChangeCheck = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChanges = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  const [indeterminate, setIndeterminate] = useState(true);
  const [indeterminate2, setIndeterminate2] = useState(true);

  const options = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'On Tracking',
      value: 'On Tracking',
    },
    {
      label: 'Recovery',
      value: 'Recovery',
    },
    {
      label: 'Completed',
      value: 'Completed',
    },
  ];

  const plainOptions = [
    'Approved',
    'Awaiting Confirmation',
    'Declined',
    'Failed',
    'Processed',
    'Initiated',
  ];

  const transactionOptions = ['Bank debit', 'Wrong Transfer', 'Card Fraud'];

  const onChanged = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onChanged2 = list => {
    setCheckedList(list);
    setIndeterminate2(!!list.length && list.length < transactionOptions.length);
    setCheckAll2(list.length === transactionOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onCheckAllChange2 = e => {
    setCheckedList(e.target.checked ? transactionOptions : []);
    setIndeterminate2(false);
    setCheckAll2(e.target.checked);
  };

  const columns = [
    {
      title: 'Tracking ID',
      dataIndex: 'TrackingID',
      key: 'TrackingID',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Transaction Reference',
      dataIndex: 'transactionReference',
      key: 'transactionReference',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <span className={`status ${text}`}>{text}</span>,
    },
    {
      title: 'Reported by',
      dataIndex: 'reportedby',
      key: 'reportedby',
    },
    {
      title: 'Date Reported',
      dataIndex: 'datereported',
      key: 'datereported',
    },
    {
      title: ' ',
      dataIndex: 'details',
      key: 'details',
      render: text => (
        <div className="view-btn">
          <Button className="view-profile" onClick={() => setModalReport(true)}>
            View details
          </Button>

          <Button
            className="view-report"
            onClick={() => setModalSignature(true)}
          >
            Signatures
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Awaiting Confirmation',
      companyName: 'Dangote',
      reportedby: 'Specter',
    },
    {
      key: '2',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Wrong Transfer',
      transactionReference: '12345678901234567890',
      status: 'Failed',
      companyName: 'Specter and CO.',
      reportedby: 'Jide Ola',
    },
    {
      key: '3',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Card Fraud',
      transactionReference: '12345678901234567890',
      status: 'Processed',
      companyName: 'Vigilant',
      reportedby: 'Dammy',
    },
    {
      key: '4',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Approved',
      companyName: 'DFM',
      reportedby: 'Jesse Finn',
    },
    {
      key: '5',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Declined',
      companyName: 'Exoil Mobile',
      reportedby: 'Dammy',
    },
    {
      key: '6',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Initiated',
      companyName: 'Office Space',
      reportedby: 'Specter',
    },
    {
      key: '7',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Wrong Transfer',
      transactionReference: '12345678901234567890',
      status: 'Awaiting Confirmation',
      companyName: 'Howard and CO.',
      reportedby: 'Jide Ola',
    },
    {
      key: '8',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Card Fraud',
      transactionReference: '12345678901234567890',
      status: 'Failed',
      companyName: 'Opay',
      reportedby: 'Dammy',
    },
    {
      key: '9',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Processed',
      companyName: 'Film House',
      reportedby: 'Henry etta',
    },
    {
      key: '10',
      TrackingID: 'ABC-1234',
      datereported: 'Jan 11th, 2022 18:26',
      transactionType: 'Bank Debit',
      transactionReference: '12345678901234567890',
      status: 'Approved',
      companyName: 'Apple',
      reportedby: 'Jesse Finn',
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="row _tabs-wrapper">
          <div className="col-auto">
            <h4 className="_tabs">Manual Transaction Reports</h4>
          </div>
          <div className="col-auto d-flex gap-3">
            <Button icon={ExportCsv}>Export CSV</Button>
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
              />
            </div>
            <div className="filter-btn-wrapper">
              <Button icon={FilterIcon} onClick={() => setModalOpen(true)}>
                Filter by:
              </Button>
            </div>
          </div>
          <div className="col-md-auto d-flex justify-content-end gap-lg-5 gap-4">
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
            <div>
              <Space wrap>
                <Select
                  defaultValue="10 per page'"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: '10',
                      label: '10 per page',
                    },
                    {
                      value: '100',
                      label: '100 per page',
                    },
                    {
                      value: '1000',
                      label: '1000 per page',
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
          <Table columns={columns} dataSource={data} />

          <div className="our-pagination d-flex justify-content-center">
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
          </div>
        </div>
      </div>

      <Modal
        title={<div className="text-center">Report Details</div>}
        centered
        open={modalReport}
        onOk={() => setModalReport(false)}
        className="our-modal report-modal"
        footer={null}
        onCancel={() => setModalReport(false)}
      >
        <div className="report-details-modal border-bottom ">
          <h4 className="mb-4">Transaction Details</h4>
          <div className="row">
            <div className="col-md-4 col-6">
              <h6>
                Transaction date <span>{CalenderIcon}</span>{' '}
              </h6>
              <p>Jan 11th, 2022</p>
            </div>
            <div className="col-md-4 col-6">
              <h6>Account number</h6>
              <p>0123456789</p>
            </div>
            <div className="col-md-4 col-6">
              <h6>Transaction type</h6>
              <p>{BankDebit} Bank Debit</p>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4 col-6">
              <h6>Transaction reference</h6>
              <p>0123456789</p>
            </div>
            <div className="col-md col-6">
              <h6>Bank Name</h6>
              <p>
                {' '}
                <span>
                  <Image
                    src={'/icons/Bank_logo.png'}
                    alt="bank logo"
                    width={22}
                    height={22}
                  />
                </span>{' '}
                Guarantee Trust Bank
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-6">
              <h6>Tracking ID </h6>
              <p>ABC-12345</p>
            </div>
            <div className="col-md col-6">
              <h6>
                Report date <span>{CalenderIcon}</span>{' '}
              </h6>
              <p>Jan 11th, 2022</p>
            </div>
          </div>
        </div>

        <div className="report-details-modal border-bottom">
          <h4 className="mb-4">User Details</h4>

          <div className="row">
            <div className="col-md-4 col-6">
              <h6>Name</h6>
              <p>Omojolowo Specter</p>
            </div>
            <div className="col-md col-6">
              <h6>Email address</h6>
              <p>specterdamilare@gmail.com</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h6>Phone Number</h6>
              <p className="">08012345678</p>
            </div>
          </div>
        </div>

        <div className="report-details-modal pb-4">
          <div className="row">
            <div>
              <h4 className="bold">Tracking Details</h4>
            </div>
          </div>
          <div className="row">
            <h6>Report status</h6>
            <p className={`statuses ${currentStatus}`}>• {currentStatus}</p>
          </div>

          <div className="row notes">
            <h6
              className="mb-2"
              style={{ color: '#000000', fontWeight: 'bold' }}
            >
              Notes
            </h6>

            <div>
              <Input.TextArea rows={5} placeholder="what did you notice" />
            </div>
          </div>

          <Form.Item className="buttons mt-2">
            <Button
              // type="primary"
              onClick={() => setModalOpen(false)}
              htmlType="submit"
              className="me-3"
              style={{ background: '#7D0003', color: '#fff' }}
            >
              Process
            </Button>
            <Button
              type="primary"
              onClick={() => setModalOpen(false)}
              style={{ background: '#FFF', color: '#1C1C1C' }}
            >
              Decline
            </Button>
          </Form.Item>
        </div>
      </Modal>

      {/* signature modal  */}

      <Modal
        title={<div className="text-center">Signatures</div>}
        centered
        open={modalsignature}
        onOk={() => setModalSignature(false)}
        className="our-modal report-modal"
        footer={null}
        onCancel={() => setModalSignature(false)}
      >
        <div className="report-details-modal signature-modal">
          <div className="separation">
            <h4>Processing Details</h4>

            <div className="row">
              <div className="col-sm-6 col-6">
                <h6>Processing Details</h6>
                <p>Atanda Specter</p>
              </div>
              <div className="col-sm-6 col-6">
                <h6>
                  Process date <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>Jan 11th, 2022 15:20</p>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h6>
                  Report date to Process Interval{' '}
                  <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>1 year : 4months : 100 days : 15hrs : 40mins : 23 secs</p>
              </div>
            </div>
          </div>

          <div className="separation">
            <h4>Initiation Details</h4>

            <div className="row">
              <div className="col-sm-6 col-6">
                <h6>Initiated by</h6>
                <p>Atanda Specter</p>
              </div>
              <div className="col-sm-6 col-6">
                <h6>
                  Initiate date <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>Jan 11th, 2022 15:20</p>
              </div>
            </div>

            <div className="row ">
              <div className="col-12">
                <h6>
                  Process date to Initaite Interval{' '}
                  <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>1 year : 4months : 100 days : 15hrs : 40mins : 23 secs</p>
              </div>
            </div>
          </div>

          <div>
            <h4>Recovery Details</h4>

            <div className="row">
              <div className="col-sm-6 col-6">
                <h6>Initiated by</h6>
                <p>Atanda Specter</p>
              </div>
              <div className="col-sm-6 col-6">
                <h6>
                  Process date <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>Jan 11th, 2022 15:20</p>
              </div>
            </div>

            <div className="row pb-lg-5 pb-4">
              <div className="col-12">
                <h6>
                  Report date to Process Interval{' '}
                  <span className="ms-1">{CalenderIcon}</span>
                </h6>
                <p>1 year : 4months : 100 days : 15hrs : 40mins : 23 secs</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Filter by:"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        className="our-modal filter-transaction"
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="status" label="Status:" className="wrap-check-group">
            <>
              <div>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                  className="me-3"
                >
                  All
                </Checkbox>
              </div>

              <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={onChanged}
              />
            </>
          </Form.Item>

          <Form.Item
            name="transactionType:"
            label="Transaction type:"
            className="wrap-check-group"
          >
            <>
              <Checkbox
                indeterminate={indeterminate2}
                onChange={onCheckAllChange2}
                checked={checkAll2}
                className="me-3"
              >
                All
              </Checkbox>

              <Checkbox.Group
                options={transactionOptions}
                value={checkedList}
                onChange={onChanged2}
              />
            </>
          </Form.Item>
          <Form.Item
            name="rangeFilter"
            label="Date range:"
            className="date-filter"
          >
            <Space direction="" className="flex-wrap">
              <DatePicker
                onChange={onChange}
                placeholder="From"
                style={{
                  width: 270,
                }}
              />
              <DatePicker
                onChange={onChange}
                placeholder="To"
                style={{
                  width: 270,
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

      {/* add report modal */}
    </section>
  );
}
