import { useEffect, useState } from "react";
import styled from "styled-components";

export interface RangeProps {
  from: number;
  to: number;
}

interface ComponentProps {
  onSelect:(range: RangeProps) => void;
  selectedRange: RangeProps;
}

type RangeComponentProps = RangeProps & ComponentProps;

export const Ranges: RangeProps[] = [
  {
    from: 250,
    to: 500
  },
  {
    from: 501,
    to: 750
  },
  {
    from: 751,
    to: 1000
  }
]

const Range = ({from, to, onSelect, selectedRange }: RangeComponentProps) => {
  const onClick = () => onSelect({from, to})
  const isSelected = selectedRange.from === from && selectedRange.to === to;
  const text = `Price: $${from} - $${to}`;
  if(isSelected) {
    return (
      <FilterItem>
       <H2ListItem>{text}</H2ListItem>
      </FilterItem>
    )
  }
  return (
    <FilterItemClickable onClick={onClick}>
      <H2ListItem>{text}</H2ListItem>
    </FilterItemClickable>
  )
}

const Filter = ({ onSelect, selectedRange }: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = `Price: $${selectedRange.from} - $${selectedRange.to}`;
  const onToggle = () => {
    setIsOpen(!isOpen);
  }
  const onSelectAndClose = (range: RangeProps) => {
    onSelect(range);
    onToggle();
  }
  const rangeRender = Ranges.map((range, index) => <Range key={index} {...range} selectedRange={selectedRange} onSelect={onSelectAndClose} />);
  return (
    <Container>
      <Header onClick={onToggle}><H2>{text}</H2></Header>
      {isOpen && <DDL>{ rangeRender }</DDL> }
    </Container>
  );
}
export default Filter;

const H2 = styled.h2`
  font-family: Helvetica Neue;
  font-weight: 300;
  padding: 16px;
  margin: 0;
  font-size: 15px;
  line-height: 20px;
`;

const H2ListItem = styled(H2)`
  padding: 0;
`;

const Header = styled.div`
  width: 100%;
  border-top: 1px solid #B69F58;
  border-bottom: 1px solid #B69F58;
  cursor: pointer;
`;

const FilterItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background-color: #e1e1e1;
  :last-child {
    border-bottom: 0;
  }
`;

const FilterItemClickable = styled(FilterItem)`
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
`;

const DDL = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;