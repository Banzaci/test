import styled from "styled-components";
import starEmpty from '../assets/1x/icn_star_empty.png';
import star from '../assets/1x/icn_star_filled.png';

export interface RangeProps {
  from: number;
  to: number;
}

interface RatingProps {
  rating: number;
  votes: string;
  white?: boolean;
}

const Ratings = ({ rating, votes, white }: RatingProps) => {
  const renderRatings = [...Array(5)].map((_, index) => <Star><img src={ index < rating ? star : starEmpty} /></Star>)
  return <Container>
    {renderRatings}
    <Votes white={white}>({votes})</Votes>
  </Container>
}

export default Ratings;

const Container = styled.div`
  display: flex;
`;

const Star = styled.span`
  margin-right: 4px;
  display: flex;
  justify-content: center;
`;

const Votes = styled.span<{white?: boolean}>`
  font-size: 13px;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0px;
  ${({ white }) => white && `
    color: white;
  `}
`;