import Slider from "react-slick";

interface IProps {
  children: React.ReactNode;
}

function Carsoul({ children }: IProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default Carsoul;
