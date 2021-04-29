import { useState } from "react";
import "../style/table.css";

const Table = (props) => {
  const [regex, setRegex] = useState("");
  const [selectValue, setSelect] = useState("_id");

  const onChange = (e) => {
    setRegex(e.target.value);
  };
  const onSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="tableComponent">
      <div className="search-box" key="search">
        Search{" "}
        <input type="text" name="search" id="searchBox" onChange={onChange} />
        <select
          onChange={onSelectChange}
          name="selectAttributeToSearch"
          id="selectSearch"
          key="search-select"
        >
          {Object.keys(props.collection[0]).map((key) => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <table className="users-table">
        <thead>
          <tr className="table-headline">
            {Object.keys(props.collection[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.collection &&
            // sorter &&
            props.collection
              //   .sort(sorter)
              .filter((row) => {
                return new RegExp(`^${regex}`, "i").test(row[selectValue]);
              })
              .map((row) => {
                return (
                  <tr key={row._id}>
                    {Object.values(row).map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
/* 
plan: take the collection header, and map it's keys for the seach options and the th tags.
this way, it could be more robust and generic.

plus, add all the table data from the javascript file.
*/
