// import Carousel from 'react-bootstrap/Carousel';
// import CarouselImage from './CarouselImage';
import { Paper, Button } from '@mui/material'
import KidsParkImg from '../assets/kids-park.jpg';
import KidsMuseumImg from '../assets/kids-museum.jpg';
import KidsJumpImg from '../assets/kids-jump.jpg';
import Carousel from 'react-material-ui-carousel';


function CarouselHome() {
  var items = [
    {
        name: "Discover Parks",
        image: KidsParkImg
    },
    {
        name: "Museums",
        image: KidsMuseumImg
    },
    {
      name: "and so much more...",
      image: KidsJumpImg
    },
]

const Item = (props) =>
{
    return (
        <Paper>
          <div style={{backgroundImage:`url(${props.item.image})`, backgroundSize:'cover', backgroundPosition:'center', color:'white', padding:'150px 0', maxWidth:'500px'}}>
          <h2>{props.item.name}</h2>
          </div>
            {/* <h2>{props.item.name}</h2>
            <img src={props.item.image} alt="" style={{maxWidth:'600px', height:'300px'}} /> */}
            
            
        </Paper>
    )
}

return (
    <Carousel
      animation='slide'
      indicators={false}
    >
        {
            items.map( (item, i) => <Item key={i} item={item} /> )
        }
    </Carousel>
)



    // <Carousel>
    //   <Carousel.Item interval={3000}>
    //     <CarouselImage src={KidsParkImg} alt="Kids Park" />
    //     <Carousel.Caption>
    //       <h3>Discover Parks</h3>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={3000}>
    //     <CarouselImage src={KidsMuseumImg} alt="Kids Museum" />
    //     <Carousel.Caption>
    //       <h3>Museums</h3>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={3000}>
    //     <CarouselImage src={KidsJumpImg} alt="Kids Jump" />
    //     <Carousel.Caption>
    //       <h3>and so much more...</h3>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
}

export default CarouselHome;




