export const getDataFromLocalStorage = async () => {
  const getData = await JSON.parse(localStorage.getItem("toDoList"));

  return getData;
};
