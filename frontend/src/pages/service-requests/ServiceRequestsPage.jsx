import { useEffect,useState } from "react";
import { Button,Form,InputNumber,Modal,message } from "antd";
import { Plus,Search } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import ServiceRequestForm from "@/components/service-requests/ServiceRequestForm";
import ServiceRequestTable from "@/components/service-requests/ServiceRequestTable";
import useAuth from "@/hooks/useAuth";
import { createServiceRequest,getServiceRequests,getServiceRequestsByCustomer,reviewServiceRequest,convertServiceRequest,closeServiceRequest,cancelServiceRequest } from "@/api/serviceRequests.api";
import { getErrorMessage } from "@/utils/errorHandler";

export default function ServiceRequestsPage() {
  const {user}=useAuth();const customer=user?.role==="CUSTOMER";
  const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[customerId,setCustomerId]=useState(null);
  const [form]=Form.useForm();
  const load=async(id=customerId)=>{setLoading(true);try{if(customer){if(!id){setRows([]);return}setRows((await getServiceRequestsByCustomer(id)).data||[])}else setRows((await getServiceRequests()).data||[])}catch(e){message.error(getErrorMessage(e))}finally{setLoading(false)}};
  useEffect(()=>{if(!customer)load()},[]);
  const create=async()=>{try{const v=await form.validateFields();await createServiceRequest(v);message.success("Service request created");setOpen(false);setCustomerId(v.customerId);load(v.customerId)}catch(e){if(e?.response)message.error(getErrorMessage(e))}};
  const action=async(row,type)=>{try{const fn={review:reviewServiceRequest,convert:convertServiceRequest,close:closeServiceRequest,cancel:cancelServiceRequest}[type];await fn(row.id);message.success(`Request ${type} successful`);load()}catch(e){message.error(getErrorMessage(e))}};
  return <><PageHeader eyebrow="Customer care" title="Service requests" description={customer?"Raise requests and follow your own service history.":"Review customer requests and convert qualified issues into work orders."} action={<Button type="primary" icon={<Plus size={16}/>} onClick={()=>{form.resetFields();if(customerId)form.setFieldValue("customerId",customerId);setOpen(true)}}>New request</Button>}/>{customer&&<div className="filter-bar"><span>Your customer record ID</span><InputNumber min={1} value={customerId} onChange={setCustomerId}/><Button icon={<Search size={15}/>} onClick={()=>load(customerId)}>Load my requests</Button></div>}<div className="panel table-panel"><ServiceRequestTable data={rows} loading={loading} role={user?.role} onAction={action}/></div><Modal title="New service request" open={open} onCancel={()=>setOpen(false)} onOk={create} okText="Raise request"><ServiceRequestForm form={form}/></Modal></>;
}
