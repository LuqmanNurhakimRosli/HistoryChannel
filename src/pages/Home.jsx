import "./Home.css"; // Import the Home.css file

function Home() {
  return (
    <section
      id="home"
      className="w-full h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center text-center overflow-hidden"
    >
      <div className="container mx-auto pt-3 pb-12 px-6 md:px-12 lg:px-24 sm:px-12 md:sm:pb-12 pt-3">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg tracking-wide animate-fadeIn">
          Welcome to <span className="text-yellow-400">OwlScribe</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-4 italic animate-slideUp">
          ✨ A place where <span className="font-semibold text-yellow-400">your stories</span> come to life.
        </p>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 italic animate-slideUp delay-100">
          Start your journey by <span className="font-semibold text-yellow-400">writing</span> or discovering amazing blogs from others! 🌍
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/blog"
            className="px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Blogs 🚀
          </a>

          <a
            href="/createblog"
            className="px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Create a Blog ✍️
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
