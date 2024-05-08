import React from 'react'
import vote from '../assets/about/vote.jpg'
import vote2 from '../assets/about/vote2.jpg'
import vote3 from '../assets/about/vote3.jpg'
const About = () => {
  return (
    <div className='py-10 text-white bg-black'>
      <h1 className='text-center bg-gradient-to-r from-blue-700 to-red-600 text-transparent bg-clip-text font-bold text-[2rem]'> About us</h1>
      <div className='text-gray-400 text-[1.2rem] w-[75%] mx-auto py-10 md:p-5'>
    <p className='text-[1.6rem]'>Welcome to <span className=' font-semibold bg-gradient-to-r from-blue-700 to-red-600 text-transparent bg-clip-text'>Power Of Vote</span>!</p>  
{/* --------------------images------------------ */}
 <div className=' flex justify-between items-center flex-wrap py-5  '>
 <img src={vote2} className='hover:shadow-md hover:opacity-60   h-[18rem] w-[18rem] my-4   rounded-3xl' alt="vote" />
 <img src={vote} className=' hover:shadow-md hover:opacity-60  h-[18rem] w-[18rem] my-4 rounded-3xl' alt="vote" />

 <img src={vote3} className=' hover:shadow-md hover:opacity-60  h-[18rem] w-[18rem] my-4  rounded-3xl' alt="vote" />
 </div>
<p className=' font-semibold text-[1.6rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Empowering Democracy, One Click at a Time.</p>


<p className='py-2'>
At Power Of Vote , we believe in the power of every voice. Our platform is not just another voting tool; it's a digital arena where citizens like you become catalysts for change.

With a seamless interface and intuitive design, we've made it easier than ever for you to engage with your democracy. Whether you're casting your ballot for your local representative or voicing your opinion on critical issues, your vote matters here.
</p>
{/* ------------why choose us---------------- */}
<h2 className=' font-semibold text-[1.6rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Why Choose Power Of Vote</h2>
<div className='px-2 space-y-2 my-2'>
<p><span className=' font-semibold text-[1.2rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Empowerment:</span> Your opinion matters. With our platform, you have the power to influence decisions that impact your community and beyond.
</p>
<p><span className=' font-semibold text-[1.2rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Convenience:</span> Say goodbye to paper forms and time-consuming processes. Our user-friendly interface lets you vote quickly and easily, anytime, anywhere.

</p>
<p><span className=' font-semibold text-[1.2rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Transparency:</span> We believe in honesty and integrity. Rest assured that your responses are confidential and contribute directly to the insights that drive change.


</p>
<p><span className=' font-semibold text-[1.2rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Community:</span>  Join a diverse community of individuals passionate about shaping the world around them. Connect with like-minded people, share ideas, and inspire action together.



</p>

<p><span className=' font-semibold text-[1.2rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text'>Impact:</span> Your participation doesn't end at the ballot box. Track the outcomes of your votes and see firsthand the impact of your decisions on your community.



</p>
<p className='py-2'>
Join us in making your voice heard. Let's work together to create a future where everyone has a say in the decisions that affect their lives

</p>
</div>
      </div>
     
    
  </div>
  )
}

export default About
