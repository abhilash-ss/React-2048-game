const isExist = (array, term=0) => {
  let found = false;

  for (let i = 0; i < array.length; i++) {
    found = array[i].some((i) => i === term);
    if (found) break;
  }
  return found;
};

export default isExist;