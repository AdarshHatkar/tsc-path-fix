export const util2 = () => {
  return `Utility function 2`;
};

export const formatResponse2 = (data: any) => {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
};
