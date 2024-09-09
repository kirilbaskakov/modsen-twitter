interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  className?: string;
  register?: () => object;
}

const LabeledInput = ({
  id,
  placeholder,
  className,
  register,
  ...props
}: Props) => {
  return (
    <div className="relative">
      <input
        placeholder=""
        className={'peer ' + (className ?? '')}
        id={id}
        {...props}
        {...(register ? register() : {})}
      />
      <label className="label" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

export default LabeledInput;
