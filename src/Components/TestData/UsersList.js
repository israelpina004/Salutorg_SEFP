import React, { useEffect, useState } from "react";

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data); // Add this line to log the data
            setUsers(data);
          })
          .catch((error) => console.error("Error fetching users:", error));
      }, []);
      

    return (
        <div>
            <h1>Users List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Seller ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Rating</th>
                        <th>Registration Date</th>
                        <th>Contact Info</th>
                        <th>VIP Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_ID}>
                            <td>{user.user_ID}</td>
                            <td>{user.seller_ID}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.rating}</td>
                            <td>{user.registration_date}</td>
                            <td>{user.contact_info}</td>
                            <td>{user.VIP_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
