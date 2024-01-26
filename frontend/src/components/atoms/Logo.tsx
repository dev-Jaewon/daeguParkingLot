import styled from "@emotion/styled"

export const Logo = () => {
  return (
    <Container>
        <h1>내자리어디?</h1>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    align-items: center;
    padding: 20px 0 10px;
    background: #717cff;

    h1 {
        font-size: 1.2rem;
        font-weight: 700;
        padding-left: 20px;
        color: white;
    }
`;