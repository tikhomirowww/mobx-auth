import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { Context } from "..";

const RegisterForm: FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { store } = useContext(Context);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.register(user.email, user.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Form</h2>
      <input
        onChange={handleChange}
        value={user.email}
        name="email"
        type="text"
      />
      <input
        onChange={handleChange}
        value={user.password}
        name="password"
        type="text"
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
