'use client';
import Link from 'next/link';
import Image from 'next/image';
import happyStudents from '../assets/happyStudents.jpeg'
/*
const Welcome = () => { 
    
    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="w-[779.794px] text-[82px] leading-[96px] font-bold text-[#2E2F35] font-[Inter]">Notes by STUDENTS, for STUDENTS</h1>
        <div className="mt-12">
            <Link
                     href="/show-items"
                     className="inline-block px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition rounded"
          >
                     Show Item List
        </Link>
        </div>
        </div>
    </div>
    )};
export default Welcome;
*/

const Welcome = () => {
    return (
      <div className="bg-[#e6f7f4] text-[#2E2F35] font-[Inter]">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-[1200px] w-full">
            {/* Text Section */}
            <div className="text-left">
              <h1 className="text-[82px] leading-[96px] font-bold max-w-[780px]">
                Notes by{' '}
                <span className="text-[#009387] font-['Covered_By_Your_Grace'] font-normal">
                  STUDENTS
                </span>
                , for{' '}
                <span className="text-[#009387] font-['Covered_By_Your_Grace'] font-normal">
                  STUDENTS
                </span>
              </h1>
              <p className="mt-6 text-xl">The study hub you’ve been looking for.</p>
              <div className="mt-8 flex items-center gap-6">
                <Link
                  href="/show-items"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition"
                >
                  View Notes
                </Link>
                <div className="text-sm text-gray-600 text-center">
                  ⭐️⭐️⭐️⭐️⭐️
                  <br />
                  Student Rating
                </div>
              </div>
            </div>
  
            {/* Image Section */}
            <div>
            <Image
                src= {happyStudents} // update this path based on your file
                alt="Happy Students"
                width={400}
                height={500}
                className="rounded-[40px] object-cover"
              />
            </div>
          </div>
        </section>
  
        {/* Trusted Section */}
        <section className="text-center py-20 px-6 bg-white">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Trusted by thousands <br />
            of{' '}
            <span className="text-[#009387] font-['Covered_By_Your_Grace'] font-normal">
              students
            </span>{' '}
            across the world.
          </h2>
          <div className="flex justify-center items-center gap-12 mt-12 flex-wrap">
            
          </div>
        </section>
  
        {/* How it Works */}
        <section className="py-20 px-6 bg-[#e6f7f4] text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Share Fast. Learn Faster.
          </h2>
          <p className="text-[#009387] font-['Covered_By_Your_Grace'] text-2xl mt-2">Here's how.</p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto text-left">
            {[
              { num: '01', title: 'Capture' },
              { num: '02', title: 'Contribute' },
              { num: '03', title: 'Explore' },
              { num: '04', title: 'Excel' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-6">
                <div className="text-[#009387] text-xl font-semibold">{step.num}</div>
                <div className="text-xl font-semibold">{step.title}</div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-black text-white text-sm flex justify-between items-center px-6 py-4">
          <span>© 2025 ClassClips, Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
              Create Account
            </Link>
          </div>
        </footer>
      </div>
    );
  };
  export default Welcome;
