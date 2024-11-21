import React from "react";

type PropsType = {
  key: string;
  post: startupCardType[];
};

type startupCardType = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const StartupCard = ({ key, post }: PropsType) => {
  return <div>StartupCard</div>;
};

export default StartupCard;
