import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ExportZone from './ExportZone';
import { ArrowUp } from '../utility/svg';
import {
  SearchIcon,
  FilterIcon,
  DirLeft,
  DirRight,
  CalenderIcon,
  BankDebit,
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
  Skeleton,
  Pagination,
} from 'antd';
import api from '../apis';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
import moment from 'moment';
import { OverlayContext } from './Layout';
import { CSVLink } from 'react-csv';



const dateFormat = 'YYYY-MM-DD';

export default function TransactionReports() {
  const { Search } = Input;
  const [showButton, setShowButton] = useState(false);
  const [incidentsData, setIncidentsData] = useState([]);
  const [paginatedIncidentsData, setPaginatedIncidentsData] = useState([]);
  //const [search_query, setSearchQuery] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIncidentsData, setFilteredIncidentsData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const { user } = OverlayContext();
  const idString = user?.role.role_statuses.map(status => status.id).join(',')

  
  const handleSearchInputChange = e => {
    setSearchQuery(e.target.value);
  };



  const filterData = () => {
    const filteredData = incidentsData.filter(item => {
      return (
        item.incidents.toString().includes(searchQuery) ||
        item.incidentID.toString().includes(searchQuery) ||
        item.reportedby.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transactionReference.toString().includes(searchQuery) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredIncidentsData(filteredData);
  };
  
  


  const [filterForm] = Form.useForm();
  const [rows, seRows] = useState(null);




  const router = useRouter();




  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;

      if (scrollPosition > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };





  const columns = [

    {
      title: 'Incidents',
      dataIndex: 'incidents',
      key: 'incidents',
    },
    {
      title: 'Incident ID',
      dataIndex: 'incidentID',
      key: 'incidentID',
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedby',
      key: 'reportedby',
    },
    {
      title: 'Date Reported',
      dataIndex: 'datereported',
      key: 'datereported',
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: text => <span className="image-action">Veiw</span>,
    },
  ];

  const handleRowClick = record => {
    router.push(`/incident-details/${record?.incidentID}`);
  };

  const rowProps = record => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  function generateRandom20DigitNumber() {
    let randomNumber = '';
    for (let i = 0; i < 20; i++) {
      randomNumber += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return randomNumber;
  }

  const { data: fetchIncidents, isLoading: loadingIncidents } = useQuery({
    queryKey: ['get_incidents'],
    queryFn: () => {
      return user?.entity_id === 3
        ? api.fetchAllIncidents(null, { search_query })
        : user?.entity_id === 2
          ? api.fetchNPFIncidents(null, idString)
          : user?.entity_id === 4
            ? api.fetchBanksIncidentByStatuses(null, user?.bank_id, user?.role.role_statuses[0].id)
            : "";
    },
    onSuccess: data => {
      const mappedIncidents = data?.data?.map((incident, index) => ({
        key: index,
        incidents: index + 1,
        incidentID: incident?.incident?.id,
        reportedby: `${incident?.user?.first_name} ${incident?.user?.last_name}`,
        datereported: incident?.incident?.created_at,
        transactionType: incident?.transaction?.name,
        transactionReference: generateRandom20DigitNumber(),
        status: incident?.incident?.status_name,
      }));
      setIncidentsData(mappedIncidents); // Update incidentsData here
      setPaginatedIncidentsData(mappedIncidents); // Initialize paginatedIncidentsData
    },
    onError: err => {
      console.log(err);
    },
    retry: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    pageSize: 10, // Number of items per page
    total: 0, // Total number of items (you can update this when you fetch data)
    showSizeChanger: true, // Allow changing the number of items per page
    pageSizeOptions: ['10', '25', '50', '100'], // Available page sizes
  });

  const handleTableChange = async (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Fetch data for the new page based on the startIndex and endIndex
    const paginatedData = incidentsData.slice(startIndex, endIndex);

    setPaginatedIncidentsData(paginatedData);

    setPagination({
      ...pagination,
      current,
      pageSize,
    });

    filterData(); // Apply filtering based on search query

  };

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
      <CSVLink data={incidentsData} filename={'exported-data.csv'}>
        <ExportZone h4="Incidents" />
      </CSVLink>

      <div className="container search-filter">
        <div className="row justify-content-between gap-3">
          <div className="col-md-auto d-flex flex-wrap gap-3 me-lg-5">
            <div className="the-search">
              <Search
                prefix={SearchIcon}
                placeholder="Search by Username"
                // onSearch={onSearch}
                className="searching"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            {/* <div className="filter-btn-wrapper">
              <Button icon={FilterIcon} onClick={() => setModalOpen(true)}>
                Filter by:
              </Button>
            </div> */}
          </div>
          <div className="col-md-auto d-flex justify-content-end gap-lg-5 gap-4">
            <div>
              <Space className="pagination-control" align="center">
                <Pagination
                  {...pagination}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  onChange={(page, pageSize) =>
                    setPagination({ ...pagination, current: page, pageSize })
                  }
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
          {loadingIncidents ? (
            <Skeleton active paragraph={{ rows: 12 }} />
          ) : (
            <Table
              columns={columns}
              onRow={rowProps}
              pagination={pagination} // Add the pagination configuration here
              onChange={handleTableChange} // Handle pagination changes
              dataSource={searchQuery ? filteredIncidentsData : paginatedIncidentsData}

            />
          )}

          <button
            onClick={handleClick}
            className={
              showButton
                ? 'show-button scroll-to-top'
                : 'hide-button scroll-to-top'
            }
          >
            <div>{ArrowUp}</div>
          </button>


        </div>
      </div>


    </section>
  );
}
