import { useEffect, useState } from "react";
import { Button, Form, Modal, message } from "antd";
import { Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import SiteForm from "@/components/sites/SiteForm";
import SiteTable from "@/components/sites/SiteTable";
import { confirmAction } from "@/components/common/ConfirmDialog";
import { createSite,deleteSite,getSites,updateSite } from "@/api/sites.api";
import { getErrorMessage } from "@/utils/errorHandler";

export default function SitesPage() {
  const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[editing,setEditing]=useState(null);
  const [form]=Form.useForm();
  const load=async()=>{setLoading(true);try{setRows((await getSites()).data||[])}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const save=async()=>{try{const v=await form.validateFields();editing?await updateSite(editing.id,v):await createSite(v);message.success(editing?"Site updated":"Site created");setOpen(false);load()}catch(e){if(e?.response)message.error(getErrorMessage(e))}};
  const remove=row=>confirmAction({title:`Delete ${row.siteName}?`,danger:true,onOk:async()=>{try{await deleteSite(row.id);message.success("Site deleted");load()}catch(e){message.error(getErrorMessage(e))}}});
  return <><PageHeader eyebrow="Service footprint" title="Sites" description="Maintain customer locations and service addresses." action={<Button type="primary" icon={<Plus size={16}/>} onClick={()=>{setEditing(null);form.resetFields();setOpen(true)}}>New site</Button>}/><div className="panel table-panel"><SiteTable data={rows} loading={loading} onEdit={r=>{setEditing(r);form.setFieldsValue(r);setOpen(true)}} onDelete={remove}/></div><Modal title={editing?"Edit site":"New site"} open={open} onCancel={()=>setOpen(false)} onOk={save}><SiteForm form={form}/></Modal></>;
}
