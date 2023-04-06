import css from './LoginForm.module.css';
import { useLoginMutation } from 'redux/auth/authApi'

export const LoginForm = () => {
  const [login] = useLoginMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    await login(
      {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }
    )
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};
