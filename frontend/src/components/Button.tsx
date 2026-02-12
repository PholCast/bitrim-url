interface ButtonProps {
  label: string;
  onClick?: () => void;
  backgroundColor?: 'primary' | 'secondary' | 'tertiary';
  textColor?: string;
  borderColor?: string;
}


export const Button = ({label,onClick,backgroundColor,textColor,borderColor}:ButtonProps) => {
  return (
    <button className={`bg-${backgroundColor} text-${textColor} border-${borderColor} rounded-2xl`} onClick={onClick}>{label}</button>
  )
}
