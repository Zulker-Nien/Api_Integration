import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Profile() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [prof, setProf] = useState("");
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function ProfileEdit(e) {
    e.preventDefault();
    let item = { fname, lname, prof, email, password };
    console.log(item);
    console.log(user.id);
    let result = await fetch(`http://localhost:3000/signup/${user.id}`, {
    
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("./");
  }
 async function handleDelete(){
    localStorage.removeItem("user-info");
    let result = await fetch(`http://localhost:3000/signup/${user.id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    });
    history.push("./");
  }

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      setUser(JSON.parse(localStorage.getItem("user-info")));
    }
  }, []);

  return (
    <div className="max-w-sm mx-auto item-center">
      <div style={{
            backgroundColor: "blue",
            color: "white",
            width: "10vw",
            height: "5vh",
            display:"flex",
            position:"absolute",
            top:"10px",
            left:"10px",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:"30px"
          }}>
        <Link
          style={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}
          to="/"
        >
          GO BACK
        </Link>
      </div>
      <form style={{marginTop:"200px"}}onSubmit={ProfileEdit}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="name"
            >
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={user.fname}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input w-full text-gray-800"
            
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="name"
            >
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={user.lname}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input w-full text-gray-800"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="name"
            >
              Profession <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={user.prof}
              onChange={(e) => setProf(e.target.value)}
              className="form-input w-full text-gray-800"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full text-gray-800"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full text-gray-800"
              placeholder="Update your password"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
              Update Info
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap -mx-3 mt-6">
          <div onClick={handleDelete}className="w-full px-3">
            <button className="btn text-white bg-red-900 hover:bg-red-700 w-full">
              Delete Account
            </button>
          </div>
        </div>
    </div>
  );
}

export default Profile;
