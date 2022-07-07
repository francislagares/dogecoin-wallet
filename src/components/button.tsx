interface IProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ type, children, onClick }: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 
                p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl 
                active:scale-90 transition duration-150'
    >
      {children}
    </button>
  );
};

export default Button;
