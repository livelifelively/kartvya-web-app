import { render, screen } from '@/test-utils';
import { Logo } from './logo';
import { Quicksand } from 'next/font/google';
import classes from './logo.module.css'; // Import the same CSS module

// Load the font with the same config as in the component
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

describe('Logo component', () => {
  it('renders with default props', () => {
    render(<Logo />);
    expect(screen.getByText('kartvya')).toBeInTheDocument();
  });

  it('links to home page by default', () => {
    render(<Logo />);
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveAttribute('href', '/');
  });

  it('does not link to home page when linksToHome is false', () => {
    render(<Logo linksToHome={false} />);
    const anchor = screen.getByTestId('non-link-anchor');
    expect(anchor).not.toHaveAttribute('href');
  });

  it('applies custom size when provided', () => {
    render(<Logo size="h1" />);
    const title = screen.getByText('kartvya');

    // When using h1 size, it should have data-order="1"
    expect(title).toHaveAttribute('data-order', '1');
  });

  it('applies numeric size when provided', () => {
    render(<Logo size={32} />);
    const title = screen.getByText('kartvya');

    // With numeric size, it should use the default order (2)
    expect(title).toHaveAttribute('data-order', '2');
  });

  it('applies CSS module styles for typography', () => {
    render(<Logo />);
    const title = screen.getByText('kartvya');

    // Use the actual class reference from the imported module
    expect(title).toHaveClass(classes.logoText);
  });
});
