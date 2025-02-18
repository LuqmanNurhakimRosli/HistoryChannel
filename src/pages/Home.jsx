import "./Home.css"; // Import the Home.css file

function Home() {
  return (
    <section
      id="home"
      className="w-full bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center text-center"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-wide animate-fadeIn">
          Welcome to <span className="text-blue-800">OwlScribe</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-4 italic animate-slideUp">
          ✨ A place where <span className="font-semibold text-blue-800">your stories</span> come to life.
        </p>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 italic animate-slideUp delay-100">
          Start your journey by <span className="font-semibold text-blue-800">writing</span> or discovering amazing blogs from others! 🌍
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/blog"
            className="px-8 py-4 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-800 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce"
          >
            Explore Blogs 🚀
          </a>

          <a
            href="/dashboard/createblog"
            className="px-8 py-4 text-xl font-semibold text-white bg-green-600 hover:bg-green-800 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce delay-200"
          >
            Create a Blog ✍️
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
