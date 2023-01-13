import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  dataCy?: string;
  className?: string;
  width?: string;
  minWidth?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
};

const Button = ({
  text,
  type,
  onClick,
  loading = false,
  disabled = false,
  dataCy,
  className,
  width,
  height,
  fontSize,
  margin,
  minWidth,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`custom-button ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled}
      data-cy={dataCy}
      style={{
        width: `${width}`,
        height: `${height}`,
        fontSize: `${fontSize}`,
        margin: `${margin}`,
        minWidth: `${minWidth}`,
      }}
    >
      {!loading && <span>{text}</span>}
      {loading && (
        <PulseLoader
          className="button-loader"
          color="rgb(146, 146, 146)"
          loading={loading}
          size={8}
          aria-label="Loading Spinner"
        />
      )}
    </button>
  );
};

export default Button;
