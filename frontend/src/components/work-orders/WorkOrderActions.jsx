import { Button, Space } from "antd";
export default function WorkOrderActions({workOrder,role,onAction,onAssign}) {
  const s=workOrder.status;
  return <Space wrap>
    {["MANAGER","DISPATCHER"].includes(role)&&!["CLOSED","CANCELLED"].includes(s)&&<Button onClick={onAssign}>Assign technician</Button>}
    {role==="TECHNICIAN"&&s==="ASSIGNED"&&<Button onClick={()=>onAction("accept")}>Accept</Button>}
    {role==="TECHNICIAN"&&["ASSIGNED","ACCEPTED"].includes(s)&&<Button type="primary" onClick={()=>onAction("start")}>Start</Button>}
    {role==="TECHNICIAN"&&s==="IN_PROGRESS"&&<Button onClick={()=>onAction("hold")}>Hold</Button>}
    {role==="TECHNICIAN"&&s==="ON_HOLD"&&<Button onClick={()=>onAction("resume")}>Resume</Button>}
    {role==="TECHNICIAN"&&s==="IN_PROGRESS"&&<Button type="primary" onClick={()=>onAction("complete")}>Complete</Button>}
    {["MANAGER","DISPATCHER"].includes(role)&&!["COMPLETED","CLOSED","CANCELLED"].includes(s)&&<Button danger onClick={()=>onAction("cancel")}>Cancel</Button>}
    {["MANAGER","DISPATCHER"].includes(role)&&s==="COMPLETED"&&<Button type="primary" onClick={()=>onAction("close")}>Close</Button>}
  </Space>;
}
