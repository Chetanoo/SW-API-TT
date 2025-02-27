import React from "react";
import { Result } from "antd";
import { BackButton } from "../../components/BackButton";

const NoPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<BackButton />}
    />
  );
};

export default NoPage;
