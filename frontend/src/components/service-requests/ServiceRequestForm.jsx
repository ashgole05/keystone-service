import { Form, Input, InputNumber } from "antd";
export default function ServiceRequestForm({form}) {
  return <Form form={form} layout="vertical" requiredMark={false}>
    <div className="form-grid"><Form.Item name="customerId" label="Customer ID" rules={[{required:true}]}><InputNumber min={1} className="w-full"/></Form.Item><Form.Item name="siteId" label="Site ID"><InputNumber min={1} className="w-full"/></Form.Item></div>
    <Form.Item name="title" label="Title" rules={[{required:true}]}><Input/></Form.Item>
    <Form.Item name="description" label="Description"><Input.TextArea rows={4}/></Form.Item>
  </Form>;
}
