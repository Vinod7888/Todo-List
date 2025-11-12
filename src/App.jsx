import React, { useRef, useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const infREf = useRef();
  const textAreaREf = useRef();

  // Initial value load from localStorage
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("toduItems")) || [];
  });

  // Save to localStorage whenever todo state changes
  useEffect(() => {
    localStorage.setItem("toduItems", JSON.stringify(todo));
  }, [todo]);

  const addTodo = () => {
    let inpvalue = infREf.current.value;
    const titlevalue = textAreaREf.current.value;
    if (inpvalue.trim() !== "") {
      const newTodo = { title: inpvalue, description: titlevalue };
      setTodo([...todo, newTodo]);
      infREf.current.value = "";
      textAreaREf.current.value = "";
    } else {
      alert("Add Todo");
    }
  };

  function deleteItem(delItem) {
    const newData = todo.filter((_, index) => index !== delItem);
    setTodo(newData);
  }

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="container-fluid bg-primary text-white py-4 text-center shadow-sm">
        <h1 className="fw-bold display-6">📝 TODO LIST APP</h1>
        <p className="mb-0">Stay organized and productive</p>
      </div>

      {/* Main Section */}
      <div className="container-xxl mt-5">
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="row g-4"
        >

          {/* Left Section - Input */}
          <div className="col-md-4">
            <div className="bg-white p-4 rounded-4 shadow-sm d-flex flex-column gap-3 border-start border-4 border-primary-subtle">
              <h4 className="text-primary mb-2 text-center"><span>Add</span> <span>New</span> <span>Task</span></h4>
              <input
                ref={infREf}
                type="text"
                className="form-control shadow-sm"
                placeholder="📝 Enter Todo Title"
              />
              <input
                ref={textAreaREf}
                type='text'
                className="form-control shadow-sm"
                placeholder="✍️ Enter Todo Description"
              />
              <button onClick={addTodo} className="btn btn-success mt-2 fw-semibold shadow-sm">
                <span className='plusIcon me-2'> ➕ </span>Add Todo
              </button>
            </div>
          </div>

          {/* Right Section - List */}
          <div className="col-md-8">
            <div className="bg-white p-4 rounded-4 shadow-sm overflow-auto" style={{ maxHeight: '600px' }}>
              <h4 className="text-secondary mb-4 border-bottom pb-2">📋 Todo List</h4>

              {
                todo.length === 0 ?
                  <h5
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    className='text-secondary ms-2'>Add Todo Here...</h5>
                  :
                  todo.map((data, index) => (
                    <div key={index}
                      className="myList d-flex justify-content-between align-items-start p-3 mb-3 border rounded-3 shadow-sm bg-light-subtle">
                      <div className=''>
                        <h5 className="text-dark mb-1">✅ {data.title} </h5>
                        <p className="text-muted small mb-0">
                          {data.description}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteItem(index)}
                        className="btn btn-sm btn-outline-danger ms-3"
                      >🗑️ Delete</button>
                    </div>
                  ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
