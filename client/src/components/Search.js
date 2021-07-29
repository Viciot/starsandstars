import React, { useState, useEffect } from "react"
import axios from "axios"

const initialState = ""

const Search = () => {
  const [term, setTerm] = useState(initialState)
  const [results, setResults] = useState([])

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      })
      setResults(data.query.search)
    }

    // run search immediately if this is initial page load
    if (term && !results.length) {
      search();
    // else throttle search requests with timer  
    } else {
      // wait 500ms before executing search
      let timeoutID = setTimeout(() => {
        // do not search if input is empty
        if (term) {
          search();
        }
      }, 500);
    return () => {
    clearTimeout(timeoutID);
    }
  }
}, [term])


  const searchResultsMapped = results.slice(0, 2).map(result => {  
    return (
      <div className="item" key={result.pageid}>
        <div className="content">
          <div className="header">{result.title}</div>
        </div>
        <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
      </div>
    );
  });

    function handleClearSearch(){
    setResults([])
    setTerm(initialState)
  }

  return (
    <div>
      <div className="box">
        <div className="container-1">
          <label>Search Term</label>
          <input
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <button className="form-btn" onClick={handleClearSearch}>Clear</button>
        </div>
      </div>
      <div className="ui celled list">{searchResultsMapped}</div>
    </div>
  );
};

export default Search