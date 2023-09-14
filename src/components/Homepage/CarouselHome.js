import { Paper } from '@mui/material'
import KidsParkImg from '../../assets/kids-park.jpg';
import KidsMuseumImg from '../../assets/kids-museum.jpg';
import KidsJumpImg from '../../assets/kids-jump.jpg';
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
}

export default CarouselHome;


