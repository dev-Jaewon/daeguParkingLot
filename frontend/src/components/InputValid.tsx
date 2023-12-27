import { ChangeEvent, HTMLInputTypeAttribute, ReactElement, forwardRef } from 'react';
import styled from "@emotion/styled";

interface InpuValidType {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: HTMLInputTypeAttribute
    value?: string;
    inValid?: boolean;
    placeholder?: string
    icon?: ReactElement<any, any>
    inValidMeg?: string;
}

export const InputValid = forwardRef<HTMLInputElement, InpuValidType>(({ icon, value, inValid, inValidMeg, onChange, ...props }: InpuValidType, ref) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
    }

    return <Container>
        <ContentContainer>
            {icon}
            <input ref={ref} onChange={handleInputChange} {...props} />
        </ContentContainer>
        <Divider />
        {
            inValid && <Message>{inValidMeg}</Message>
        }
    </Container>
})

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    svg {
        width: 25px;
        height: 25px;
    }

    input {
        border: none;
        font-size: 1rem;
        font-weight: 500;
        color: #3b3b3b;
        background-color: #ededed;
        line-height: 25px;

        &:focus{
            outline: none;
        }

        &::placeholder{
            font-size: 1rem;
        }
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #ededed;
    border-radius: 8px;
    margin: 0 10px;
    padding: 10px 15px;
    gap: 10px;
`;

const Divider = styled.div`
`;

const Message = styled.div`
    margin-top: 5px;
    font-size: 0.8rem;
    color: red;
    font-weight: 400;
    padding-left: 10px;
`;