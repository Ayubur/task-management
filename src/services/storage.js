const save = (INDEX_NAME, data) => {
  localStorage.setItem(INDEX_NAME, JSON.stringify(data));
};

const getData = (INDEX_NAME) => {
  let data = localStorage.getItem(INDEX_NAME);
  // if (data && data!= undefined && data !== null ) {
  //   data = JSON.parse(data);
  //   return data;
  // }

  return data;
};

const deleteData = (INDEX_NAME) => {
  let data = localStorage.removeItem(INDEX_NAME);
};

export { save, getData, deleteData };
