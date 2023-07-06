import React,{useRef,useEffect} from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import './Header.css';
import {motion} from 'framer-motion';
import logo from '../../assets/images/logo-black.png'
import userIcon from '../../assets/images/user-icon.png'
import { Link } from 'react-router-dom'

import { Container, Row } from 'reactstrap';
import {useSelector} from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {toast} from 'react-toastify';

const nav__links=[
    {
        path:'home',
        display:'Home'
    },
    {
        path:'service',
        display:'Service'
    },
    {
        path:'cart',
        display:'Cart'
    },

]

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state=>state.cart.totalQuantity);
    const profileActionRef = useRef(null);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const {currentUser} = useAuth()

    const stickyHeaderFunc = ()=>{
        window.addEventListener('scroll', ()=>{
            if(
                document.body.scrollTop > 80 || 
                document.documentElement.scrollTop >80
                ){
                headerRef.current.classList.add('sticky__header')
            }else{
                headerRef.current.classList.remove('sticky__header')
            }
        })
    };

    const Logout = ()=>{

        signOut(auth).then(()=>{

            toast.success('Logged out');
            navigate("/home");
            toggleProfileActions();
        }).catch(err =>{
            toast.error(err.message)
        })
    }
    useEffect(()=>{
        
        stickyHeaderFunc()

        return()=> window.removeEventListener('scroll', stickyHeaderFunc);
    });


    const menuToggle= () => menuRef.current.classList.toggle('active__menu');

    useEffect(()=>{
        const profileActionsDiv = profileActionRef.current;
        if(currentUser){
            profileActionsDiv.style.display='none'
        }

    },[currentUser]);
    const navigateToCart = ()=>{
            navigate('/cart');
    };

    const toggleProfileActions = ()=> 
    {
        const profileActionsDiv = profileActionRef.current;
        if(profileActionsDiv.style.display === 'none'){
            profileActionsDiv.style.display ='block';
        }else{
            profileActionsDiv.style.display =  'none'
        }
    }

   
  return <header className='header' ref={headerRef}>
  <Container>
    <Row>
        <div className='nav_wrapper'>
            <div className='logo'>
                
                <Link to="/home"><img src={logo}  alt='logo'/></Link>
                <div>
                    {/* <h1><Link to='/home'>Asap Services</Link></h1> */}
                    {/* <p>Since 2023</p> */}
                </div>
            </div>
            <div className='navigation' ref={menuRef} onClick={menuToggle}>
                <ul className='menu'>
                    {
                        nav__links.map((item,index)=>(
                            <li className='nav__item' key={index}>
                                <NavLink to={item.path} className={(navClasss)=>navClasss.isActive ? 'nav__active':''}>{item.display}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='nav__icons'>
                {/* <span className='fav__icon'>
                    <i className="ri-heart-line"></i>
                <span className='badge'>1</span>
                </span> */}
                <span className='cart__icon' onClick={navigateToCart}>
                    <i className="ri-shopping-bag-line"></i>
                <span className='badge'>{totalQuantity}</span>
                </span>
                <div className='profile'>
                    <motion.img whileTap={{scale: 1.2}} src={currentUser ? currentUser.photoURL :userIcon} alt='' onClick={toggleProfileActions}/>
                    
                    <div className='profile__actions' ref={profileActionRef}> 
                        {
                            currentUser ? (<span onClick={Logout}>Logout</span>) :( 
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <Link to = '/signup'>Signup</Link>
                                <Link to = '/login'>Login</Link>
                                <Link to='/dashboard'>Dashboard</Link>
                                </div> )
                         
                        }
                    </div>
                </div>
                
                <div className='mobile__menu'>
                <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
            </div>
            </div>
           
        </div>
    </Row>
  </Container>
  </header>
}

export default Header