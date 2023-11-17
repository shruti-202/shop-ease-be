const nameValidator = (name) => {
  const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]*)?$/;
  return nameRegex.test(name);
};

const emailValidator = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const passwordValidator = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}


module.exports = { nameValidator, emailValidator , passwordValidator };
