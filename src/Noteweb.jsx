import React, { useState } from "react";
// import View from "./View";
import "./Noteweb.css";

const Noteweb = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [FullNotes, setFullNotes] = useState([]);
  const [newData, setNewdata] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [Isedit, setIsedit] = useState(null);

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    const val = { id: new Date().getTime().toString(), title, note };
    setNewdata([...FullNotes, val]);
    if (title && Isedit) {
      setFullNotes(
        FullNotes.map((elem) => {
          if (elem.id === Isedit) {
            return { ...elem, title, note };
          }
          return elem;
        })
      );
      setTitle("");
      setNote("");
      setIsedit(null);
    } else {
      const data = { id: new Date().getTime().toString(), title, note };
      setFullNotes([...FullNotes, data]);
      setTitle("");
      setNote("");
    }
  };

  const deleteBook = (index) => {
    const dltItem = FullNotes.filter((book) => {
      return index !== book.id;
    });
    setFullNotes(dltItem);
  };

  const editbtn = (id) => {
    let newEditItem = FullNotes.find((elem) => {
      return id === elem.id;
    });
    setTitle(newEditItem.title);
    setNote(newEditItem.note);
    setIsedit(id);
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setFullNotes(newData);
    } else {
      const result = FullNotes.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFullNotes(result);
    }
    setSearchFilter(e.target.value);
  };
  const Research = (e) => {
    const items = FullNotes.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFullNotes(items);
  };

  return (
    <div className="wrapper">
      <h1>Your Privacy In Your Hand</h1>
      <input
        type="text"
        className="search"
        placeholder="search using Title of the note..."
        value={searchFilter}
        onInput={(e) => handleSearch(e)}
      />
      <button onClick={Research}>search</button>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBookSubmit}
          >
            <input
              type="text"
              className="form-control form-cntrl1"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <br></br>

            <textarea
              type="text"
              className="form-control form-cntrl"
              placeholder="Your Note"
              required
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></textarea>
            <br></br>
            <button type="submit" className="btn-submit">
              Add Note
            </button>
          </form>
        </div>
      </div>

      <div className="view-container">
        <h3>Your Notes</h3>
        {FullNotes.length > 0 && (
          <>
            <div className="container">
              {FullNotes.map((book) => {
                return (
                  <div className="items" key={book.id}>
                    <h2>{book.title}</h2>
                    <h2>{book.note}</h2>
                    <div className="btnn">
                      <p
                        className="delete-btn"
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete Note
                      </p>
                      <p className="edit" onClick={() => editbtn(book.id)}>
                        Edit Note
                      </p>
                    </div>
                    <h5>{new Date().toLocaleTimeString()}</h5>
                    <h5>{new Date().toLocaleDateString()}</h5>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {FullNotes.length < 1 && (
          <div>
            <p>Nothing to show!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Noteweb;
