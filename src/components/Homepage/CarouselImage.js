function CarouselImage({ src, alt }) {
    return <img src={src} alt={alt} style={{ objectFit: 'cover', height: '300px' }} />;
  }
  
  export default CarouselImage;