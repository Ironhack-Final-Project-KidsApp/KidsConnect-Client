import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';

import KidsParkImg from '../assets/kids-park.jpg';
import KidsMuseumImg from '../assets/kids-museum.jpg';
import KidsJumpImg from '../assets/kids-jump.jpg';

function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <CarouselImage src={KidsParkImg} alt="Kids Park" />
        <Carousel.Caption>
          <h3>Discover Parks</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <CarouselImage src={KidsMuseumImg} alt="Kids Museum" />
        <Carousel.Caption>
          <h3>Museums</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <CarouselImage src={KidsJumpImg} alt="Kids Jump" />
        <Carousel.Caption>
          <h3>and so much more...</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;




