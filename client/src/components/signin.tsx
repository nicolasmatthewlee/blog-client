import { UserForm } from "./userform";

interface Props {
  server: String;
}

export const Signin: Function = ({ server }: Props) => {
  return (
    <div className="h-full w-full absolute flex items-center justify-center bg-gray-100">
      <UserForm
        type="signin"
        header="Welcome back!"
        subheader="Please enter your information."
        buttonText="Sign in"
        buttonColor="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-400"
        spinnerColor="bg-slate-400"
        footerText="Don't have an account? "
        footerLinkText="Sign up"
        footerLinkTo="/signup"
        server={server}
      />
    </div>
  );
};
