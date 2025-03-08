
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from '@/app/auth';


const LoginPopup = () => {
  return (
    <div className="min-h-screen flex flex-col">
 
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">

          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">Login to your account</p>
              <p className="mt-2 text-sm leading-4 text-slate-600">You must be logged in to perform this action.</p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type='submit' className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width={18} height={18} /> Continue with Google
              </button>
    </form>
            </div>
            

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div> OR <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form className="w-full">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input name="email" type="email" autoComplete="email" required className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1" placeholder="Email Address" />
              
              <label htmlFor="password" className="sr-only">Password</label>
              <input name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1" placeholder="Password" />
              
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <Link href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</Link>
              </p>
              
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                Continue
              </button>
            </form>

          </div>
        </div>
      </div>
  
    </div>
  );
};

export default LoginPopup;
