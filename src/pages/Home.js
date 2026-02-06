import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contactsRef = ref(fireDb, "contacts");

    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const contactRef = ref(fireDb, `contacts/${id}`);
        await remove(contactRef);
        toast.success("Contact deleted successfully");
      } catch (error) {
        toast.error("Error deleting contact: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  const isEmpty = Object.keys(data).length === 0;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Contact Manager</h1>
        <p>Manage all your contacts in one place. Add, edit, view, or delete contact details with ease.</p>
      </div>

      <div className="table-container">
        {isEmpty ? (
          <div className="empty-state">
            <h3>No Contacts Found</h3>
            <p>You haven't added any contacts yet. Start by adding your first contact!</p>
            <Link to="/add" className="btn-add-contact">
              Add First Contact
            </Link>
          </div>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id, index) => (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home; 