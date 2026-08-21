import { useEffect, useState } from "react";
import { Button, Form, Modal, message } from "antd";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import WorkOrderForm,{workOrderFromForm,workOrderToForm} from "@/components/work-orders/WorkOrderForm";
import WorkOrderTable from "@/components/work-orders/WorkOrderTable";
import { confirmAction } from "@/components/common/ConfirmDialog";
import { createWorkOrder,deleteWorkOrder,getWorkOrders,updateWorkOrder } from "@/api/workOrders.api";
import useAuth from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/errorHandler";

export default function WorkOrdersPage() {
  const {user}=useAuth(),navigate=useNavigate();
  const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[editing,setEditing]=useState(null);
  const [form]=Form.useForm();
  const canCreate=["MANAGER","DISPATCHER"].includes(user?.role),canEdit=canCreate,canDelete=user?.role==="MANAGER";
  const load=async()=>{setLoading(true);try{setRows((await getWorkOrders()).data||[])}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const save=async()=>{try{const v=workOrderFromForm(await form.validateFields());editing?await updateWorkOrder(editing.id,v):await createWorkOrder(v);message.success(editing?"Work order updated":"Work order created");setOpen(false);load()}catch(e){if(e?.response)message.error(getErrorMessage(e))}};
  const remove=row=>confirmAction({title:`Delete ${row.workOrderNumber}?`,danger:true,onOk:async()=>{try{await deleteWorkOrder(row.id);message.success("Work order deleted");load()}catch(e){message.error(getErrorMessage(e))}}});
  return <><PageHeader eyebrow="Execution" title="Work orders" description="Plan, dispatch and track every job through its lifecycle." action={canCreate?<Button type="primary" icon={<Plus size={16}/>} onClick={()=>{setEditing(null);form.resetFields();form.setFieldsValue({status:"OPEN",priority:"MEDIUM"});setOpen(true)}}>New work order</Button>:null}/><div className="panel table-panel"><WorkOrderTable data={rows} loading={loading} canEdit={canEdit} canDelete={canDelete} onView={r=>navigate(`/work-orders/${r.id}`)} onEdit={r=>{setEditing(r);form.setFieldsValue(workOrderToForm(r));setOpen(true)}} onDelete={remove}/></div><Modal width={680} title={editing?"Edit work order":"New work order"} open={open} onCancel={()=>setOpen(false)} onOk={save}><WorkOrderForm form={form}/></Modal></>;
}
