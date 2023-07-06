import React, {useState, useEffect} from 'react';

// import Clock from '../components/UI/Clock';

import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import products from '../assets/data/products';
import Helmet from "../components/Helmet/Helmet";
import '../styles/home.css';
import {Container, Row,Col} from "reactstrap"
import heroImg from '../assets/images/hero-img.png';
import Services  from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
// import counterImg from '../assets/images/counter-timer-img.png'

const Home = () => {
  const [trendingProducts, setTrendingProducts]= useState([]);
  const [bestSalesProducts,setBestSalesProducts]= useState([]);
  const [mobileProducts, setMobileProducts] = useState([])
  // const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([]);



  const year = new Date().getFullYear();
  useEffect(() => {
    const filteredTrendingProducts =products.filter(
      item=>item.category ==='Painting');

    const filteredBestSalesProducts =products.filter(
      item=>item.category ==='Electrical');

    const filteredMobileProducts =products.filter(
      item=>item.category ==='Plumbing');

    // const filteredWirelessProducts =products.filter(
    //   item=>item.category ==='wireless');

    const filteredPopularProducts = products.filter(
      (item) => item.category === 'Cleaning'
    )

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    // setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts)
    
    
  },[] );



  return (
    <Helmet title={"Home"}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                  <p className='hero__subtitle'>Trending Product in {year}</p>
                  <h2>Make Your Interior More Minimalistic & Modern</h2>
                  <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100&amp;hl=en&amp;q=work%20district%20jayanagar%204th%20block+(ASAP%20Services)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure acres/hectares on map</a></iframe>
                  <p>
                  
                  </p>
                  <motion.button whileTap={{scale: 1.2}} className='buy__btn'><Link to='/Service'>SHOP NOW</Link></motion.button>
              </div>
            </Col>
            {/* <Col lg="6" md="6">
              <div className='hero__img'>
                <img src={heroImg} alt="hero" />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>

     <Services/> 
     <section className='trending__products'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title p-3 '>Painting</h2>
          </Col>
          <Row lg='12' className='d-flex justify-content-center p-4'>
          <ProductsList data={trendingProducts}/>
          </Row>
        </Row>
      </Container>
     </section>
     <section className='best__sales'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title py-4'>Electrical</h2>
            </Col> 
            <Row lg='12' className='d-flex justify-content-center p-4'>
            <ProductsList data={bestSalesProducts}/>
            </Row>
        </Row>
      </Container>
     </section>
     {/* <section className='timer__count'>
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>
            <div className='clock__top-content'>
              <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
              <h3 className='text-white fs-5 mb-3 '>Quality Armchair</h3>
            </div>
            <Clock/>
            <motion.button whileTap={{scale:1.2}}className='buy__btn store__btn'><Link to='/shop'>Visit Store</Link></motion.button>
          </Col>
          <Col lg='6' md='12' className='text-end counter__img'>
            <img src={counterImg} alt=''/>
          </Col>
        </Row>
      </Container>

     </section> */}
     <section className='new__arrivals'>
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>Plumbing</h2>
          </Col>
          <Row lg='12' className='d-flex justify-content-center p-4'>
          <ProductsList data={mobileProducts}/>
          {/* <ProductsList data={wirelessProducts}/> */}
          </Row>
        </Row>
      </Container>
     </section>
     <sectiion className='popular__category'>
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-5 '> 
          <h2 className='section__title'>Cleaning</h2>  
          </Col>
          <Row lg='12' className='d-flex justify-content-center p-4'>
          <ProductsList  data={popularProducts}/>
          <div style={{ marginBottom: '100px' }}></div>
          </Row>
        </Row>
      </Container>
     </sectiion>
    </Helmet>
  )
}

export default Home