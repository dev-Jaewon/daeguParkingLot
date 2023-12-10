import styled from '@emotion/styled';
import { FaUser } from 'react-icons/fa';

export const Reviews = () => {
    return <ReviewContainer>
        <Title>Review</Title>
        {/* <NoReview>등록된 리뷰가 없습니다.</NoReview> */}
        <ReviewContents>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
            <Review>
                <div className='review_info'>
                    <div className='nick_name'>
                        <FaUser /> 가나다마바사아
                    </div>
                    <div className='create-at'>2023/12/30</div>
                </div>
                <div className='content'>주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요주차 간격 매우 넓고 가격도 저렴해서 자주 이용할꺼 같아요</div>
            </Review>
        </ReviewContents>
    </ReviewContainer>
}

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    height: 100px;
    
`;

const NoReview = styled.div`
    padding: 100px 0;
    text-align: center;
    box-shadow: rgb(33 35 38) 0px 10px 10px -13px;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #212121;
    padding: 5px 20px 30px;
    bottom: 0px;
    background-color: white;
`;



const Review = styled.div`
    box-shadow: 0 2px 1px -2px gray;
    padding: 20px;

    .review_info{
        display: flex;
        justify-content: space-between;

        .nick_name{
            display: flex;
            gap: 10px;
        }

        .create-at{
            font-size: 13px;
        }
    }

    .content{
        margin-top: 20px;
        font-size:18px;
        font-style: italic;
        font-weight: 300;
        line-height: 25px;
    }    
`;

const ReviewContents = styled.div`
    display: flex;
    flex-direction: column;
`;