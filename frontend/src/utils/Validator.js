export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!re.test(email) || !email || email.length <= 0) {
        return false;
    }

    return true;
};

export const passwordValidator = (password) => {
    if (!password || password.length < 8) {
        return false;
    }

    return true;;
};
