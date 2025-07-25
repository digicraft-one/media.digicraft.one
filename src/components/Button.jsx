import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, disabled, type = "button" }) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        disabled && "opacity-50 cursor-not-allowed",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className={clsx(
          "translate-y-0 skew-y-0 transition duration-500",
          !disabled && "group-hover:translate-y-[-160%] group-hover:skew-y-12"
        )}>
          {title}
        </div>
        <div className={clsx(
          "absolute translate-y-[164%] skew-y-12 transition duration-500",
          !disabled && "group-hover:translate-y-0 group-hover:skew-y-0"
        )}>
          {title}
        </div>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
