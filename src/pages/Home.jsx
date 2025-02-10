// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './Home.css';

function Home() {
  return (
    <section>
      <div className="home">
        <h1>Home</h1>
        <p>This is the Home page.</p>

        {/* Carousel Component */}
        {/* <Carousel>
          <div>
            <img src="https://via.placeholder.com/600x400?text=Slide+1" alt="Slide 1" />
            <p className="legend">Slide 1</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400?text=Slide+2" alt="Slide 2" />
            <p className="legend">Slide 2</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400?text=Slide+3" alt="Slide 3" />
            <p className="legend">Slide 3</p>
          </div>
        </Carousel> */}
      </div>
    </section>
  );
}

export default Home;