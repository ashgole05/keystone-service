import { Button, Table } from "antd";
import { Square } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
export default function TimeLogTable({data,loading,onStop,canStop}) {
  const columns=[
    {title:"ID",dataIndex:"id",width:70},{title:"Work order",dataIndex:"workOrderId",render:v=>`#${v}`},{title:"Technician",dataIndex:"technicianId",render:v=>`#${v}`},
    {title:"Started",dataIndex:"startTime",render:formatDate},{title:"Ended",dataIndex:"endTime",render:formatDate},{title:"Minutes",dataIndex:"totalMinutes",render:v=>v??"Running"},{title:"Notes",dataIndex:"notes"},
    {title:"Action",width:100,render:(_,row)=>canStop&&!row.endTime?<Button type="text" danger icon={<Square size={15}/>} onClick={()=>onStop(row.id)}>Stop</Button>:"—"}
  ];
  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} scroll={{x:950}}/>;
}
