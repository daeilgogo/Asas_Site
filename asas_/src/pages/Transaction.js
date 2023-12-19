import React, { useEffect, useState,useRef } from 'react';
import Logo from '../asset/ASAS.gif'
import Logout from '../asset/logout.png'
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Members } from '../Components/members';
import { IoIosArrowBack,IoIosArrowForward,IoLogoFacebook, IoMdCheckbox, IoMdSend } from 'react-icons/io';
import { motion } from 'framer-motion';
import { CiFacebook,CiInstagram } from "react-icons/ci";
import Bg from '../asset/ASAS1.jpg'
import SM from '../asset/sunmoon.jpg'
import { Festival } from '../Components/Festival';
import {FaBox, FaRegHeart} from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import { Commentaire } from '../Components/Comment';
import { Performence } from '../Components/Performence';
import { Photo_Performence } from '../Components/Photo_performance';
import '../custum.css'
import {firebase} from '../config'

function Transaction() {

    const navigate= useNavigate()
    //initialize UserAuth

   const {logOut, user}=UserAuth()
  // Define a function to Handle the Logout Button
  
  const handleLogout= async()=>{
    try {
       await logOut(); 
    } catch (error) {
        console.log(error)
    }
}


   const [member,setMember]=useState([])
   const [comment,setComment]=useState([])
   const [perform,setPerform]=useState([])
   const [services,setSercives]=useState(false)
   const [Ph_perform,setPh_perform]=useState([])
   useEffect(()=>{
     setMember(Festival)
     setComment(Commentaire)
     setPerform(Performence)
     setPh_perform(Photo_Performence)
   },[])



   ///// Slide Handle

   const [count,setCount]=useState(0)
   const [countVideo,setCountVideo]=useState(0)

   const SlideLeftVideo=()=>{
    if(countVideo>0){
      setCountVideo(countVideo-1)
     
  }
   }

   const SlideRightVideo=()=>{
    if((Performence.length-1)>countVideo)
    {
    setCountVideo(countVideo+1)
    console.log(countVideo)
   }else{
    return
   }
   }
   const SlideLeft=()=>{
    // var slider=document.getElementById('slider')
    // slider.scrollLeft=slider.scrollLeft-1100
    if(count>0){
        setCount(count-1)
       
    }

   }
   const SlideRight=()=>{
    // var slider=document.getElementById('slider')
    // slider.scrollLeft=slider.scrollLeft+1100
    if((member.length-1)>count)
    {
    setCount(count+1)
    console.log(count)
   }else{
    return
   }}
//// Bad de la page Redirection
   const redirectToInstagram = () => {
    window.location.href = 'https://www.instagram.com/a.s.a.s_korea/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==';
  };
  const redirectToFacebook=()=>{
    window.location.href='https://www.facebook.com/profile.php?id=100048997102853'
  }
/// Auto Slide
// useEffect(()=>{
//     const interval=setInterval(()=>{
//         if(count<member.length-1){
//             setCount(count+1);
//         }else if((member.length-1)<=count)
//         {
//             setCount(0)
//         }
     
//     },3000);
//     return () => {
//         clearInterval(interval);
//       };
// },[count])
const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_scy61g5', 'template_f491es5', form.current, 'yZLJqlz0n9MDFktRD')
    .then((result) => {
        console.log(result.text);
        alert('message Sent!!')
        window.location.reload('/borrow')
    }, (error) => {
        console.log(error.text);
    });
};

//get info




  return (
    <div className="flex-1 w-[100%] h-[100%]  justify-center items-center"
    >
               <div className='flex w-full justify-center bg-white mx-auto items-center  shadow-2xl content-center gap-10 p-1 fixed top-0 '>
             <div className='flex items-center justify-between w-[95%] '>
                 <img className="w-[100px] h-[100px] " src={Logo} alt='Asas' />
                 <h1 className="flex text-xl font-bold items-center content-center justify-center ">Association of Sunmoon African Students</h1>
                 <div className='flex gap-10 g-1 flex-1 ml-[10%]'>
                 <button onClick={()=>{navigate('/home')}} className="flex text-xl font-bold items-center hover:text-green-700 content-center justify-center ">Home</button>
                    <button onClick={()=>{navigate('/activities')}} className="flex text-xl font-bold items-center hover:text-green-700 content-center justify-center ">Activities</button>
                    <button onMouseEnter={()=>{setSercives(true)}}
                    onMouseLeave={()=>{setSercives(false)}} 
                    
                   className={`flex text-xl font-bold items-center content-center justify-center hover:text-green-700`}>Services</button>
                    {/* <button className="flex text-xl font-bold items-center content-center justify-center  hover:text-green-700">Bureau</button> */}
                    {/* <button className="flex text-xl font-bold items-center content-center justify-center  hover:text-green-700">Annonces</button> */}
                 </div>
                 <button onClick={handleLogout} className='flex items-center  bg-green-100 p-1 w-[200px]  justify-center rounded-2xl gap-4'>
                 <img className="w-10 h-10 justify-between" src={Logout} alt='Asas' />
                <h1 className="flex text-sm font-bold items-center content-center text-center">Log out</h1>
              </button>
             </div>
           </div>
              {
                services===true? 
              ( <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                   hidden: { opacity: 0, y:-5},
                   visible: { opacity: 1, y: 0 }
                }} className='w-[200px] flex flex-col bg-white fixed    top-[65px] p-4 left-[58%] gap-2 font-bold '
                onMouseEnter={()=>{setSercives(true)}}
                onMouseLeave={()=>{setSercives(false)}} >
                <button onClick={()=>{navigate('/borrow')}}  className='text-left  hover:text-green-700 mt-10 '>Get Some finicial help</button>
                <button onClick={()=>{window.location.reload('/transaction')}}  className='text-left  hover:text-green-700'> Contribute for Asas</button>
               </motion.div>
              ):(<></>)
              }
              <div className='flex  flex-col mt-[150px] p-5 items-center '>
                <h className='text-xl font-bold '>Donation to ASAS</h>
                <div>
                    <p></p>
                </div>
              </div>


              <div className=' bg-green-200 w-full h-[200px] items-center  flex flex-col mt-[100px]'>
                 <div className='gap-10 flex p-3 mt-5'>
                       <button>
                         <CiFacebook size={40} onClick={redirectToFacebook}  className='hover:text-blue-500'/>
                       </button>
                       <button  onClick={redirectToInstagram}> 
                         <CiInstagram size={40}  className='hover:text-blue-500'/>
                      </button>
                  </div>
                  <div>
                  <p className='w-full text-center rounded-xl shadow-xl  p-1'>
                 You check Our profil in Facebook or Instagram
                </p>
                  </div>
            </div>

          
        </div>
    
  );
}

export default Transaction;

