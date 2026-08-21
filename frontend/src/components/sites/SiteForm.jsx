import { Form, Input, InputNumber } from "antd";
export default function SiteForm({ form }) {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <Form.Item name="siteName" label="Site name" rules={[{ required:true }]}><Input /></Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required:true }]}><Input /></Form.Item>
      <div className="form-grid">
        <Form.Item name="city" label="City" rules={[{ required:true }]}><Input /></Form.Item>
        <Form.Item name="state" label="State" rules={[{ required:true }]}><Input /></Form.Item>
      </div>
      <div className="form-grid">
        <Form.Item name="pincode" label="Pincode" rules={[{ required:true }]}><Input /></Form.Item>
        <Form.Item name="customerId" label="Customer ID" rules={[{ required:true }]}><InputNumber min={1} className="w-full"/></Form.Item>
      </div>
    </Form>
  );
}
