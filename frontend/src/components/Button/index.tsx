import React from 'react';

export interface IButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ children, onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={!!disabled}>{children}</button>
    )
};

export default Button;
