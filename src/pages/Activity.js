import React, { useEffect, useState,useRef } from 'react';
import Logo from '../asset/ASAS.gif'
import Logout from '../asset/logout.png'
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Members } from '../Components/members';
import { IoIosArrowBack,IoIosArrowForward,IoLogoFacebook, IoMdSend } from 'react-icons/io';
import { motion, AnimatePresence} from 'framer-motion';
import { CiFacebook,CiInstagram } from "react-icons/ci";
import Bg from '../asset/ASAS1.jpg'
import SM from '../asset/sunmoon.jpg'
import { Festival } from '../Components/Festival';
import {FaDeleteLeft, FaRegHeart} from "react-icons/fa6";

import { Commentaire } from '../Components/Comment';
import Chant from '../asset/chant.png'
// import { Performence } from '../Components/Performence';
import { Photo_Performence } from '../Components/Photo_performance';
import '../custum.css'
import {firebase} from '../config';
import { data } from 'autoprefixer';
import { Player } from 'video-react';
import { wrap } from 'framer-motion';

/////



const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

//////
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};




function Activity() {

    const navigate= useNavigate()
    const [[page, direction], setPage] = useState([0, 0]);


    const imageIndex = wrap(0, Members.length, page);

    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
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
   const [commenter,setCommenter]=useState('')
   useEffect(()=>{
     setMember(Festival)
     setComment(Commentaire)
    //  setPerform(Performence)
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

  //  const SlideRightVideo=()=>{
  //   if((Performence.length-1)>countVideo)
  //   {
  //   setCountVideo(countVideo+1)
  //   console.log(countVideo)
  //  }else{
  //   return
  //  }
  //  }
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

//create a comment
const WriteComment = async () => {
  const db = firebase.firestore();
  try {
    // Add a new document with a generated ID
    const docRef = await db.collection('Post').add({
      image: user.photoURL,
      Comments: commenter,
      timeStamp: new Date(),
      
    });

    // Retrieve the generated document ID
    const generatedId = docRef.id;

    // Update the document with the generated ID
    await db.collection('Post').doc(generatedId).update({
      id: generatedId,
    });

    setCommenter('');
    console.log('Comment added successfully!');
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};

/// GEt comment from Db 
const [getComment,setGetComment]=useState([])
useEffect(() => {
  const unsubscribe = firebase.firestore()
    .collection('Post')
    .orderBy('timeStamp', 'desc') // replace 'timestamp' with the actual timestamp field in your documents
    .onSnapshot((querySnapshot) => {
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setGetComment(data);
      }
    });

  return () => unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
}, []);


//Delete Comments
const DeleteComments = async (documentId) => {
  const db = firebase.firestore();
  try {
    await db.collection('Post').doc(documentId).delete();
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

// Usage example
// Replace 'yourDocumentId' with the actual ID of the document you want to delete
const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

const handleEmojiClick = (emoji) => {
  setCommenter((prevCommenter) => prevCommenter + emoji);
};

const emojis = ['❤️', '😊', '👍', '🎉', '😍']; // Add more emojis as needed

////arrondir les nombres de commentaires
const formatCommentCount = (count) => {
  if (count > 100000) {
    return `${(count / 1000).toFixed(1)}k Comments`;
  } else {
    return `${count} Comments`;
  }
};
///Get videos from firebase
const [video,setVideos]=useState([])
useEffect(()=>{
  const videos = firebase.firestore()
  .collection('video')
  .onSnapshot((querySnapshot) => {
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setVideos(data);
    }
  });

return () => videos(); // Unsubscribe from the snapshot listener when the component unmounts

},[])

  return (
    <div className="flex-1 w-[100%] h-[100%]  justify-center items-center"
    >
               <div className='flex w-full justify-center bg-white mx-auto items-center  shadow-2xl content-center gap-10 p-1 fixed top-0 '>
             <div className='flex items-center justify-between w-[95%] '>
                 <img className="w-[100px] h-[100px] " src={Logo} alt='Asas' />
                 <h1 className="flex text-xl font-bold items-center content-center justify-center ">Association of Sunmoon African Students</h1>
                 <div className='flex gap-10 g-1 flex-1 ml-[10%]'>
                 <button onClick={()=>{navigate('/home')}} className="flex text-xl font-bold items-center hover:text-green-700 content-center justify-center ">Home</button>
                    <button onClick={()=>{window.location.reload('/activities')}} className="flex text-xl font-bold items-center hover:text-green-700 content-center justify-center ">Activities</button>
                    <button 
                                    onMouseEnter={()=>{setSercives(true)}}
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
                  
                }} 
           
                className='w-[200px] flex flex-col bg-white fixed    top-[65px] p-4 left-[58%] gap-2 font-bold ' 
                onMouseEnter={()=>{setSercives(true)}}
                onMouseLeave={()=>{setSercives(false)}} >
                <button className='text-left  hover:text-green-700  ' onClick={()=>{navigate('/borrow')}}>Get Some finicial help</button>
                <button className='text-left  hover:text-green-700'  onClick={()=>{navigate('/transaction')}} > Contribute for Asas</button>
               </motion.div>
              ):(<></>)
              }

           <img className="w-[95%] mt-[100px] rounded-3xl shadow-2xl mx-auto " src={Bg} alt='Asas' />
           <div className=" w-full">
                <div  className="flex  items-center content-center justify-center  flex-col ">
                     <h1 className='text-[50px] font-bold'>Activities </h1>
                     <p className='w-5/6 text-center rounded-xl shadow-xl bg-gray-200 p-5'>
                        Asas est une Associationdes African de l'universite de Sunmoon elle a ete creer pour Soutenir
                         les Etudiant African de l'universite.
                         Elle A creer par les Etudiants en 2010 et continu d'exercer en faveur des Etudiants et aussi 
                         elle est une communaute qui participes a plusieur activites de
                          l'ecole pour promouvoir la culture afroicaine
                      </p>
                </div>
            </div>
            <div className='mt-2  w-full'>
                <div  className="flex p-5  flex-col  ">
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-5 items-center mb-5'>
                            <img className="w-[50px] h-[50px] rounded-full shadow-2xl" src={SM} alt='Asas' /> 
                            <h1 className='text-[30px] font-bold'>Sunmoon Festival</h1>
                        </div>
                        
                         <div className='gap-10 flex p-3'>


                         </div> 

                    </div>
                    <iframe width="853" height="480" src="https://www.youtube.com/embed/LFTPGG8xt9s" title="Spring festival at my Korean University | Sunmoon University | (Haedal-Land)" frameborder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                     className='mx-auto w-5/6 mb-10 rounded-3xl shadow-xl'></iframe>
            
                  
                      
                     <div className='justify-center items-center flex flex-col bg-gray-50 rounded-3xl shadow-xl p-10'>
                     {
                            member[count]&&(
                        <motion.div className=' items-center justify-center flex  w-full '
                             initial='hidden'
                             whileInView='visible'
                             viewport={{ once: true, amount: 0.5 }}
                             transition={{ duration: 0.5 }}
                             variants={{
                                hidden: { opacity: 0, x:-50},
                                visible: { opacity: 1, x: 0 }
                             }}>
                              <button>
                                   <IoIosArrowBack size={40} onClick={SlideLeft} className='hover:text-blue-500'/>
                              </button>
                                <img className=" rounded-xl w-[60%]  h-[550px] " src={member[count].image} alt='Asas' />
                                <button> 
                                   <IoIosArrowForward size={40} onClick={SlideRight} className='hover:text-blue-500'/>
                               </button>
                            </motion.div>
                          )
                        }     
                        <div className='w-5/6 items-center p-2 mt-5 mx-auto flex justify-center gap-5'>
                      
                                <div className='emoji-picker bg-red-100 p-2 rounded-full'>
                                  {emojis.map((emoji) => (
                                    <button key={emoji} onClick={() => handleEmojiClick(emoji)}>
                                   {emoji}
                                     </button>
                                  ))}
  
                                </div>
  
                           <input value={commenter} onChange={(e)=>setCommenter(e.target.value)} placeholder='Write your Comment here ...' className='flex-1 p-3 rounded-2xl bg-gray-200 hover:bg-white border-hidden custom-textarea'/>
                           <button onClick={()=>{WriteComment()}}><IoMdSend size={30}/></button>  
                        </div>
                        <div className='w-5/6 text-sm'>
                           <h>{formatCommentCount(getComment.length)}</h>
                        </div> 
                       <div className='w-5/6 h-[200px] gap-2 flex-col flex p-2 overflow-y-scroll  bg-gray-300 rounded-2xl'>
                        {
                          getComment?.map((items,idx)=>(
                          <div key={idx} className='bg-gray-200 hover:bg-gray-100 rounded-xl items-center p-2  flex gap-5 w-full '
                            >
                               <img className="w-[30px] h-[30px] rounded-full shadow-2xl" src={items.image} alt='Asas' />
                               <div className='w-full flex flex-col'>
                                 <p className='text-sm '>{items.Comments}</p>
                               </div>

                               {
                                user.photoURL===items.image && (
                                  <button onClick={()=>DeleteComments(items.id)}>
                                    <FaDeleteLeft/>
                                 </button>

                                )
                               }

                              
                           </div>
                          ))
                        }           
                        </div>
                        
                     </div>
                </div>

            </div>
            <div className='mt-2 mb-[10%] w-full'>
                <div  className="flex p-5  flex-col  ">
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-5 items-center mb-5'>
                            <img className="w-[50px] h-[50px] rounded-full shadow-2xl" src={Chant} alt='Asas' /> 
                            <h1 className='text-[30px] font-bold'>Performence</h1>
                        </div>
                    </div>
                    {/* {
                            perform[countVideo]&&(
                        <div className=' items-center justify-center flex  w-full '
                          >
                              <button>
                                   <IoIosArrowBack size={40} onClick={SlideLeftVideo} className='hover:text-blue-500'/>
                              </button>
                              <video
                              controls
                              className='rounded-xl'
                              
                               src={perform[countVideo].image} width="1300" height="550"/>
                                <button> 
                                   <IoIosArrowForward size={40} onClick={SlideRightVideo} className='hover:text-blue-500'/>
                               </button>
                            </div>
                          )
                        }    */}
                        {/* {
                          video.map((idx,itms)=>(
                            <video controls src={idx.source}  width="1300" height="550"/>
                          ))
                        } */}


                     <div className='justify-between items-center mt-20 flex bg-gray-50 rounded-3xl shadow-xl p-5 gap-10 overflow-x-scroll w-5/6 mx-auto'>
                      <div className='p-1 text-xl font-bold gap-2 flex flex-col'>
                        <h>Volontary Activities</h>                     
                        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0ef8LDLZtMyr5TP1EtJhRZ4EZVnQ6URSD5z4A65XfUxV4JvvBvfeezraW5WaywVX3l%26id%3D100048997102853&show_text=true&width=500"  className="border-none; overflow-hidden w-[100%] h-[800px]" allowfullscreen="true" allow=" clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                      </div>
                      <div  className='p-1 text-xl font-bold gap-2 flex flex-col'>
                        <h>Welcoming New Students</h>  
                        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02deopKte5BZtCJoqea7oRGv1nucWLu7BZWnxZTgLcQBUtVaQYtaz3RBRbKSRgFiDzl%26id%3D100048997102853&show_text=true&width=500" className="border-none; overflow-hidden w-full h-[800px]" scrolling="no" frameborder="0" allowfullscreen="true" allow=" clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                      </div>
                      <div  className='p-1 text-xl font-bold gap-2 flex flex-col'>
                        <h>Orientation with Seniors</h>  
                      <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0KseTvHh77BnMWdhLtLQGjbribfjqfRsrWPkJQdWaiYBM6A1N7FLPVEnDj1NHKrg2l%26id%3D970221069816549&show_text=true&width=500" className="border-none; overflow-hidden w-full h-[800px]" scrolling="no" frameborder="0" allowfullscreen="true" allow=" clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                      </div>
                      <div  className='p-1 text-xl font-bold gap-2 flex flex-col'>
                        <h>Seniors Graduations</h>  
                        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02tE6PoJeavUvtZAHXQRKtggcmirVUBA7qH8zVsDw1YAkNyRPTtVjeXL43CHzeKvZTl%26id%3D970221069816549&show_text=true&width=500" className="border-none; overflow-hidden w-full h-[800px]" scrolling="no" frameborder="0" allowfullscreen="true" allow="clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                      </div>
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

export default Activity;

