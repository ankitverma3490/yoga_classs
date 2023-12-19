import React,{ useState }   from 'react';
import './LoginSignup.css'
 
const LoginSignup = () => {
 
    const [age, setAge] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
    const validateAge = () => {
      const parsedAge = parseInt(age, 10);
      return !isNaN(parsedAge) && parsedAge >= 18 && parsedAge <= 65;
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      if (validateAge() && selectedBatch !== '') {
        setIsFormSubmitted(true);
      } else {
        alert('Sorry, you must be between 18 and 65 years old, and you need to select a valid batch.');
      }
    };
  
    const handleBatchChange = (e) => {
      setSelectedBatch(e.target.value);
    };



        const [userName, setUserName] = useState('');
        const [cardNumber, setCardNumber] = useState('');
        const [expiryDate, setExpiryDate] = useState('');
        const [cvv, setCvv] = useState('');

        const handleSubmit = async (e) => {
          e.preventDefault();
        
          try {
            const response = await fetch('http://localhost:5000/api/submitFormData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(),
            });
        
            if (response.ok) {
              console.log('Data successfully sent to the server.');
               
            } else {
              console.error('Failed to send data to the server.');
              
            }
          } catch (error) {
            console.error('Error:', error);
            
          }
        };
        
      
        const handlePayment = () => {
           
          if (userName && cardNumber && expiryDate && cvv) {
            
            completePayment({
              userName,
              cardNumber,
              expiryDate,
              cvv,
            });
          } else {
            alert('Please fill in all the required fields.');
          }
        };
      
        const completePayment = (paymentDetails) => {
           
          console.log('Payment completed for:', paymentDetails);
          alert('Payment completed successfully!');
        };
      
  
    return (
      <div>
        <h1>Yoga Class Admission Form</h1>
        {isFormSubmitted ? (
          <><p>Thank you for enrolling! Please pay the monthly fee of 500/- Rs INR.</p>

<div>
      <h1>Do your payment </h1>
      <form>
        <label htmlFor="userName">Name on Card:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />

        <button type="button" onClick={handlePayment}>
          Complete Payment
        </button>
      </form>
    </div>






          <div className="container">
          
          <div className="header">
                    <div className="text">After payment fill the form</div>
                    <div className="underline"></div>
                </div><form action="">
                        <div className="inputs">
                            <div className="input">

                                <input type="text" placeholder='Name' name='myName' />
                            </div>

                            <div className="input">

                                <input type="email" placeholder='Email' name='myEmail' />
                            </div>
                            <div className="input">

                                <input type="date" placeholder='Date of joining' name="Date" id="" />
                            </div>
                            <div className="input">
                                Male <input type="radio" name="myGender" id="" />   Female <input type="radio" name="myGender" id="" />   Other <input type="radio" name="myGender" id="" />

                            </div>
                            <div className="input">

                                <input type="text" placeholder='Enter your transaction number' name="transaction" />
                            </div>
                            <div id='btn'>
                                <input type="submit" value="Submit Now"  onClick={handleSubmit}/>

                            </div>

                        </div>
                        </form></div></>

        ) : (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="age">Enter your age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
  
            <label htmlFor="batch">Select your preferred batch:</label>
            <select
              id="batch"
              name="batch"
              value={selectedBatch}
              onChange={handleBatchChange}
              required
            >
              <option value="">Select Batch</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
  
            <button type="submit">Enroll</button>
          </form>
        )}
      </div>
    );
  };
export default LoginSignup;