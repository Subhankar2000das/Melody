type Props = {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
};

const Header = ({ title, subtitle, action }: Props) => {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {title ?? "Dashboard"}
        </h1>

        {subtitle ? (
          <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default Header;