import { SignInButton } from "@clerk/nextjs";

function SignIn() {
  return (
    <SignInButton mode="modal">
      <button  className="text-sm font-semibold cursor-pointer hover:text-darkColor text-lightColor hoverEffect">
        Login
      </button>
    </SignInButton>
  );
}

export default SignIn;
