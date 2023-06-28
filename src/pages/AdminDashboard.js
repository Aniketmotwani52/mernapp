import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmails(data);
        } else {
          console.error("Failed to fetch emails. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>Emails:</h2>
      <ul className="text-white">
        {emails.map((email, index) => (
          <div>
          <Link key={index} onClick={() => {localStorage.setItem("userEmail", email);}} to="/myOrder"> {email} </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
