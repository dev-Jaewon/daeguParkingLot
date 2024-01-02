import styled from "@emotion/styled"

export const ListLoading = () => {
    return (
        <Container>
            <span className="loader"></span>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    height: 100%;

.loader {
    position: relative;
    width: 64px;
    height: 64px;
    background-color: rgba(0, 0, 0, 0.5);
    transform: rotate(45deg);
    overflow: hidden;
}

.loader:after{
    content: '';
    position: absolute;
    inset: 8px;
    margin: auto;
    background: #222b32ad;
}

.loader:before{
    content: '';
    position: absolute;
    inset: -15px;
    margin: auto;
    background: #717cff;
    animation: diamondLoader 2s linear infinite;
}

@keyframes diamondLoader {
    0%  ,10% {
        transform: translate(-64px , -64px) rotate(-45deg)
    }

    90% , 100% {
        transform: translate(0px , 0px) rotate(-45deg)
    }
}
`;