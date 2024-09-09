import SignupFooter from '@/components/SignupFooter/SignupFooter';
import SignupForm from '@/components/SignupForm/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <SignupForm />
      <SignupFooter />
    </div>
  );
};

export default SignupPage;
