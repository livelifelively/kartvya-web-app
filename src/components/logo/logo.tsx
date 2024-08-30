import { Anchor, Title } from '@mantine/core';
import classes from './logo.module.css';

export interface LogoProps {
  size?: string | number;
  // color?: string;
  linksToHome?: boolean;
}

export function Logo({ size, linksToHome = true }: LogoProps) {
  const LogoContent = () => (
    <Title size={size || 'h2'} className={classes.logoText}>
      kartvya
    </Title>
  );

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
