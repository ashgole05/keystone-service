import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { PRIORITIES } from "@/constants/priorities";
import { WORK_ORDER_STATUS } from "@/constants/workOrderStatus";

export const workOrderToForm=(row)=>({...row,scheduledAt:row?.scheduledAt?dayjs(row.scheduledAt):null});
export const workOrderFromForm=(values)=>({...values,scheduledAt:values.scheduledAt?values.scheduledAt.format("YYYY-MM-DDTHH:mm:ss"):null});

export default function WorkOrderForm({ form }) {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <Form.Item name="title" label="Title" rules={[{required:true}]}><Input /></Form.Item>
      <Form.Item name="description" label="Description"><Input.TextArea rows={3}/></Form.Item>
      <div className="form-grid">
        <Form.Item name="priority" label="Priority" rules={[{required:true}]}><Select options={PRIORITIES.map(value=>({value,label:value}))}/></Form.Item>
        <Form.Item name="status" label="Status" initialValue="OPEN"><Select options={WORK_ORDER_STATUS.map(value=>({value,label:value.replaceAll("_"," ")}))}/></Form.Item>
      </div>
      <div className="form-grid">
        <Form.Item name="siteId" label="Site ID" rules={[{required:true}]}><InputNumber min={1} className="w-full"/></Form.Item>
        <Form.Item name="assignedTechnicianId" label="Technician ID"><InputNumber min={1} className="w-full"/></Form.Item>
      </div>
      <Form.Item name="scheduledAt" label="Scheduled at"><DatePicker showTime className="w-full"/></Form.Item>
    </Form>
  );
}
