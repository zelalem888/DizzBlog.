
import Image from 'next/image';
// import Link from 'next/link';
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
        await signIn("google",{ redirectTo: "/pages" })
        
      }}
    >
      <button type='submit' className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width={18} height={18} /> Continue with Google
              </button>
    </form>
            </div>
            


          </div>
        </div>
      </div>
  
    </div>
  );
};

export default LoginPopup;
