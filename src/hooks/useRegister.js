import React from "react";

const useRegister = () => {
  const [infoRegister1, setInfoRegister1] = React.useState({});
  const [infoRegister2, setInfoRegister2] = React.useState({});
  const [infoRegister3, setInfoRegister3] = React.useState({});

  return {
    setInfoRegister1,
    setInfoRegister2,
    setInfoRegister3,
  };
};

export default useRegister;
