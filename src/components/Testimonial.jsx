'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Shahzaib Saddique',
    role: 'Intermediate Student – Faisalabad',
    image: '/testimonial/shahzaibimg.jpg',
    message: 'This program feels like a personal guide. It showed me which subjects match my personality. I feel more confident and less worried about making a wrong choice.',
  },
  {
    name: 'Ali Raza',
    role: 'Student – Lahore',
    image: '/testimonial/user.jpg',
    message: 'Golden Future really opened my eyes. Before, I was confused about what to study after matric. Now I feel clear about my strengths and future career path. Highly recommended!',
  },
  {
    name: 'Fatima Mariam',
    role: 'Student – Faisalabad',
    image: '/testimonial/user.jpg',
    message: 'I used to feel lost about my future. Golden Future explained my strengths and careers in such simple words. It feels like a teacher who truly understands students.',
  },
  {
    name: 'Ayesha Khan',
    role: 'StudentParent – Islamabad',
    image: '/testimonial/user.jpg',
    message: 'As a mother, I always worried about my daughter’s future. Golden Future gave her direction with love and care. Now she is motivated and knows what she wants.',
  },
  {
    name: 'Hassam Shahryar',
    role: 'Intermediate Student – Faisalabad',
    image: '/testimonial/hassamimg.jpg',
    message: 'This is not just a test, it’s like a mirror. I discovered my talents and what success really means for me. Golden Future gave me hope and a plan.',
  },
];

const Testimonial = () => {
  return (
    <section className="bg-gray-100 py-14 md:px-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-4">What People Are Saying</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Hear from students and married who took the Aptitude Counsel test and discovered something new about themselves.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-[#14442E]">{item.name}</h3>
              <span className="text-sm text-gray-500 mb-3">{item.role}</span>
              <p className="text-sm text-gray-600 text-center">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
