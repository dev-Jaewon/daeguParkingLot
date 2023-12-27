import styled from '@emotion/styled';

interface LoadingButtonType {
    isLoading?: boolean;
    value: string;
}

export const LoadingButton = ({ isLoading, value }: LoadingButtonType) => {
    return <Container>
        {isLoading ? '로딩중' : value}
    </Container>
}

const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
`;