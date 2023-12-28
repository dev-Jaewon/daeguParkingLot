import styled from '@emotion/styled';

export const Loading = () => {
    return (
        <Container>
            <div className="loading-box">
                <div className="circles">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

   .loading-box {
        position:fixed; 
        padding:10px 0; 
        text-align:center; 
        background:#fff; 
    
        .circles {
            display: flex;
            gap:20px;

            i {
                animation:scaleBounce .3s alternate infinite; 
                display:inline-block; 
                margin:0 4px; 
                width:10px; 
                height:10px; 
                background:#00a5e5; 
                border-radius:50em;

                &:nth-of-type(2) {
                    animation-delay:.1s;
                }

                &:nth-of-type(3) {
                    animation-delay:.2s;
                }
            }
        }

        p {
            margin-top:20px; 
            font-size:18px;
        }
    }
    
    @keyframes scaleBounce{
        from {
            transform:scale(.7)
        }
        to {
            transform:scale(1.3)
        }
    }
`;