import React, { useState, useEffect } from "react";
import './fontawesome/css/all.min.css';
import "./Style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  let my="https://www.svgrepo.com/show/181531/writing-note.svg";

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={my} alt="todologo" id="mypic"/>
            <figcaption>Add Your List Here🧾</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              id="type" 
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" id="add" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn"  id="add" onClick={addItem}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn" 
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn" 
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove List"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;




































// import React, {useState} from 'react';
// import './fontawesome/css/all.min.css';
// import "./Style.css";


// const Todo = () => {

//   const [inputData, setinputData] = useState("");
//   const [items, setItems] = useState([]);

//   //add the items function 
//   const addItem = () => {
//     if(!inputData) {
//       alert("plz fill the data");
//     }
//     else{
//       setItems([...items,inputData]);
//     }
//   };

//   let my="https://www.svgrepo.com/show/181531/writing-note.svg";
//     return (
//     <>
//    <div className= "main-div">
//     <div className="child-div">
//         <figure>
//                 <img src={my} alt="pic1" id="mypic"/>
//                 <figcaption>Add Your List Here📝</figcaption>
//             </figure>

//        <div className="addItems">
//         <input type="text" 
//         id="type" 
//         placeholder=" Add items" 
//         value={inputData}  
//         onchange={(event) => setinputData(event.target.value)}/>
        
//         <i class="fa-solid fa-plus" id="add" onClick={addItem} ></i>
//        </div>
       
//        {/* to show our items */}
//        <div className="showItems">
//         {items.map((curElem, index) => {
//           return (
//             <div className="eachItem" key={index}>
//             <p>{curElem}</p>
//             <div className="todo-btn">
//             <i class="fa-solid fa-pen-to-square"></i>
//             <i class="fa-solid fa-trash-can" id="fix"></i>
//             </div>
//           </div>
//           );
//         })}
//         </div>

//         <div className="showItems">
//         <button className='btn1' data-sm-link-text="Remove all"><span>Check List</span></button>
//        </div>
//     </div>
//    </div>
  
//     </>
//   )
// }

// export default Todo
