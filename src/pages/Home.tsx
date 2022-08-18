import { useState } from 'react';
import styled from 'styled-components';
import arrowRightIcon from '../assets/1x/icn_chevron_right.png';
import arrowBackIcon from '../assets/1x/icn_chevron_left.png';
import settingIcon from '../assets/1x/icn_settings.png';
import { Link } from "react-router-dom";
import FilterRange, { RangeProps, Ranges } from '../components/Filter';
import Ratings from '../components/Ratings';
import { SalonList, SalonListProps } from '../assets/salons';

const SalonItem = ({ name, price, slot, address, id, duration, ratings, votes }: SalonListProps) => {
 
  return (
    <Link to={`/${id}`} key={name}>
      <ListItemContainer>
        <ListItemTime>{ slot}</ListItemTime>
        <ListItemInfo>
          <SalonInfoName>{ name }</SalonInfoName>
          <Info margin><Ratings rating={ratings } votes={votes} /></Info>
          <Info margin>{ address.street } { address.streetNumber }</Info>
        </ListItemInfo>
        <ListItemPrice>
          <Info>
            ${ price }
          </Info>
          <Info margin>
            { duration }
          </Info>
        </ListItemPrice>
        <ImgContainer><img src={arrowRightIcon} /></ImgContainer>
      </ListItemContainer>
    </Link>
  )
}

const Home = () => {
  const [selectedRange, setSelectedRange] = useState<RangeProps>(Ranges[0])
  const items = SalonList.reduce((acc: SalonListProps[], current: SalonListProps) => {
    console.log(current.price, selectedRange.from)
    if(current.price >= selectedRange.from && current.price <= selectedRange.to) {
      acc = [...acc, current];
    }
    return acc;
  }, []);

  const list = items.map(SalonItem);
  const onSelect = (range: RangeProps) => {
    setSelectedRange(range);
  }
  return (
    <Container>
      <HeaderContainer>
        <ImgContainer start><img src={arrowBackIcon} /></ImgContainer>
        <Header>Hair</Header>
        <ImgContainer><img src={settingIcon} /></ImgContainer>
      </HeaderContainer>
      <FilterRange onSelect={onSelect} selectedRange={selectedRange} />
      <ListContainer>{ list }</ListContainer>
    </Container>
  );
}
export default Home;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
`;
const Header = styled.h1`
  font-family: 'FontBureauMillerBannerLight';
  font-size: 22px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
`;

const ListContainer = styled.div`
  padding: 8px;
  width: 100%;
`;

const ListItemContainer = styled.div`
  display: flex;
  width: 100%;
  color: black;
  border-bottom: 1px solid #EEEEEE;
  padding: 16px 0;
`;

const ListItemTime = styled.div`
  font-weight: 400;
  margin: 0 16px;
`;

const Info = styled.div<{margin?:boolean}>`
  font-weight: 300;
  ${({ margin }) => margin && `
    margin-top: 8px;
  `}
`;

const SalonInfoName = styled(Info)`
  font-family: 'FontBureauMillerBannerLight';
  font-size: 20px;
`;

const ListItemInfo = styled.div`
  width: 70%;
  flex-direction: column;
  @media (min-width: 786px) {
    width: 80%;
  }
`;

const ListItemPrice = styled.div`
  font-weight: 400;
  width: 20%;
  @media (min-width: 786px) {
    width: 10%;
  }
`;

const ImgContainer = styled.div<{start?: boolean}>`
  font-weight: 400;
  justify-content: flex-end;
  flex: 1;
  display: flex;
  margin-right: 16px;
  img {
    display: flex;
    align-self: center;
  }
  ${({ start }) => start && `
    justify-content: flex-start;
    margin-right: 0;
    margin-left: 16px;
  `}
`;