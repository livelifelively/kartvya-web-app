import { Anchor, Title } from '@mantine/core';
import classes from './logo.module.css';

export interface LogoProps {
  size?: string | number;
  color?: string;
  linksToHome?: boolean;
}

export function Logo({ size, color, linksToHome = true }: LogoProps) {
  const LogoContent = () => {
    return (
      <Title size={size ? size : 'h2'} className={classes.logoText}>
        Kartvya
      </Title>
    );
  };

  return linksToHome ? (
    <Anchor href="/" className={classes.logo}>
      <LogoContent />
    </Anchor>
  ) : (
    <Anchor className={classes.logo}>
      <LogoContent />
    </Anchor>
  );
}

export default Logo;
