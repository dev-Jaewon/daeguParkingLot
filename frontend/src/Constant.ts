export const PER_RANGE = {
    16: 500,
    15: 1000,
    14: 2000,
    13: 3000,
    12: 9000,
    11: 15000
}

export const DEFAULT_LOCATION = {
    lat: 35.87093386685083,
    lot: 128.59394073486328,
    range: 500
}

export const DEFAULT_INFO = {
    page: 1,
    perPage: 10,
    content: ""
}

export const EMAIL_REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

export const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/

export const NICK_NAME_REG = /^[가-힣a-zA-Z0-9]{2,}$/