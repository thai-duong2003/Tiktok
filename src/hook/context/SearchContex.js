const { createContext, useState } = require("react");

export const SearchContex = createContext("");

function SearchContexApi({ children }) {
  const queryString = window.location.search; // lay ra chuoi param o url
  const urlParams = new URLSearchParams(queryString); // phan giai param
  const paramsearch = urlParams.get("q"); //lay param ra dung

  const [Searchkeyword, setSearchkeyword] = useState(
    paramsearch ? paramsearch : ""
  );
  return (
    <SearchContex.Provider
      value={{ paramsearch, Searchkeyword, setSearchkeyword }}
    >
      {children}
    </SearchContex.Provider>
  );
}
export default SearchContexApi;
