import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { login } from "@/utils/auth";

// Define the type for form inputs
interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
      router.push("/dashboard");
    } catch {
      alert("Login gagal. Periksa kredensial Anda.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input {...register("username", { required: true })} placeholder="Username" />
      {errors.username && <span>Username wajib diisi</span>}
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      {errors.password && <span>Password wajib diisi</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
