import React, { useEffect } from 'react';
import Logo from '../asset/ASAS.gif'
import Google from '../asset/google.png'
import Bg from '../asset/bg.jpg'
import { motion } from 'framer-motion';
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {

    const { googleSignIn, user } = UserAuth()
    const navigate = useNavigate()

   //define a function to handle the Login button
   const handleSignIn = async () => {
    await googleSignIn()
}

// define useEffect to manage the user when he login
useEffect(() => {
    if (user != null) {
        navigate('/Home')
    }
}, [user])

  return (
        <motion.div className="flex w-screen h-screen justify-center items-center"
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
            hidden: {
                opacity: 0, x: -50,
            },
            visible: {
                opacity: 1, x: 0,
            }
        }} >
           <img className="w-screen h-screen fixed " src={Bg} alt='Asas' />
           <div className='flex w-4/6 justify-center bg-white mx-auto h-5/6 items-center rounded-3xl shadow-2xl content-center gap-10 opacity-95  '>
             <div className='flex items-center justify-center flex-col'>
                 <img className="w-[300px] h-[300px] " src={Logo} alt='Asas' />
                 <h1 className="flex text-3xl font-bold items-center content-center justify-center">Association of Sunmoon African Students</h1>
                 <button onClick={handleSignIn} className='flex items-center mt-10 bg-red-100 p-2 w-2/4 justify-center rounded-2xl gap-4'>
                 <img className="w-10 h-10 justify-between" src={Google} alt='Asas' />
                <h1 className="flex text-sm font-bold items-center content-center text-center">Login with Google</h1>
              </button>
             </div>
           </div>
        </motion.div>
    
  );
}

export default Login;
