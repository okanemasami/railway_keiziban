import React, { useCallback } from 'react';
import { commonStyles } from '../../styles/common.styles';

type ButtonVariant = 'primary' | 'secondary' | 'page';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean; // for page buttons
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  active = false,
  disabled = false,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const baseStyle: React.CSSProperties = { ...commonStyles.button };

  // Determine colors per variant
  let backgroundColor = '';
  let color = '';
  let extraStyle: React.CSSProperties = {};

  if (variant === 'primary') {
    backgroundColor = '#4f83d1'; // muted blue
    color = 'white';
  } else if (variant === 'secondary') {
    backgroundColor = '#5c636a'; // muted gray
    color = 'white';
  } else if (variant === 'page') {
    if (active) {
      backgroundColor = '#4f83d1';
      color = 'white';
      extraStyle = { fontWeight: 'bold' };
    } else {
      backgroundColor = '#f8f9fa';
      color = '#333';
      extraStyle = { border: '1px solid #dee2e6', borderRadius: '5px' };
    }
  }

  const handleEnter = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (disabled) return;
      if (onMouseEnter) onMouseEnter(e);
      const target = e.currentTarget;
      if (variant === 'primary') {
        target.style.backgroundColor = '#007bff';
      } else if (variant === 'secondary') {
        target.style.backgroundColor = '#6c757d';
      } else if (variant === 'page') {
        if (active) {
          target.style.backgroundColor = '#007bff';
          target.style.color = 'white';
        } else {
          target.style.backgroundColor = '#e9ecef';
        }
      }
    },
    [active, disabled, onMouseEnter, variant]
  );

  const handleLeave = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (disabled) return;
      if (onMouseLeave) onMouseLeave(e);
      const target = e.currentTarget;
      target.style.backgroundColor = backgroundColor;
      target.style.color = color;
    },
    [backgroundColor, color, disabled, onMouseLeave]
  );

  return (
    <button
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        ...baseStyle,
        backgroundColor,
        color,
        cursor: disabled ? 'not-allowed' : baseStyle.cursor,
        opacity: disabled ? 0.7 : 1,
        ...extraStyle,
        ...style,
      }}
      {...rest}
    />
  );
};


