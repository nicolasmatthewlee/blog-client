import { UserForm } from "./userform";

export const Signin: Function = () => {
  return (
    <div className="h-full w-full absolute flex items-center justify-center bg-gray-100">
      <UserForm
        type="signin"
        header="Welcome back!"
        subheader="Please enter your information."
        buttonText="Sign in"
        buttonColor="bg-gray-800 enabled:hover:bg-gray-600"
        footerText="Don't have an account? "
        footerLinkText="Sign up"
        footerLinkTo="/signup"
      />
    </div>
  );
};
