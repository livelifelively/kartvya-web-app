import { Anchor, Title, TitleOrder } from '@mantine/core';
import { Quicksand } from 'next/font/google';
import classes from './logo.module.css';

// Load the font
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export interface LogoProps {
  size?: string | number;
  // color?: string;
  linksToHome?: boolean;
}

export function Logo({ size, linksToHome = true }: LogoProps) {
  const LogoContent = () => (
    <Title
      size={size || 'h2'}
      className={`${classes.logoText}`}
      order={typeof size === 'string' && size.startsWith('h') ? (parseInt(size.substring(1)) as TitleOrder) : 2}
    >
      kartvya
    </Title>
  );

  return linksToHome ? (
    <Anchor href="/" className={classes.logo}>
      <LogoContent />
    </Anchor>
  ) : (
    <Anchor data-testid="non-link-anchor" className={classes.logo}>
      <LogoContent />
    </Anchor>
  );
}

export default Logo;
