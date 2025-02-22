import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>Back to Character list</Button>;
};
