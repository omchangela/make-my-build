import { useEffect, useState } from "react";

const Hero = () => {
  const images = [
    "/images/hero-4.png",
    "/images/hero-4.png",
    "/images/hero-4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="relative z-0 flex-wrap min-h-screen gap-2 md:-mt-10 flex-center-center"
      style={{
        background: "url('/images/hero-bg-pattern.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="absolute top-0 right-0 rounded-full bg-[#04a7ff]/30 dark:bg-[#04a7ff]/50 w-72 h-72 -z-10 blur-[120px]"></div>

      <div className="flex-1 basis-[20rem]">
        <h1 className="text-4xl font-bold capitalize md:text-5xl">
          property consisting <br /> land and buildings
        </h1>
        <div className="pl-3 mt-5 border-l-4 border-primary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic nulla
            unde exercitationem! Recusandae error quaerat sapiente quibusdam
            culpa magni eius?
          </p>
        </div>
        <button className="mt-6 btn btn-primary">get started</button>
        <div className="mt-6 text-center flex-align-center gap-x-6">
          <div>
            <h1 className="text-2xl font-bold">
              12k <span className="text-sm text-primary">+</span>
            </h1>
            <p>Requested Projects</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              15k <span className="text-sm text-primary">+</span>
            </h1>
            <p>Projects Completed</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              100 <span className="text-sm text-primary">+</span>
            </h1>
            <p>Served Clients</p>
          </div>
        </div>
      </div>

      <div className="flex-1 basis-[20rem] relative">
        {/* Image Slider */}
        <div className="relative h-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto" // Ensure the width is full and height auto
              />
            ))}
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={prevSlide}
          >
            &#10094; {/* Left Arrow */}
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={nextSlide}
          >
            &#10095; {/* Right Arrow */}
          </button>
        </div>
      </div>

      {/* Popup Form */}
{showPopup && (
  <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-[rgb(255,100,0)] p-6 rounded shadow-lg w-96 relative">
      {/* Close Icon */}
      <button 
        onClick={closePopup} 
        className="absolute top-4  right-4 text-white text-2xl"
      >
        &times; {/* Close Icon */}
      </button>
      <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Hero;
