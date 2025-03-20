import React from "react";

interface IProps {
  title: string;
  description?: string;
}

const PageHeader = (props: IProps) => {
  const { title, description } = props;

  return (
    <div className="font-extralight mb-5">
      <h2 className="text-2xl text-indigo-600">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default PageHeader;
