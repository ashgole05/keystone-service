import { Button, Space, Table } from "antd";
import { Pencil, Trash2 } from "lucide-react";
export default function SiteTable({ data, loading, onEdit, onDelete }) {
  const columns=[
    {title:"Site",dataIndex:"siteName"},{title:"Address",dataIndex:"address"},{title:"City",dataIndex:"city"},{title:"State",dataIndex:"state"},{title:"Pincode",dataIndex:"pincode"},
    {title:"Customer",dataIndex:"customerId",render:v=>`#${v}`},
    {title:"Actions",width:110,render:(_,row)=><Space><Button type="text" icon={<Pencil size={16}/>} onClick={()=>onEdit(row)}/><Button type="text" danger icon={<Trash2 size={16}/>} onClick={()=>onDelete(row)}/></Space>}
  ];
  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} scroll={{x:850}}/>;
}
