'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Ali Raza',
    role: 'Student',
    image: '/testimonial/student1.jpg',
    message: 'The MBTI test helped me understand my strengths in learning and communication. Highly recommended for students!',
  },
  {
    name: 'Ahmed',
    role: 'Married',
    image: '/testimonial/couple1.jpg',
    message: 'We took the MBTI test as a couple. It really helped us understand each other better and communicate more effectively.',
  },
  {
    name: 'Hina Khan',
    role: 'Student',
    image: '/testimonial/student2.jpg',
    message: 'I loved the results! It was like reading a book about myself. The animated video was fun too!',
  },
];

const Testimonial = () => {
  return (
    <section className="bg-gray-100 py-14 px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#14442E] mb-4">What People Are Saying</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Hear from students and married who took the MBTI test and discovered something new about themselves.
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
