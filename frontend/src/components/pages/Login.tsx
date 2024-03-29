import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputValid } from '../atoms/InputValid';
import { LoginType } from '../../types/Login';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../utils/api';
import { LoadingSpinnerCircle } from '../atoms/LoadingSpinnerCircle';

export const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<LoginType>();

    const mutation = useMutation({
        mutationFn: (loginData: LoginType) => login(loginData),
        onSuccess: () => navigate("/")
    })

    const navigate = useNavigate();

    const handleSubmitLogin = (loginInfo: LoginType) => {
        mutation.mutate(loginInfo);
    }

    const handleClickSignup = () => {
        navigate('/auth/signup');
    }

    return <Container>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
            <InputValid
                type='email'
                placeholder='email'
                inValid={Boolean(errors.password)}
                inValidMeg={errors.email?.message}
                {...register("email", {
                    required: '아이디를 입력해주세요.',
                })}
            />
            <InputValid
                type='password'
                placeholder='Password'
                inValid={Boolean(errors.password)}
                inValidMeg={errors.password?.message}
                {...register("password", {
                    required: '패스워드를 입력해주세요.',
                })}
            />
            <ControlContainer>
                {
                    mutation.error && <NotFoundAccount>Id 및 Password를 확인해주세요.</NotFoundAccount>
                }
                <LoginButtonContainer>
                    {
                        mutation.isPending ? <LoadingSpinnerCircle/> : <button>로그인</button>
                    }
                </LoginButtonContainer>
            </ControlContainer>
            <SignupContent>
                <p>아직 계정이 없으신가요?</p>
                <p className='button' onClick={handleClickSignup}>가입하기</p>
            </SignupContent>
        </form>
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 50px 30px;
    top:50%;
    left:50%;
    width: 300px;
    border-radius: 18px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    transform: translate(-50%, -50%);
    user-select: none;

    p {
        text-align: center;
        font-size: 0.7rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`;


const SignupContent = styled.div`
    justify-content: center;
    display: flex;
    gap: 10px;

    .button {
        color: #ff3333;
        cursor: pointer;
    }
`;

const ControlContainer = styled.div`
    margin-top: 30px;
`;

const NotFoundAccount = styled.p`
    color: red;
    margin-bottom: 20px;
`

const LoginButtonContainer = styled.div`
    display: flex;
    width: 300px;
    height: 40px;

    button {
        margin: 0px 10px 10px 10px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
`;