import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { ModifyCommen } from '../types/ModifyComment';
import { modifyCommen } from '../utils/api';

interface ModifyCommentType {
    commentId: number;
    content: string;
    resetComment: ()=>void;
}

export const ModifyComment = ({ commentId, content, resetComment }: ModifyCommentType) => {
    const queryClient = useQueryClient();
    const [iputValue, setInputValue] = useState<string>(content);

    const mutation = useMutation({
        mutationFn: (modifyComment: ModifyCommen) => modifyCommen(modifyComment),
        onSuccess: () => resetList()
    })

    const resetList= () => {
        resetComment();
        queryClient.invalidateQueries({ queryKey: ['commentList'] });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { comment } = e.target as typeof e.target & {
            comment: { value: string };
        };

        mutation.mutate({
            id: commentId,
            content: comment.value
        })
    }

    return <CommentCotainer>
        {
            <form onSubmit={handleSubmit}><div className='input_Container'>
                <input type="text" name='comment' value={iputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
                <button>수정하기</button>
            </form>
        }
    </CommentCotainer>
}

const CommentCotainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 30px;
    margin-top: 30px;

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

    button {
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.7rem;
        cursor: pointer;
    }
`;
