import { Descriptions } from "antd";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/utils/formatDate";
export default function WorkOrderDetails({workOrder}) {
  if(!workOrder)return null;
  const items=[["Work order",workOrder.workOrderNumber],["Title",workOrder.title],["Priority",<StatusBadge value={workOrder.priority}/>],["Status",<StatusBadge value={workOrder.status}/>],["Site ID",workOrder.siteId],["Technician ID",workOrder.assignedTechnicianId||"Unassigned"],["Scheduled",formatDate(workOrder.scheduledAt)],["Created",formatDate(workOrder.createdAt)],["Description",workOrder.description||"—"]];
  return <Descriptions bordered column={1} items={items.map(([label,children],i)=>({key:i,label,children}))}/>;
}
