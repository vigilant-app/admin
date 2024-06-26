import { DetailsWrapper } from "../IncidentsDetails/styles"
import {
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
    Popconfirm,
    Spin,
    Button,
    message,
} from 'antd';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import api from "../../../apis";
import { BASE_URL } from "../../../utility/constants";
import { approveAdminId } from "../../../apis";
import Cookies from 'js-cookie';
import { OverlayContext } from "../../../components/Layout";
import { useEffect, useState } from "react";






export default function Details({ data }) {
    const { user } = OverlayContext();
    const router = useRouter();
    const [isApproved,setIsApproved] = useState(data[0]?.is_approved)
    
    const token = Cookies.get('token');


    async function fetchAdminData() {
        try {
            const adminData = await approveAdminId(token, router.query?.adminId);
            toast.success(adminData.message);
            setIsApproved(1)
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }

    useEffect(() => {
      setIsApproved(data[0]?.is_approved)
    }, [data])


    const statusValue = isApproved === 1 ? "Active" : "Inactive";
    const statusColor = isApproved === 1 ? "green" : "red";
    

    return (
        <DetailsWrapper>
            <div className="contain">
                <div className="d-flex gap-5">
                    <h4>First name:</h4>
                    <p>{data[0]?.first_name}</p>
                </div>

                <div className="d-flex gap-5">
                    <h4>Last name:</h4>
                    <p>{data[0]?.last_name}</p>
                </div>

                <div className="d-flex gap-5">
                    <h4>Email:</h4>
                    <p>{data[0]?.email}</p>
                </div>

                <div className="d-flex gap-5">
                    <h4>Role:</h4>
                    <p>{data[0]?.role?.name}</p>
                </div>

                <div className="d-flex gap-5">
                    <h4>Status:</h4>
                    <p style={{ color: statusColor }}>• {statusValue}</p>
                </div>

                {user?.role_id === 11 && <div className="d-flex gap-5">
                    <Button
                        danger
                        disabled={isApproved === 1}
                        style={isApproved === 1?{}:{ background: '#7D0003', color: '#FFF' }}
                        onClick={fetchAdminData}
                    >
                        Approve User
                    </Button>

                    <Button
                        danger
                        disabled={isApproved === 1}
                        style={isApproved !== 1?{}:{ background: '#7D0003', color: '#FFF' }}
                    >
                        Decline
                    </Button>
                </div>}


            </div>

        </DetailsWrapper>
    )
}