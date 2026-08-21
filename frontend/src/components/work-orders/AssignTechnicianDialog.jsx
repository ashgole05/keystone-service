import { Form, InputNumber, Modal } from "antd";
export default function AssignTechnicianDialog({open,loading,onCancel,onSubmit}) {
  const [form]=Form.useForm();
  return <Modal title="Assign technician" open={open} onCancel={onCancel} okText="Assign" confirmLoading={loading} onOk={async()=>{const v=await form.validateFields();await onSubmit(v.technicianId);form.resetFields()}}><Form form={form} layout="vertical"><Form.Item name="technicianId" label="Technician ID" rules={[{required:true}]}><InputNumber min={1} className="w-full"/></Form.Item></Form></Modal>;
}
