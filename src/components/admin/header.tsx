type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

const Header = ({ title, subtitle, action }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-white sm:text-2xl">{title}</h1>
        {subtitle ? <p className="text-sm text-gray-400">{subtitle}</p> : null}
      </div>

      {action ? <div className="w-full sm:w-auto">{action}</div> : null}
    </div>
  );
};

export default Header;