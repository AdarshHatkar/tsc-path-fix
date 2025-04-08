export const util0 = (data: any) => {
  return {
    ...data,
    processed: true,
    timestamp: new Date().toISOString()
  };
};

export const formatResponse0 = (data: any) => {
  return {
    success: true,
    data: util0(data)
  };
};
