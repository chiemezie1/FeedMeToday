import offerForm from "./OfferForm.css"

import React, { useState } from 'react';

function OfferForm() {
  const [foodChoice, setFoodChoice] = useState('');
  const [amount, setAmount] = useState(0);
  const [massage, setMassage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform necessary actions with the input values
    // Example: makeOffer(foodChoice, amount, massage);
    console.log('Offer submitted:', foodChoice, amount, massage);
  };

  return (
    <div class="container_OfferForm">
  <form class="offer-form" onSubmit={handleSubmit}>
    <div class="form-row">
      <div class="form-group">
        <label for="foodChoice">Food Choice:</label>
        <input
          type="text"
          id="foodChoice"
          value={foodChoice}
          onChange={(event) => setFoodChoice(event.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="massage">Massage:</label>
        <input
          type="text"
          id="massage"
          value={massage}
          onChange={(event) => setMassage(event.target.value)}
        />
      </div>
      <div class="form-group">
        <button type="submit">Make Offer</button>
      </div>
    </div>
  </form>
</div>
  );
}

export default OfferForm;
