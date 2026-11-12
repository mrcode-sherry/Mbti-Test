import ContactForm from '@/components/ContactForm'
import WhatsAppButton from '@/components/WhatsAppButton'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-hidden'>
      <ContactForm/>
      <WhatsAppButton/>
    </div>
  )
}

export default page
