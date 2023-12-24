import { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDebounce } from '../hooks/useDebounce';
import { checkEmail, checkNickName, signup } from '../utils/api';
import { InputValid } from './InputValid';
import { IoMailOutline, IoKeyOutline, IoAccessibilityOutline } from "react-icons/io5";
import { EMAIL_REG, NICK_NAME_REG, PASSWORD_REG } from '../Constant';
import { useCheckValid } from '../hooks/useCheckValid';
import { SignUpType } from '../types/SignUp';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from './LoadingButton';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

export const SignUp = () => {
    const { handleSubmit, register, formState: { errors }, control, watch, setError } = useForm<SignUpType>({ mode: "onChange" });

    const [debounceEmailValue, onChangeEmailText] = useDebounce(500);
    const [debounceNickName, onChangeNickNameText] = useDebounce(500);

    const [emailValid] = useCheckValid(checkEmail, debounceEmailValue, ['emailValid', debounceEmailValue]);
    const [nickNameValid] = useCheckValid(checkNickName, debounceNickName, ['nickNameValid', debounceNickName]);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (signupData: SignUpType) => signup(signupData),
        onSuccess: () => navigate("/auth/login")
    })

    const handleSubmitSinup = (data: SignUpType) => {
        if (Object.keys(errors).length === 0) mutation.mutate(data);
    }

    const emailValidate = (value: string): boolean | string => {
        return EMAIL_REG.test(value) || '이메일 형식이 올바르지 않습니다.'
    }

    const nickNameValidate = (value: string): boolean | string => {
        return NICK_NAME_REG.test(value) || '최소 2글자 이상 입력해주세요.'
    }

    const handleClickCancel = () => {
        navigate("/auth/login")
    }

    useEffect(() => {
        if (errors.email) return;
        if (!emailValid && watch('email')) setError('email', { message: '사용할 수 없는 이메일입니다.' });
    }, [emailValid])

    useEffect(() => {
        if (errors.nickName) return;
        if (!nickNameValid && watch('nickName')) setError('nickName', { message: '사용할 수 없는 닉네임입니다.' });
    }, [nickNameValid])

    return <Container>
        <form onSubmit={handleSubmit(handleSubmitSinup)}>
            <Controller
                name="email"
                control={control}
                render={({ field: { onChange, ...field }, fieldState: { invalid, error } }) =>
                (
                    <InputValid
                        type='email'
                        onChange={(e) => {
                            onChangeEmailText(e.target.value);
                            onChange(e);
                        }}
                        inValid={invalid || !emailValid}
                        inValidMeg={error?.message}
                        icon={<IoMailOutline />}
                        placeholder='이메일을 입력해주세요.'
                        {...field}
                    />
                )
                }
                rules={{ validate: (v) => emailValidate(v) }}
            />
            <InputValid
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                icon={<IoKeyOutline />}
                inValid={Boolean(errors.password)}
                inValidMeg={errors.password?.message}
                {...register("password", {
                    required: '패스워드를 입력해주세요.',
                    pattern: {
                        value: PASSWORD_REG, message: '8자 이상 영어 숫자 특수문자가 포함되어야합니다.'
                    },

                })}
            />
            <InputValid
                type='password'
                placeholder='비밀번호를 다시 입력해주세요.'
                icon={<IoKeyOutline />}
                inValid={Boolean(errors.passwordConfirm)}
                inValidMeg={errors.passwordConfirm?.message}
                {...register("passwordConfirm", {
                    required: '패스워드를 입력해주세요.',
                    validate: (value) => value === watch('password') || '패스워드를 다시 입력해주세요.'
                })}
            />
            <Controller
                name="nickName"
                control={control}
                render={({ field: { onChange, ...field }, fieldState: { invalid, error } }) =>
                (
                    <InputValid
                        type='text'
                        onChange={(e) => {
                            onChangeNickNameText(e.target.value);
                            onChange(e);
                        }}
                        inValid={invalid || !emailValid}
                        inValidMeg={error?.message}
                        icon={<IoAccessibilityOutline />}
                        placeholder='닉네임을 입력해주세요.'
                        {...field}
                    />
                )
                }
                rules={{ validate: (v) => nickNameValidate(v), required: '닉네임을 입력해주세요.' }}
            />
            <LoadingButton value='회원가입' isLoading={mutation.isPending} />
        </form>
        <CancelButton onClick={handleClickCancel}>취소</CancelButton>
    </Container>
}

const Container = styled.div`
    position: relative;
    padding: 30px 20px;
    top:50%;
    left:50%;
    width: 400px;
    border-radius: 18px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    transform: translate(-50%, -50%);


    & > form {
        flex-direction: column;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    button {
        margin-top: 40px;
        width: 380px;
        height: 45px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
    }
`;

const CancelButton = styled.button`
    position: relative;
    left: 50%;
    margin-top: 40px;
    width: 380px;
    height: 45px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transform: translate(-50%, -50%);
`;