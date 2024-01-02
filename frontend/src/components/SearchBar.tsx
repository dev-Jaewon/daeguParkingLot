import { useRef, SetStateAction } from 'react';
import styled from "@emotion/styled";
import { Dispatch } from "react";
import { IoSearch } from "react-icons/io5";
import { SearchParkList } from '../types/SearchParkList';

interface SearchBarType {
    setLocationTrigger: Dispatch<SetStateAction<SearchParkList>>
}

export const SearchBar = (props: SearchBarType) => {
    const inputValue = useRef<string>("");

    const handleClickSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.setLocationTrigger((preValue: SearchParkList) => ({ ...preValue, content: inputValue.current, page: 1 }));
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputValue.current = e.target.value;
    }

    const handleClickForm = () => {
        props.setLocationTrigger((preValue: SearchParkList) => ({ ...preValue, content: inputValue.current, page: 1 }));
    }

    return (
        <Container>
            <Input onSubmit={handleClickSearch} onClick={handleClickForm}>
                <input type="text" onChange={handleChangeInput} />
                <IoSearch size={30} />
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

const Input = styled.form`
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
        cursor: pointer;
    }
`;