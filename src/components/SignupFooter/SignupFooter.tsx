const LINKS = [
  'About',
  'Help Center',
  'Terms of Service',
  'Privacy Policy',
  'Cookie Policy',
  'Ads info',
  'Blog',
  'Status',
  'Carrres',
  'Brand Resources',
  'Advertising',
  'Marketing',
  'Twitter for Business',
  'Developers',
  'Directory',
  'Settings'
];

const SignupFooter = () => {
  return (
    <footer className="flex py-4 justify-center gap-4 flex-wrap">
      {LINKS.map(link => (
        <span className="text-sm">{link}</span>
      ))}
      <span className="text-sm">@2021 Twiiter, Inc.</span>
    </footer>
  );
};

export default SignupFooter;
