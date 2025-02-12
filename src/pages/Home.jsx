import './Home.css'; // Import the Home.css file

function Home() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          WELCOME TO MY BLOG
        </h1>
        <p className="text-lg text-gray-600 mb-8">Only Blogs</p>
        <div className="mt-8">
          <a href="/blog" className="inline-block px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300">
            Explore Blogs
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;