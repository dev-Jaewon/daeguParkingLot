import styled from "@emotion/styled"
import { IoSearch } from "react-icons/io5";

export const SearchBar = () => {
    return (
        <Container>
            <Input>
                <input type="text" />
                <IoSearch size={30}/>
            </Input>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    padding: 10px 20px 20px 20px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    background: #717cff;
`;

const Input = styled.div`
    display:flex;
    align-items: center;
    border-radius: 4px;
    width: 100%;
    background: white;

    input {
        border: none;
        padding: 0 10px;
        font-size: 1rem;
        width: 100%;

        &:focus{
            outline: none;
        }
    }

    svg {
        margin: 5px 10px 5px auto;
    }
`;