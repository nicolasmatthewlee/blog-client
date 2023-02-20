import { UserForm } from "./userform";

export const Signup: Function = () => {
  return (
    <div className="h-full w-full absolute flex items-center justify-center bg-gray-100">
      <UserForm
        type="signup"
        header="Create an account"
        subheader="Please enter your information."
        buttonText="Submit"
        buttonColor="bg-emerald-500 enabled:hover:bg-emerald-600"
        footerText="Already have an account? "
        footerLinkText="Sign in"
        footerLinkTo="/signin"
      />
    </div>
  );
};
