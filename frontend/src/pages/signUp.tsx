import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { Container } from "../styles/signUp";
import { Button } from "../components/Form/Button";
import Link from "next/link";

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

  const onSubmit: SubmitHandler<SignUpUserFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sign Up | chat-now</title>
      </Head>
      <Container>
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