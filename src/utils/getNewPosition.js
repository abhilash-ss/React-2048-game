const getNewPosition = () => {
  const rowPosition = Math.floor(Math.random() * 4);
  const colPosition = Math.floor(Math.random() * 4);
  return [rowPosition, colPosition];
};

export default getNewPosition;
