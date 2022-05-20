import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2d3436;
`;
const Title = styled.h4`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 50px;
  cursor: pointer;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  div {
    cursor: pointer;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Title>Notflix</Title>
      <Info>
        <div>Company</div>
        <div>Support</div>
        <div>SNS</div>
        <div>Policies</div>
        <div>Policies</div>
        <div>Press</div>
      </Info>
    </Wrapper>
  );
}

export default Footer;
