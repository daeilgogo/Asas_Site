import React, { useEffect, useState } from 'react';
import Logo from '../asset/ASAS.gif'
import Google from '../asset/google.png'
import Bg from '../asset/bg.jpg'
import Logout from '../asset/logout.png'
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import D1 from '../asset/D1.jpg'
import { Members } from '../Components/members';
import { IoIosArrowBack,IoIosArrowForward,IoLogoFacebook  } from 'react-icons/io';
import { motion } from 'framer-motion';
import { CiFacebook,CiInstagram } from "react-icons/ci";


function Home() {

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
   const [services,setSercives]=useState(false)
   useEffect(()=>{
     setMember(Members)
   },[])



   ///// Slide Handle

   const [count,setCount]=useState(0)
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
    return setCount(0)
   }}
//// Bad de la page Redirection
   const redirectToInstagram = () => {
    window.location.href = 'https://www.instagram.com/a.s.a.s_korea/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==';
  };
  const redirectToFacebook=()=>{
    window.location.href='https://www.facebook.com/profile.php?id=100048997102853'
  }
/// Auto Slide
useEffect(()=>{
    const interval=setInterval(()=>{
        if(count<member.length-1){
            setCount(count+1);
        }else if((member.length-1)<=count)
        {
            setCount(0)
        }
     
    },3000);
    return () => {
        clearInterval(interval);
      };
},[count])
  return (
        <div className="flex-1 w-[100%] h-[100%]  justify-center items-center"
>
           <div className='flex w-full justify-center bg-white mx-auto items-center  shadow-2xl content-center gap-10 p-1 fixed  '>
             <div className='flex items-center justify-between w-[95%] '>
                 <img className="w-[100px] h-[100px] " src={Logo} alt='Asas' />
                 <h1 className="flex text-xl font-bold items-center content-center justify-center ">Association of Sunmoon African Students</h1>
                 <div className='flex gap-10 g-1 flex-1 ml-[10%]'>
                 <button onClick={()=>{window.location.reload('/home')}} className="flex text-xl font-bold items-center hover:text-green-700 content-center justify-center ">Home</button>
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
                onMouseLeave={()=>{setSercives(false)}}>
                <button  onClick={()=>{navigate('/borrow')}}  className='text-left  hover:text-green-700 '>Get Some finicial help</button>
                <button  onClick={()=>{navigate('/transaction')}}  className='text-left  hover:text-green-700'> Contribute for Asas</button>
               </motion.div>
              ):(<></>)
              }

           <img className="w-[100%]  mx-auto " src={Bg} alt='Asas' />
           <div className='mt-2 mb-10'>
                <div  className="flex  items-center content-center justify-center  flex-col ">
                     <h1 className='text-[50px] font-bold'>What is ASAS ?</h1>
                     <p className='w-5/6 text-center rounded-xl shadow-xl bg-gray-200 p-5'>
                        Asas est une Associationdes African de l'universite de Sunmoon elle a ete creer pour Soutenir
                         les Etudiant African de l'universite.
                         Elle A creer par les Etudiants en 2010 et continu d'exercer en faveur des Etudiants et aussi 
                         elle est une communaute qui participes a plusieur activites de
                          l'ecole pour promouvoir la culture afroicaine </p>
                </div>
            </div>
            <div className='mt-2 mb-[10%] w-full'>
                <div  className="flex p-5  flex-col  ">
                    <div className='flex items-center justify-between'>
                         <h1 className='text-[30px] font-bold'>Administrative Members</h1>
                         <div className='gap-10 flex p-3'>
                             <button>
                                <IoIosArrowBack size={40} onClick={SlideLeft} className='hover:text-blue-500'/>
                             </button>
                             <button> 
                                <IoIosArrowForward size={40} onClick={SlideRight} className='hover:text-blue-500'/>
                             </button>
                         </div> 

                    </div>
                    <div className='flex flex-1 items-center w-full'>

                     
                   

                        {
                            member[count]&&(
                        <motion.div className='bg-green-900 hover:bg-green-600 rounded-xl items-center p-2  flex gap-10 w-full text-white'
                             initial='hidden'
                             whileInView='visible'
                             viewport={{ once: true, amount: 0.5 }}
                             transition={{ duration: 0.5 }}
                             variants={{
                                hidden: { opacity: 0, x:-50},
                                visible: { opacity: 1, x: 0 }
                             }}>
                                <img className="w-[150px] h-[150px] rounded-full shadow-2xl" src={member[count].image} alt='Asas' />
                                <div className='w-full flex flex-col'>
                                  <h className='text-xl font-bold'>{member[count].name}</h>
                                  <p className='text-xl font-bold'>{member[count].place}</p>
                                  <h1 className='text-sm   text-decoration-line: none' style={{ whiteSpace: 'w', wordWrap: 'break-word' }}>
                                  {member[count].presentation}
                                  </h1>
                                </div>
                            </motion.div>

                            )
                        }                          
                    </div>
                </div>
            </div>
            <div className=' bg-green-200 w-full h-[200px] items-center  flex flex-col'>
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

export default Home;

