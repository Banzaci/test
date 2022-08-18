import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getById } from '../assets/salons';
import Ratings from '../components/Ratings';
import addressIcon from '../assets/1x/icn_address.png';
import phoneIcon from '../assets/1x/icn_phone.png';
import wwwIcon from '../assets/1x/icn_website.png';
import clockIcon from '../assets/1x/icn_hours.png';
import downArrowIcon from '../assets/1x/icn_chevron_down.png';
import likeIcon from '../assets/1x/icn_heart.png';
import backIcon from '../assets/1x/icn_chevron_left_white.png';

const InfoRow = ({icon, text, nextIcon}: {icon: string, text:string, nextIcon?: string}) => {
  return (
    <Row>
      <Icon><img src={icon} /></Icon>
      <Text>{text}</Text>
      {nextIcon && <Icon margin><img src={nextIcon} /></Icon>}
    </Row>
  )
}
const Salon = () => {
  const params = useParams();
  const salon = getById(Number(params.id))
  if (!salon) return null;
  const { name, ratings, address, phone, website, description, openingHrs, votes } = salon;
  const { street, streetNumber, zip, city } = address;

  return (
    <Container>
      <ImageContainer>
        <Back to="/">
          <img src={backIcon} />
        </Back>
        <RatingContainer>
          <Header>{name}</Header>
          <Ratings rating={ratings} votes={votes} white />
        </RatingContainer>
        <Like>
          <img src={likeIcon} />
        </Like>
      </ImageContainer>
      <InfoContainer>
        <Tab selected>Info</Tab>
        <Tab>Schedule</Tab>
      </InfoContainer>
      <InfoRow icon={addressIcon} text={`${street} ${streetNumber}, ${zip} ${city}`} />
      <InfoRow icon={clockIcon} text={`Open until ${openingHrs.to} today`} nextIcon={downArrowIcon} />
      <InfoRow icon={wwwIcon} text={website} />
      <InfoRow icon={phoneIcon} text={phone} />
      <Description dangerouslySetInnerHTML={{__html: description}} />
    </Container>
  );
}
export default Salon;

const BaseText = styled.div`
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.15000000596046448px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  background-size:100% 100%;
  background-image: url("src/assets/1x/background_photo.png");
  background-repeat: no-repeat;
  overflow: hidden;
  @media (min-width: 786px) {
    background-size:100%;
    background-position: top left;
    background-image: url("src/assets/3x/background_photo@3x.png");
  }
`;

const Description = styled.p`
  padding: 16px;
  font-size: 15px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0px;
`;

const Container = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
  margin: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #EEE;
  align-items: center;
`;

const Icon = styled.div<{margin? : boolean}>`
  margin-right: 12px;
  display: flex;
  ${({ margin }) => margin && `
    margin-left: 12px;
    padding-top: 3px;
  `}
  img {
    height: 16px;
  }
`;

const Text = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #EEE;
  justify-content: center;
`;

const Tab = styled(BaseText)<{selected?: boolean}>`
  display: flex;
  flex: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 16px 0;
  font-size: 15px;
  ${({ selected }) => selected && `
    border-bottom: 1px solid #B69F58;
  `}
`;
const Header = styled(BaseText)`
  color: white;
  font-family: 'FontBureauMillerBannerLight';
  font-size: 22px;
  margin-bottom: 5px;
`;

const RatingContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 17px;
`;

const Like = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
`;

const Back = styled(Link)`
  position: absolute;
  left: 18px;
  top: 18px;
`;