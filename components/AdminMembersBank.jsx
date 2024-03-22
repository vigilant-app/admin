import React, { useState, useEffect } from 'react';
import AddIcon from './Vectors/AddIcon';
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
  Skeleton,
  DatePicker,
  Switch,
  Upload,
  Spin,
  message,
} from 'antd';
import { SearchIcon, FilterIcon, DirLeft, DirRight } from '../utility/svg';
import api from '../apis';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import { jsonToHex } from '../apis/util';
import moment from 'moment';
import { paramsObjectToQueryString } from '../apis/paramObjectToQuery';
import Image from 'next/image';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function AdminMembersBank() {
  const { Search } = Input;
  const router = useRouter();
  const { query } = router;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddMember, setModalAddMember] = useState(false);
  const [modalEditMember, setModalEditMember] = useState(false);
  const [value, setValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sunmitLoading, setSubmitLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [banksData, setBanksData] = useState(null);
  const [editBankData, setEditBankData] = useState({});
  const [dataType, setDataType] = useState(null);
  const [page, setPage] = useState(1);
  const [rows, seRows] = useState(null);
  const [search, setSearch] = useState(null);
  const [bankLogoUrl, setBankLogoUrl] = useState('');
  const [editBankLogoUrl, setEditBankLogoUrl] = useState('');
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const onFinish = async values => {
    console.log('Success:', values);
    let payload = {
      // startDate: moment(values?.stateData).format('YYYY-MM-DD'),
      // endDate: moment(values?.endDate).format('YYYY-MM-DD'),
      bankStatus: values?.bankStatus,
    };
    setPage(1);
    router.push(
      `/banks${paramsObjectToQueryString({
        ...query,
        ...payload,
      })}`
    );
  };

  const newProps = {
    name: 'file',
    multiple: false,
    accept: '.png, .jpg',
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
        const formData = new FormData();
        formData.append('file', info.file.originFileObj);
        formData.append('upload_preset', 'qsts7ybb');
        formData.append('folder', 'bank-floder');
        axios
          .post(
            'https://api.cloudinary.com/v1_1/dhu41wkkq/image/upload/',
            formData
          )
          .then(function (response) {
            if (response.status === 200) {
              toast.success(`${info.file.name} file uploaded successfully.`, {
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                pauseOnHover: true,
                position: 'top-right',
              });
              setBankLogoUrl(response?.data?.secure_url);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const newEditProps = {
    name: 'file',
    multiple: false,
    accept: '.png, .jpg',
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
        const formData = new FormData();
        formData.append('file', info.file.originFileObj);
        formData.append('upload_preset', 'qsts7ybb');
        formData.append('folder', 'bank-floder');
        axios
          .post(
            'https://api.cloudinary.com/v1_1/dhu41wkkq/image/upload/',
            formData
          )
          .then(function (response) {
            if (response.status === 200) {
              toast.success(`${info.file.name} file uploaded successfully.`, {
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                pauseOnHover: true,
                position: 'top-right',
              });
              setEditBankLogoUrl(response?.data?.secure_url);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeCheck = (e, id) => {
    setValue(e.target.value);
  };

  const onSearch = value => {
    setPage(1);
    setSearch(value);
  };

  const handlePerPage = value => {
    if (value == 10) {
      seRows(null);
    } else {
      seRows(value);
    }
  };

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const columns = [
    {
      title: 'Bank Logo',
      dataIndex: 'bankLogoUrl',
      key: 'bankLogoUrl',
      render: text =>
        text ? (
          <div className="d-flex gap-3">
            <Checkbox onChange={onChange} />
            <Image src={text} alt="bank logo" width={32} height={32} />
          </div>
        ) : (
          ''
        ),
    },
    {
      title: 'Bank name',
      dataIndex: 'bankName',
      key: 'bankName',
      render: text => <div className="max-content">{text}</div>,
    },
    {
      title: 'Bank code',
      dataIndex: 'bankCode',
      key: 'bankCode',
    },
    // {
    //   title: 'Bank logo url',
    //   dataIndex: 'bankLogoUrl',
    //   key: 'bankLogoUrl',
    //   responsive: ['lg'],
    //   render: text => <div className="page-url">{text}</div>,
    // },
    {
      title: 'Added by',
      dataIndex: 'bankAddedBy',
      key: 'bankAddedBy',
      render: text => <div className="max-content">{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'bankStatus',
      key: 'bankStatus',
      render: (text, index) => (
        <div className="view-btn">
          <Switch
            checked={text == 'Enabled' ? true : false}
            onChange={checked => {
              updateBanks(checked, index);
            }}
          />
        </div>
      ),
    },
    {
      title: 'Date Added',
      dataIndex: 'bankCreatedAt',
      key: 'bankCreatedAt',
    },
    {
      title: ' ',
      dataIndex: 'views',
      key: 'views',
      render: (text, index) => (
        <div className="view-btn">
          <Button
            className="view-report"
            onClick={() => {
              setEditBankData(index);
              setModalEditMember(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const getBanks = async () => {
    setLoading(true);

    try {
      const res = await api.get(
        `https://safe.staging.vigilant.ng/manage/api/v1.0/banks${paramsObjectToQueryString(
          { action: 'fetch', ...query, page: page, rows, search }
        )}`,
        {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem('Token')
          )}`,
          'x-api-key':
            '68457553374b4a676e2b574452596d4b4c3439724737707341434e3652423834466775463033674637624e636d526662614c6e697774646a394e42697473534e785878483852416d2b577551617434743453496137505664342b75776b546e5168313350653876343672666b4848674577626864792b77676b47734761356e456d59767632666b486b3342576a6e394945564364416d4f7a4e50576d5337726b4f443774617a662f7036616142784766685479655133696734446f6c684d6e6c4449377857486d794d6463614963497a386d755551474a7a417447367a34314b69456a4179516a79623262306a37477957332b74496f392f50393559505a6137537a62656e4d2b665a446644564957555872556351734d737269637651536746546b714f42656b674b61542f566165527346473031672b6f346238462f4c54694b6346514567354c682b5470566e65777770487553773d3d',
        }
      );

      if (
        res?.data?.code === 'EXP_000' ||
        res?.data?.code === 'EXP_001' ||
        res?.data?.code === 'EXP_002' ||
        res?.data?.code === 'EXP_003' ||
        res?.data?.code === 'EXP_004' ||
        res?.data?.code === 'EXP_005' ||
        res?.data?.code === 'EXP_006' ||
        res?.data?.code === 'EXP_007' ||
        res?.data?.code === 'EXP_008'
      ) {
        router.push('/');
      }

      setLoading(false);
      console.log(res);
      setBanksData(res?.data?.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getBanks();
  // }, [router, page, rows, search]);

  const handleInputChange = (event, key) => {
    setEditBankData(prevState => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  // add bank function

  const addNewBank = async values => {
    console.log('Success:', values);
    // const body = { ...values, bankLogoUrl };
    setSubmitLoading(true);
    const payload = {
      remote: jsonToHex({ ...values, action: 'add', bankLogoUrl }),
    };
    try {
      const res = await api.post(
        'https://safe.staging.vigilant.ng/manage/api/v1.0/banks',
        payload,
        {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem('Token')
          )}`,
          'x-api-key':
            '68457553374b4a676e2b574452596d4b4c3439724737707341434e3652423834466775463033674637624e636d526662614c6e697774646a394e42697473534e785878483852416d2b577551617434743453496137505664342b75776b546e5168313350653876343672666b4848674577626864792b77676b47734761356e456d59767632666b486b3342576a6e394945564364416d4f7a4e50576d5337726b4f443774617a662f7036616142784766685479655133696734446f6c684d6e6c4449377857486d794d6463614963497a386d755551474a7a417447367a34314b69456a4179516a79623262306a37477957332b74496f392f50393559505a6137537a62656e4d2b665a446644564957555872556351734d737269637651536746546b714f42656b674b61542f566165527346473031672b6f346238462f4c54694b6346514567354c682b5470566e65777770487553773d3d',
        }
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      setModalAddMember(false);
      getBanks();
    }
  };

  // edit bank function

  const editBank = async values => {
    console.log('Success:', values);
    console.log(editBankLogoUrl);

    setSubmitLoading(true);

    const payload = {
      remote: jsonToHex({
        action: 'edit',
        bankID: editBankData?.bankID,
        bankName: values?.bankName,
        bankCode: values?.bankCode,
        bankLogoUrl: editBankLogoUrl,
        bankStatus: editBankData?.editBankData,
      }),
    };

    console.log(payload);

    try {
      const res = await api.put(
        'https://safe.staging.vigilant.ng/manage/api/v1.0/banks',
        payload,
        {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem('Token')
          )}`,
          'x-api-key':
            '68457553374b4a676e2b574452596d4b4c3439724737707341434e3652423834466775463033674637624e636d526662614c6e697774646a394e42697473534e785878483852416d2b577551617434743453496137505664342b75776b546e5168313350653876343672666b4848674577626864792b77676b47734761356e456d59767632666b486b3342576a6e394945564364416d4f7a4e50576d5337726b4f443774617a662f7036616142784766685479655133696734446f6c684d6e6c4449377857486d794d6463614963497a386d755551474a7a417447367a34314b69456a4179516a79623262306a37477957332b74496f392f50393559505a6137537a62656e4d2b665a446644564957555872556351734d737269637651536746546b714f42656b674b61542f566165527346473031672b6f346238462f4c54694b6346514567354c682b5470566e65777770487553773d3d',
        }
      );
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
    setModalEditMember(false);
    setBanksData(prevState => ({
      ...prevState,
      data: prevState?.data.map(el => {
        if (el?.bankID == editBankData?.bankID) {
          return { ...editBankData, bankLogoUrl: editBankLogoUrl };
        } else {
          return el;
        }
      }),
    }));
    setEditBankData({});
  };

  // update status function

  const updateBanks = async (checked, editData) => {
    console.log(`switch to ${checked}`);

    setBanksData(prevState => ({
      ...prevState,
      data: prevState?.data.map(el => {
        if (el?.bankID == editData?.bankID) {
          return { ...el, bankStatus: checked ? 'Enabled' : 'Disabled' };
        } else {
          return el;
        }
      }),
    }));

    const payload = {
      remote: jsonToHex({
        action: 'updateStatus',
        bankID: editData?.bankID,
        bankStatus: checked ? 'Enabled' : 'Disabled',
      }),
    };

    console.log(payload);

    // return;

    try {
      const res = await api.put(
        'https://safe.staging.vigilant.ng/manage/api/v1.0/banks',
        payload,
        {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem('Token')
          )}`,
          'x-api-key':
            '68457553374b4a676e2b574452596d4b4c3439724737707341434e3652423834466775463033674637624e636d526662614c6e697774646a394e42697473534e785878483852416d2b577551617434743453496137505664342b75776b546e5168313350653876343672666b4848674577626864792b77676b47734761356e456d59767632666b486b3342576a6e394945564364416d4f7a4e50576d5337726b4f443774617a662f7036616142784766685479655133696734446f6c684d6e6c4449377857486d794d6463614963497a386d755551474a7a417447367a34314b69456a4179516a79623262306a37477957332b74496f392f50393559505a6137537a62656e4d2b665a446644564957555872556351734d737269637651536746546b714f42656b674b61542f566165527346473031672b6f346238462f4c54694b6346514567354c682b5470566e65777770487553773d3d',
        }
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      // getBanks();
    }
  };

  const lastPgae = () => {
    if (page <= 1) {
      return;
    } else {
      setPage(prevState => prevState - 1);
    }
  };

  const nextPgae = () => {
    if (page == banksData?.pagination[0]?.totalPages) {
      return;
    } else {
      setPage(prevState => prevState + 1);
    }
  };

  const handleClearForm = () => {
    form.resetFields();
    setModalOpen(false);
    router.push('/banks');
  };

  useEffect(() => {
    formEdit.resetFields();
    // Set the form values after the data has been fetched
    formEdit.setFieldsValue({
      bankName: editBankData?.bankName,
      bankCode: editBankData?.bankCode,
    });
    setEditBankLogoUrl(editBankData?.bankLogoUrl);
  }, [editBankData, formEdit]);

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
              style={{ background: '#7D0003', color: '#fff' }}
              onClick={() => setModalAddMember(true)}
            >
              Add new bank
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
                placeholder="Search by Bank name, bank code,..."
                onSearch={onSearch}
                className="searching"
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
                Page{' '}
                <span className="our-color">
                  {' '}
                  {banksData?.pagination[0]?.pageNo}
                </span>{' '}
                of{' '}
                <span className="our-color">
                  {banksData?.pagination[0]?.totalPages}
                </span>
              </p>
              <div className="dir">
                <button
                  className="border-0"
                  onClick={() => lastPgae()}
                  disabled={banksData?.pagination[0]?.pageNo <= 1}
                >
                  <span className="">{DirLeft}</span>
                </button>

                <button
                  className="border-0"
                  onClick={() => nextPgae()}
                  disabled={
                    banksData?.pagination[0]?.pageNo >=
                    banksData?.pagination[0]?.totalPages
                  }
                >
                  <span className="">{DirRight}</span>
                </button>
              </div>
            </div>
            <div>
              <Space wrap>
                <Select
                  defaultValue="10"
                  style={{
                    width: 125,
                  }}
                  onChange={handlePerPage}
                  value={`${rows ? rows : 10} per page`}
                  options={[
                    {
                      value: '10',
                      label: '10',
                    },
                    {
                      value: '25',
                      label: '25',
                    },
                    {
                      value: '100',
                      label: '100',
                    },
                    {
                      value: '1000',
                      label: '1000',
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
        <div className="table-wrapper">
          {loading ? (
            <Skeleton active paragraph={{ rows: 12 }} />
          ) : (
            <Table
              columns={columns}
              dataSource={banksData?.data}
              pagination={{ pageSize: rows }}
            />
          )}

          <div className="our-pagination d-flex justify-content-center">
            {!loading && (
              <div className="d-flex gap-lg-4 gap-3 align-items-center flex-wrap">
                <p className="det">
                  Page{' '}
                  <span className="our-color">
                    {banksData?.pagination[0]?.pageNo}
                  </span>{' '}
                  of{' '}
                  <span className="our-color">
                    {banksData?.pagination[0]?.totalPages}
                  </span>
                </p>
                <div className="dir">
                  <button
                    className="border-0"
                    onClick={() => lastPgae()}
                    disabled={banksData?.pagination[0]?.pageNo <= 1}
                  >
                    <span className="">{DirLeft}</span>
                  </button>
                  <button
                    className="border-0"
                    onClick={() => nextPgae()}
                    disabled={
                      banksData?.pagination[0]?.pageNo >=
                      banksData?.pagination[0]?.totalPages
                    }
                  >
                    <span className="">{DirRight}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* filter by modal */}

      <Modal
        title="Filter by:"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
          // form.resetFields();
        }}
        className="our-modal filter-transaction"
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item name="bankStatus" label="Status:">
            <Radio.Group onChange={onChangeCheck} value={value}>
              <Radio value="Enabled">Enabled</Radio>
              <Radio value="Disabled">Disabled</Radio>
            </Radio.Group>
          </Form.Item>

          <Space direction="" className="flex-wrap">
            <Form.Item className="date-filter" name="startDate">
              <DatePicker
                placeholder="From"
                style={{
                  width: 270,
                }}
              />
            </Form.Item>

            <Form.Item className="date-filter" name="endDate">
              <DatePicker
                placeholder="To"
                style={{
                  width: 270,
                }}
              />
            </Form.Item>
          </Space>

          <Form.Item className="buttons">
            <Button
              onClick={() => setModalOpen(false)}
              htmlType="submit"
              className="me-3"
              style={{ background: '#7D0003', color: '#fff' }}
            >
              Apply
            </Button>
            <Button
              type="primary"
              onClick={() => handleClearForm()}
              style={{ background: '#FFF', color: '#1C1C1C' }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* add Bank modal */}

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
          <p>Fill the fields below to add a new bank.</p>
        </div>
        <Form layout="vertical" onFinish={addNewBank}>
          <Form.Item
            name="bankName"
            label="Bank Name"
            className="heights"
            rules={[
              {
                required: true,
                message: 'Please input your bank name!',
              },
            ]}
          >
            <Input placeholder="Enter bank name" />
          </Form.Item>

          <Form.Item
            name="bankCode"
            label="Bank Code"
            className="heights"
            rules={[
              {
                required: true,
                message: 'Please input your bank code!',
              },
            ]}
          >
            <Input placeholder="Enter bank code" />
          </Form.Item>

          <Form.Item
            name="bankLogoUrl"
            label="Bank Logo URL"
            className="heights uploads"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: 'Please upload your store logo',
              },
            ]}
          >
            <Upload name="file" {...newProps} listType="picture">
              <Button
                className="upload-wrapper d-flex align-item-center justify-content-center"
                style={{ color: '#7D0003' }}
              >
                <div>
                  <UploadOutlined
                    style={{
                      color: '#7D0003',
                      fontSize: '18px',
                      marginRight: '8px',
                    }}
                  />
                </div>
                <div
                // style={{ color: '#7D0003', textDecorationLine: 'underline' }}
                >
                  Click to upload bank image
                </div>
              </Button>
            </Upload>
          </Form.Item>

          <Button
            htmlType="submit"
            style={{ background: '#7D0003', color: '#FFF' }}
            className={
              sunmitLoading ? 'our-btn-fade w-100 mt-4 mb-4' : 'w-100 mt-4 mb-4'
            }
            loading={sunmitLoading}
            disabled={sunmitLoading}
          >
            {sunmitLoading ? (
              <Spin
                className="white-spinner d-flex align-items-center justify-content-center"
                style={{ color: 'white' }}
              />
            ) : (
              <>Add Bank</>
            )}
          </Button>
        </Form>
      </Modal>

      {/* edit member modal  */}

      <Modal
        centered
        open={modalEditMember}
        onOk={() => setModalEditMember(false)}
        onCancel={() => {
          setModalEditMember(false);
        }}
        className="our-modal add-page-modal"
        footer={null}
      >
        <div className="headings text-center">
          <h4>Edit Bank</h4>
          <p>Fill the fields below to edit bank.</p>
        </div>
        <Form layout="vertical" onFinish={editBank} form={formEdit}>
          <Form.Item
            name="bankName"
            label="Bank Name"
            className="heights"
            rules={[
              {
                required: true,
                message: 'Please input your bank name!',
              },
            ]}
          >
            <Input placeholder="Enter bank name" />
          </Form.Item>

          <Form.Item
            name="bankCode"
            label="Bank Code"
            className="heights"
            rules={[
              {
                required: true,
                message: 'Please input your bank code!',
              },
            ]}
          >
            <Input placeholder="Enter bank code" />
          </Form.Item>

          <Form.Item
            name="bankLogoUrl"
            label="Bank Logo URL"
            className="heights uploads"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: 'Please upload your store logo',
              },
            ]}
          >
            <Upload name="file" {...newEditProps} listType="picture">
              <Button
                className="upload-wrapper d-flex align-item-center justify-content-center"
                style={{ color: '#7D0003' }}
              >
                <div>
                  <UploadOutlined
                    style={{
                      color: '#7D0003',
                      fontSize: '18px',
                      marginRight: '8px',
                    }}
                  />
                </div>
                <div
                // style={{ color: '#7D0003', textDecorationLine: 'underline' }}
                >
                  Click to upload bank image
                </div>
              </Button>
            </Upload>
          </Form.Item>

          <Button
            htmlType="submit"
            style={{ background: '#7D0003', color: '#FFF' }}
            className={
              sunmitLoading ? 'our-btn-fade w-100 mt-4 mb-4' : 'w-100 mt-4 mb-4'
            }
            // loading={sunmitLoading}
            // disabled={sunmitLoading}
          >
            {sunmitLoading ? (
              <Spin
                className="white-spinner d-flex align-items-center justify-content-center"
                style={{ color: 'white' }}
              />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Form>
      </Modal>
    </section>
  );
}
