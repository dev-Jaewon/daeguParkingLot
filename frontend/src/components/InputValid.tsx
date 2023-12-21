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
    padding: 10px 20px;
    display: flex;
    flex-direction: column;

    svg {
        width: 30px;
        height: 30px;
    }

    input {
        width: 100%;
        padding: 0 15px;
        margin: 5px 0;
        border: none;
        font-size: 1.4rem;
        font-weight: 500;
        color: #3b3b3b;

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
`;

const Divider = styled.div`
    border-bottom: 1px solid #858585;
`;

const Message = styled.div`
    margin-top: 5px;
    font-size: 0.8rem;
    color: red;
    font-weight: 400;
`;