export default function Button({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
  link,
}) {
  const isDisabled = !link;

  return (
    <button
      onClick={isDisabled ? undefined : () => window.open(link, "_blank")}
      id={id}
      className={`group relative z-10 w-fill cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>

      {rightIcon}
    </button>
  );
}
