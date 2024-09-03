import { signIn } from 'next-auth/react';
import { errorNotification, successNotification } from '../notifications';

export async function signInUser(provider: string, options: any, router: any) {
  signIn(provider, options).then((response) => {
    const { error, ok, url } = response || {};

    if (error) {
      errorNotification({ title: 'Login Failed!', message: error, autoClose: false });
    } else if (ok) {
      successNotification({ title: 'Login Successful!', message: 'You have been logged in successfully.' });
      router.push(url);
    }
  });
}
