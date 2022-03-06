const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");

  const url = `theaudiodb.com/api/v1/json/2/search.php?s=coldplay`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
