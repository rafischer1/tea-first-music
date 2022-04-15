const LogInService = {
  checkAdminPassword: (password: string) => {
    return password === "1234";
  },
};

export default LogInService;
