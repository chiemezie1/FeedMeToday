import React from 'react';
import frontpage  from "./FrontPage.css";

const FrontPage = () => {
  const paidMembers = [
    { name: 'John Doe', address: '123 Main St', message: 'Thank you for your support!' },
    { name: 'Jane Smith', address: '456 Elm St', message: 'We appreciate your contribution!' },
    { name: 'Bob Johnson', address: '789 Oak St', message: 'Your support means a lot to us!' }
  ];

 return (
    <div className="container_frontPage">
      <h1>Paid Friends</h1>
      <div className="row">
        {paidMembers.map((member, index) => (
          <div key={index} className="box">
            <h3>{member.name}</h3>
            <p>{member.address}</p>
            <p>{member.message}</p>
          </div>
        ))}
      </div>
      <ul className="image-list">
        <li><img src="favorite-meal.jpg" alt="Favorite Meal" /></li>
        <li><img src="favorite-meal.jpg" alt="Favorite Meal" /></li>
        <li><img src="favorite-meal.jpg" alt="Favorite Meal" /></li>
      </ul>
    </div>
  );
}

export default FrontPage;
