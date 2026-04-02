type PageShellProps = {
  title: string;
  children?: React.ReactNode;
};

export default function PageShell({ title, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <h1 className="page-shell-title">{title}</h1>
      {children ? <div className="page-shell-body">{children}</div> : null}
    </div>
  );
}
