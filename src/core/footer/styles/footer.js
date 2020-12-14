import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 40px;
  background: radial-gradient(circle, rgb(159, 288, 215) 0%, rgb(159, 237, 215) 100%);
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 100px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #016670;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  &:hover {
      color: #F39A27;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #016670;
  margin-bottom: 40px;
  font-weight: bold;
`;

export const Body = styled.p`
    font-size: 18px;
    color: #016670;
    margin-bottom: 20px;
    font-weight: bold;
`;