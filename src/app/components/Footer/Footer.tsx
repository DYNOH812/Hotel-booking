import Link from 'next/link'
import React from 'react'
import {BsFillSendFill, BsTelephoneOutbound} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";

const Footer = () => {
  return (
    <footer className='mt-16 '>
        <div className='container mx-auto px-4 '>
            <Link href="/" className='font-black text-tertiary-dark'>
                Hotelzz
            </Link>

            <h4 className='font-semibold text-[40px] py-6'>Contacts</h4>

            <div className='flex flex-wrap gap-16 items-center justify-between '>
                <div className='flex-1'>
                <p> Langata </p>
                <div className='flex items-center py-4 '>
                    <BsFillSendFill/>
                    <p className="ml-2">Code with Dynoh</p>
                </div>
                <div className='flex items-center '>
                    <BsTelephoneOutbound/>
                    <p className="ml-2">+254718698623</p>
                </div>
                <div className='flex items-center pt-4 '>
                    <BiMessageDetail/>
                    <p className="ml-2">Code with Dynoh</p>
                </div>
            </div>
            <div className="flex-1 md:text-right">
                <p className="pb-4">Our story</p>
                <p className="pb-4">Get In Touch</p>
                <p className="pb-4">Our privacy Commitment</p>
                <p className="pb-4">Terms of service</p>
                <p className="pb-4">Get In Touch</p>
                <p>Customer Assistance</p>
            </div>
            <div className="flex-1 md:text-right">
                <p className='pb-4'> Dinning Experience</p>
                <p className='pb-4'> Wellness</p>
                <p className='pb-4'> Fitness</p>
                <p className='pb-4'> sports</p>
                <p> Events</p>
            </div>
        </div>
        </div>
        
        <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0 '/>
    </footer>
  )
}

export default Footer