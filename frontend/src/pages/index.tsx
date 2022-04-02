import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from '../components/Form/Input'
import { Header } from '../components/Header'
import { Container } from '../styles/signIn'
import { Button } from '../components/Form/Button';
import Link from 'next/link';

interface SignUserFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignUserFormData> = (data) => {
    console.log(data);
  }

  return (  
    <>
      <Head>
        <title>Sign In | chat-now</title>
      </Head>
      <Container>
        <h1>Welcome to chat-now</h1>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <Input
            name="email"
            type="email"
            placeholder="Email" 
            error={formState.errors.email}
            {...register("email")}
            style={{ marginTop: '2.5rem' }}
          />
          
          <Input
            name="password"
            type="password"
            placeholder="Password" 
            error={formState.errors.password}
            {...register("password")}
            style={{ marginTop: '1rem' }}
          />

          <Button name="Sign in" style={{ marginTop: "2.5rem" }}/>
        </form>
        <p>
          Not have an account yet? <br />
          <Link href="/signUp">
            <a>Click here</a>
          </Link> to register.
        </p>
      </Container>
    </>
  )
}
