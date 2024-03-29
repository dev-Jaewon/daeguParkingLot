import styled from '@emotion/styled';

export const LoadingSpinnerSpead = () => {
    return (
        <Container>
            <div className="lds-ripple"><div></div><div></div></div>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .lds-ripple {
        display: inline-block;
        position: relative;
    }

    .lds-ripple div {
        transform: translate(-60%, -60%);
        background: red;
        position: absolute;
        border: 50px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes lds-ripple {
    0% {
        top: 60px;
        left: 60px;
        width: 0;
        height: 0;
        opacity: 0;
    }
    4.9% {
        top: 60px;
        left: 60px;
        width: 0;
        height: 0;
        opacity: 0;
    }
    5% {
        top: 60px;
        left: 60px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 108px;
        height: 108px;
        opacity: 0;
    }
    }
`;