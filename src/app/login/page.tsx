import { OauthButtons } from './oauth-signin';

import Image from 'next/image';

function LoginPage() {
  return (
    <div className='h-screen w-full lg:grid lg:grid-cols-2'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Simply click a button below to login with Google.
            </p>
          </div>
          <div className='grid gap-4'>
            {/* <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id='password' type='password' required />
            </div> */}
            {/* <Button type='submit' className='w-full'>
              Login
            </Button> */}
            {/* <Button variant='outline' className='w-full'>
              Login with Google
            </Button> */}
            <OauthButtons />
          </div>
          {/* <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='#' className='underline'>
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className='hidden bg-muted lg:block relative'>
        <Image
          src='https://media.newyorker.com/photos/647a15fec91efd6c449e2964/master/w_2560%2Cc_limit/Arn-Van-Gogh-Secondary-1.jpg'
          alt='Image'
          width='1000'
          height='500'
          className='h-full w-full object-right object-cover dark:brightness-[0.2] dark:grayscale'
        />
        <div className='z-10 top-0 absolute w-full h-full backdrop-brightness-75'></div>
      </div>
    </div>
  );
}

export default LoginPage;
