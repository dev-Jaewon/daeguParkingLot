import styled from '@emotion/styled'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { writeComment } from '../utils/api';
import { RequestAddComment } from '../types/RequestAddComment';
import { useAccount } from '../hooks/useAccount';
import { useNavigate } from 'react-router-dom';

interface WriteCommentType {
    parkingLotId: number;
}

export const WriteComment = ({ parkingLotId }: WriteCommentType) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { data } = useAccount();

    const mutation = useMutation({
        mutationFn: (addInfo: RequestAddComment) => writeComment(addInfo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['commentList'] })
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { comment } = e.target as typeof e.target & {
            comment: { value: string };
        };

        if (comment.value) {
            const addInfo: RequestAddComment = {
                value: comment.value, parkingLotId
            }

            mutation.mutate(addInfo);
            comment.value = "";
        }

    }

    return <WirteComment>
        {
            data.email ? <form onSubmit={handleSubmit}><div className='input_Container'>
                <input type="text" placeholder='코멘트를 남겨주세요.' name='comment' />
            </div>
                <button className='button'>작성하기</button>
            </form> :
                <LoginNoticContainer>
                    <div className='guid_content'>로그인 하시면 댓글을 다실 수 있습니다.</div>
                    <LoginButton onClick={() => navigate('/auth/login')}>로그인하기</LoginButton>
                </LoginNoticContainer>
        }
    </WirteComment>
}


const WirteComment = styled.div`
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 30px;

    form {
        display: flex;
        width: 100%;
    }

    .input_Container {
        display: flex;
        align-items: center;
        width: 100%;
        margin-right: 15px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
        

        input {
            width: 100%;
            line-height: 30px;
            border: none;

            &:focus {
                outline: none;
                box-shadow: rgba(17, 17, 26, 0.6) 0px 1px 0px;
            }

            &:hover {
                
            }
        }
    }

    .button {
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.7rem;
        cursor: pointer;
    }
`;

const LoginNoticContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;

    .guid_content {
        text-align: center;
        font-size: 0.8rem;
    }
`

const LoginButton = styled.button`
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.7rem;
        background-color: #717cff;
        padding: 10px 20px;
        color: #fff;
        cursor: pointer;
`;