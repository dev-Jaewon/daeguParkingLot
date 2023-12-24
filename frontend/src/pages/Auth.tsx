import styled from '@emotion/styled';
import { SignUp } from '../components/Signup';

export const Auth = () => {
    return <Container>
        <SignUp/>
    </Container>
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: red;
`;