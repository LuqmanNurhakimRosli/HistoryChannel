import './Home.css'; // Import the Home.css file

function Home() {
  return (
    <section className=" w-full bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-wide">
          Welcome to OwlScribe
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
          Explore the world of <span className="font-semibold text-blue-800">OwlScribe</span>
        </p>
        <div className="mt-8">
          <a
            href="/blog"
            className="inline-block px-8 py-4 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-800 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Explore Blogs 🚀
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
