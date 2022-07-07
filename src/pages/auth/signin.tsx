import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

export default function SignIn({ csrfToken }: any) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .email('Invalid email address')
            .required('Please enter your email'),
          password: Yup.string().required('Please enter your password'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            // callbackUrl: `${window.location.origin}`,
          });
          console.log(res);
          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res?.url) router.push('/');
          setSubmitting(false);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <div className='bw-full h-screen flex items-center justify-center'>
              <div className='w-full md:w-1/3 bg-white rounded-lg'>
                <input
                  name='csrfToken'
                  type='hidden'
                  defaultValue={csrfToken}
                />

                <div className='text-red-400 text-md text-center rounded p-2'>
                  {error}
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='uppercase text-sm text-gray-600 font-bold'
                  >
                    Email
                    <Field
                      name='email'
                      aria-label='enter your email'
                      aria-required='true'
                      type='text'
                      className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                    />
                  </label>

                  <div className='text-red-600 text-sm'>
                    <ErrorMessage name='email' />
                  </div>
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='uppercase text-sm text-gray-600 font-bold'
                  >
                    password
                    <Field
                      name='password'
                      aria-label='enter your password'
                      aria-required='true'
                      type='password'
                      className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                    />
                  </label>

                  <div className='text-red-600 text-sm'>
                    <ErrorMessage name='password' />
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <button
                    type='submit'
                    className='uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150'
                  >
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
