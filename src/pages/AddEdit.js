import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { ref, set, push, onValue } from "firebase/database";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch all contacts
  useEffect(() => {
    const contactsRef = ref(fireDb, "contacts");
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Set state if editing existing contact
  useEffect(() => {
    if (id && data[id]) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please provide value into each input field");
      return;
    }

    if (id) {
      // Update existing contact
      const contactRef = ref(fireDb, `contacts/${id}`);
      set(contactRef, state)
        .then(() => {
          toast.success("Contact Updated Successfully");
          navigate("/");
        })
        .catch((err) => toast.error(err.message));
    } else {
      // Add new contact
      const contactsRef = ref(fireDb, "contacts");
      push(contactsRef, state)
        .then(() => {
          toast.success("Contact Added Successfully");
          navigate("/");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div className="add-edit-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>
        </div>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name..."
                value={name || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email..."
                value={email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <div className="input-wrapper">
              <input
                type="number"
                id="contact"
                name="contact"
                placeholder="Your Contact No..."
                value={contact || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {id ? "Update Contact" : "Save Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "./AddEdit.css";
// import fireDb from "../firebase";
// import { ref, set, push, onValue } from "firebase/database";
// import { toast } from "react-toastify";

// const initialState = {
//   name: "",
//   email: "",
//   contact: "",
// };

// const AddEdit = () => {
//   const [state, setState] = useState(initialState);
//   const [data, setData] = useState({});

//   const { name, email, contact } = state;
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Fetch all contacts
//   useEffect(() => {
//     const contactsRef = ref(fireDb, "contacts");
//     const unsubscribe = onValue(contactsRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setData(snapshot.val());
//       } else {
//         setData({});
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Set state if editing existing contact
//   useEffect(() => {
//     if (id && data[id]) {
//       setState({ ...data[id] });
//     } else {
//       setState({ ...initialState });
//     }
//   }, [id, data]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !email || !contact) {
//       toast.error("Please provide value into each input field");
//       return;
//     }

//     if (id) {
//       // Update existing contact
//       const contactRef = ref(fireDb, `contacts/${id}`);
//       set(contactRef, state)
//         .then(() => {
//           toast.success("Contact Updated Successfully");
//           navigate("/");
//         })
//         .catch((err) => toast.error(err.message));
//     } else {
//       // Add new contact
//       const contactsRef = ref(fireDb, "contacts");
//       push(contactsRef, state)
//         .then(() => {
//           toast.success("Contact Added Successfully");
//           navigate("/");
//         })
//         .catch((err) => toast.error(err.message));
//     }
//   };

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <form
//         style={{
//           margin: "auto",
//           padding: "15px",
//           maxWidth: "400px",
//           alignContent: "center",
//         }}
//         onSubmit={handleSubmit}
//       >
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Your Name..."
//           value={name || ""}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="Your Email..."
//           value={email || ""}
//           onChange={handleInputChange}
//         />

//         <label htmlFor="contact">Contact</label>
//         <input
//           type="number"
//           id="contact"
//           name="contact"
//           placeholder="Your Contact No..."
//           value={contact || ""}
//           onChange={handleInputChange}
//         />

//         <input type="submit" value={id ? "Update" : "Save"} />
//       </form>
//     </div>
//   );
// };

// export default AddEdit;
