import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { useSelector } from 'react-redux';
import useAuth  from '../custom-hooks/useAuth.js';
import { db } from '../firebase.config';
import {collection, addDoc} from 'firebase/firestore'
import '../styles/checkout.css';
import { toast } from 'react-toastify';


const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state=>state.cart.cartItems)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const[formError, setFormError] = useState(false)


  const auth = useAuth(); // Get the authenticated user using the useAuth hook
  const renderTimeSlots = () => {
    const startTime = 10; // Starting hour (10 am)
    const endTime = 17; // Ending hour (5 pm)
    const slots = [];

    for (let hour = startTime; hour < endTime; hour++) {
        slots.push(
          <option key={`${hour}:00-${hour}:30`} value={`${hour}:00-${hour}:30`}>
            {`${hour}:00-${hour}:30`}
          </option>
        );
        slots.push(
          <option key={`${hour}:30-${hour + 1}:00`} value={`${hour}:30-${hour + 1}:00`}>
            {`${hour}:30-${hour + 1}:00`}
          </option>
        );
      }
  
      return slots;
    };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(
      name.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() ==='' ||
      streetAddress.trim() === '' ||
      city.trim() === '' || 
      postalCode.trim() === '' ||
      country.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' 
    ){
      setFormError(true);
      return;
    }

    try {
      // Check if the user is authenticated
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;

        const formattedCartItems = cartItems.map((item)=>({
         
          productName: item.productName,
          price: item.price,
        }))

        // Create a new document in the 'checkout' collection
        await addDoc(collection(db,'checkout'),{
          userId,
         
          name,
          email,
          phoneNumber,
          streetAddress,
          city,
          postalCode,
          country,
          date,
          time,
          totalQty,
          totalAmount,
          cartItems: formattedCartItems,
          
        });
        toast.success('Order placed successfully')
        // Redirect or display a success message
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      // Handle the error, such as displaying an error message
      toast.error('Failed to place the order!');
    }
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form' onSubmit={handleSubmit}>
                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='number' 
                    placeholder='Phone number' 
                    value={phoneNumber} 
                    onChange={e=> setPhoneNumber(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='Street address'
                    value={streetAddress}
                    onChange={e=>setStreetAddress(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='City'
                    value={city}
                    onChange={e=>setCity(e.target.value)}/>
                </FormGroup> 
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='Postal code'
                    value={postalCode}
                    onChange={e=>setPostalCode(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='Country'
                    value={country}
                    onChange={e=>setCountry(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                    <label htmlFor='date'>Date: </label>
                    <input 
                    type='date' 
                    id='date' 
                    name='date' 
                    placeholder='Select date'
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </FormGroup>
                <FormGroup className='form__group'>
                    <label htmlFor='time'>Time: </label><br/>
                    <select 
                    type='time' 
                    id='time' 
                    name='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}>
                        {renderTimeSlots()}
                    </select>
                </FormGroup>
                {formError && (
                  <p className='text-danger'>Please fill in all fields</p>
                )}
              </Form>
            </Col>
            <Col lg='4'>
              <div className='checkout__cart'>
              <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item py-2">
                      <div className='item-details'>
                      <h6>{item.productName}</h6>
                      <p>${item.price}</p>
                      </div>
                    </div>
                  ))}
              <h6>Total Qty: <span>{totalQty} items</span></h6>
                            <h6>Subtotal: <span>${totalAmount}</span></h6>
                            <h6>
                                <span>
                                    Shipping:<br/>
                                    free shipping
                                    </span> 
                                    <span>$0</span></h6>

                </div>      
                           
                            <h4>Total Cost: <span>${totalAmount}</span> </h4>
                            <button className='buy__btn auth__btn w-100' onClick={handleSubmit}>Place an order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};



export default Checkout;
