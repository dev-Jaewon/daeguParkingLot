import styled from '@emotion/styled';
import { FaUser } from 'react-icons/fa';
import { WriteComment } from './WriteComment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentList, removeComment } from '../utils/api';
import { FaRegComments } from "react-icons/fa";
import { useAccount } from '../hooks/useAccount';
import { useState } from 'react';
import { ModifyComment } from './ModifyComment';

interface CommentListType {
    parkingLotId: number;
}

export const CommentList = ({ parkingLotId }: CommentListType) => {
    const account = useAccount();
    const queryClient = useQueryClient();

    const [modifyCommentId, setModifyCommentId] = useState<number>(0);

    const comments = useQuery({
        queryKey: ['commentList', parkingLotId], queryFn: () => commentList(parkingLotId), initialData: []
    });

    const mutation = useMutation({
        mutationFn: (commentId: number) => removeComment(commentId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['commentList'] })
    })

    const resetComment = () => {
        setModifyCommentId(0);
    }

    return <Container>
        <Title>Comment</Title>
        <WriteComment parkingLotId={parkingLotId} />
        <ReviewContents>
            {
                comments.data.length > 0 ?
                    comments.data.map((c: any) =>
                        <Review key={c.id}>
                            <div className='review_info'>
                                <div className='nick_name'>
                                    <FaUser /> {c.nickname}
                                    {
                                        c.nickname === account.data.nickname &&
                                        <ModifyButtonCointainer>
                                            {
                                                modifyCommentId === 0 ?
                                                    <div onClick={() => setModifyCommentId(c.id)}>수정</div>
                                                    : <div onClick={() => setModifyCommentId(0)}>취소</div>
                                            }
                                            <div onClick={() => mutation.mutate(c.id)}>삭제</div>
                                        </ModifyButtonCointainer>
                                    }
                                </div>
                                <div className='create-at'>{c.createAt}</div>
                            </div>
                            <div>
                                {
                                    modifyCommentId === c.id ? <ModifyComment commentId={c.id} content={c.content} resetComment={resetComment} /> : <div className='content'>{c.content}</div>
                                }
                            </div>
                        </Review>)
                    : <NoComment>
                        <FaRegComments size={'150px'} color="#92a0fa" />
                        <p>주차장의 첫 리뷰를 남겨주세요.</p>
                    </NoComment>
            }
        </ReviewContents>
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    height: 100px;
    
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

const NoComment = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;

    svg {
        margin: 40px;
    }

    p {
        margin-top: 20px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #b6b6b6;
    }
`;

const ModifyButtonCointainer = styled.div`
    display: flex;
    align-items: end;
    font-size: 0.7rem;
    gap:5px;
    cursor: pointer;
`;