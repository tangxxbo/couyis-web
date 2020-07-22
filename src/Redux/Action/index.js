/**
 * Action 类型：用户事件操作
 */

export const type = {
    account: 'account',
    login: 'login',
    authority:'authority',
    accessToken:'accessToken'
}

export function account(account) {
    return {
        type: type.account,
        account
    }
}

export function login(login) {
    return {
        type: type.login,
        login
    }
}

export function authority(authority) {
    return {
        type: type.authority,
        authority
    }
}

export function accessToken(accessToken) {
    return {
        type: type.accessToken,
        accessToken
    }
}