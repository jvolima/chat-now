import { yupResolver } from "@hookform/resolvers/yup";
import 'react-toastify/dist/ReactToastify.min.css';
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { Container } from "../styles/signUp";
import { Button } from "../components/Form/Button";
import Link from "next/link";
import { api } from "../services/api";
import { useRouter } from "next/router";

type SignUpUserFormData = {
  name: string;
  email: string;
  password: string;
};

const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const router = useRouter(); 

  const onSubmit: SubmitHandler<SignUpUserFormData> = async (data) => {
    try {
      const response = await api.post("/users/create", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("User registered!");
  
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | chat-now</title>
      </Head>
      <Container>
        <ToastContainer 
          theme="colored" 
          toastClassName="errorAlert"
          autoClose={2000} 
          pauseOnHover={false} 
        />
        <h1>Register now to chat with <br/>your friends 😄</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            error={formState.errors.name}
            {...register("name")}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email" 
            error={formState.errors.email}
            {...register("email")}
            style={{ marginTop: "2rem" }}
          />
          
          <Input
            name="password"
            type="password"
            placeholder="Password" 
            error={formState.errors.password}
            {...register("password")}
            style={{ marginTop: "2rem" }}
          />

          <Button name="Sign up" style={{ marginTop: "2.5rem" }}/>
        </form>
        <p>
          You already have an account? <br />
          <Link href="/">
            <a>Click here</a>
          </Link> to sign in.
        </p>
      </Container>
    </>
  )
}