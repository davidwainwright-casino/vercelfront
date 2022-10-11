import cn from 'classnames';

export default function Copyright({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className={cn('tracking-[0.2px]', className)}>
      {currentYear} {' '}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-brand-dark"
      >
        - 777.dog
      </a>
    </div>
  );
}
