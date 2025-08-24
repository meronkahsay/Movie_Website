import React from 'react'
import Button from '../Button'
import { FaInstagram } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'
import { FaSquareInstagram } from 'react-icons/fa6'
import { FaApple } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa6'

const Footer= () => {
  return (
    <div>
        <footer className='flex justify-around p-15'>
            <div>
                <h1 className='text-xl font-bold'>Download Our App</h1>
            <div className='text-xl font-bold flex items-center'>
                <img src="/image/popcorn.jpg" alt='Popcorn' className='w-10 mr-2'></img>
                M<span className='text-yellow-600'>oo</span>vie</div>
                <div className='flex gap-5 mt-8'>
<Button text="" onClick={()=>{}} variant='outlined' classname=' w-45 rounded-4xl text-xs flex gap-3 bg-gray-300 h-15 text-black'>
    <FaApple className='text-4xl'></FaApple> <div>Download on the <p className='text-xl'>App Store</p></div>
</Button>
<Button text="" onClick={()=>{}} variant='outlined' classname='w-45 rounded-4xl text-xs  flex gap-3 bg-gray-300 h-15 text-black'>
    <FaApple className='text-4xl'></FaApple> <div>Download on the <p className='text-xl'>App Store</p></div>
</Button>

</div>

            </div>
            <div>
                          
                <h1 className='text-xl font-bold'>Navigation</h1>
                <p>Home</p>
                <p>My list</p>
                <p>About Us</p>
            </div>
                        <div>
                          
                <h1 className='text-xl font-bold'>Legal</h1>
                <p>General Info</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
            </div>
                        <div>
                          
                <h1 className='text-xl font-bold'>Contact Us:</h1>
                <p>support@egymovies.com</p>
                <p>Tel: +201045963322</p>
                <p>OR By Using:</p>

                <FaFacebookF className='border p-1 rounded-2xl text-3xl inline mr-3'/>
                                <FaFacebookF className='border p-1 rounded-2xl text-3xl inline mr-3'/>
                                                <FaFacebookF className='border p-1 rounded-2xl text-3xl inline mr-3'/>

            </div>
                        <div>
                          
                <h1 className='text-xl font-bold'>Share Website Via:</h1>

               <div className='flex flex-col gap-4'>
                <div>
                <FaFacebookF className='border p-1 rounded-2xl text-3xl inline mr-3'/> Facebook
</div>
<div>
                <FaFacebookF className='border p-1 rounded-2xl text-3xl inline mr-3'/> Facebook
            </div>
              </div>
                
            </div>
          
        </footer>
        <div className='text-center'>
          <hr className='border-b-white w-300 ml-80 mb-4'></hr>
          <p> &copy; {new Date().getFullYear()} Movies.All Rights Reserved.</p>
          </div>
    </div>
  )
}

export default Footer