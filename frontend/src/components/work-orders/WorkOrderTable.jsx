import { Button, Space, Table } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/utils/formatDate";
export default function WorkOrderTable({ data, loading, onView, onEdit, onDelete, canEdit, canDelete }) {
  const columns=[
    {title:"WO #",dataIndex:"workOrderNumber",fixed:"left"},{title:"Title",dataIndex:"title"},
    {title:"Priority",dataIndex:"priority",render:v=><StatusBadge value={v}/>},{title:"Status",dataIndex:"status",render:v=><StatusBadge value={v}/>},
    {title:"Site",dataIndex:"siteId",render:v=>`#${v}`},{title:"Technician",dataIndex:"assignedTechnicianId",render:v=>v?`#${v}`:"Unassigned"},
    {title:"Scheduled",dataIndex:"scheduledAt",render:formatDate},
    {title:"Actions",fixed:"right",width:150,render:(_,row)=><Space><Button type="text" icon={<Eye size={16}/>} onClick={()=>onView(row)}/>{canEdit&&<Button type="text" icon={<Pencil size={16}/>} onClick={()=>onEdit(row)}/>} {canDelete&&<Button type="text" danger icon={<Trash2 size={16}/>} onClick={()=>onDelete(row)}/>}</Space>}
  ];
  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} scroll={{x:1100}}/>;
}
