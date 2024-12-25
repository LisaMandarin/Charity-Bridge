import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export function LeftArrowBar() {
  let navigate = useNavigate();

  return (
    // parent div must be relative flex flex-col
    <div className="sticky top-0 z-50 shadow-md bg-white opacity-95">
      <ArrowLeftOutlined className="text-xl p-4" onClick={() => navigate(-1)} />
    </div>
  );
}
