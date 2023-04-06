import css from './RegisterForm.module.css';
import { useSignupMutation } from 'redux/auth/authApi'

export const RegisterForm = () => {
  const [signup] = useSignupMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    await signup(
      {
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      }
    )
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};
