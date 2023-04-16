import React from 'react';
import { useState } from 'react';

const useUpdateProfile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  return [openUpdate, setOpenUpdate];
};

export default useUpdateProfile;
