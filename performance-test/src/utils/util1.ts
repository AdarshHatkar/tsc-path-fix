export const util1 = () => {
  return `Utility function 1`;
};

export const formatResponse1 = (data: any) => {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
};
