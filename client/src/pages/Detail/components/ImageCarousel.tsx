import { ImageCarouselContainer, ItemImageBox } from '../style';
import Slider from 'react-slick';

const ImageCarousel = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    pauseOnHover: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000, // 넘어가는 속도
    slidesToShow: 1, // 1장씩 보이게
    slidesToScroll: 1, //한장씩 뒤로 넘어가게
    centerMode: true,
    centerPadding: '0px', // 0px 하면 슬라이드 사이에 여백이 없어짐
  };
  console.log(images);
  console.log(images.reverse());
  //const reversedArray = array.map((_, index, arr) => arr[arr.length - 1 - index]);
  return (
    <ImageCarouselContainer>
      <div>
        <Slider {...settings}>
          {images.map((_, index, image) => {
            return (
              <ItemImageBox key={index}>
                <img src={image[image.length - 1 - index]} />
              </ItemImageBox>
            );
          })}
        </Slider>
      </div>
    </ImageCarouselContainer>
  );
};

export default ImageCarousel;
