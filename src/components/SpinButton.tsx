interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  label?: string;
}

export function SpinButton({
  onClick,
  disabled,
  label = 'Spin the Wheel!',
}: SpinButtonProps) {
  return (
    <button
      type="button"
      className="spin-btn"
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled}
    >
      {disabled ? 'Spinning…' : label}
    </button>
  );
}
