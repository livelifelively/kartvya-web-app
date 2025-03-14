import { render, screen, fireEvent } from '@/test-utils';
import UserProfileSnippet from './user-name-sidebar';

describe('UserProfileSnippet component', () => {
  const defaultProps = {
    userName: 'John Doe',
    userHandle: 'johndoe',
    status: 'Citizen Journalist',
  };

  it('renders basic user information correctly', () => {
    render(<UserProfileSnippet {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
  });

  it('renders user status correctly', () => {
    render(<UserProfileSnippet {...defaultProps} />);

    expect(screen.getByText('Citizen Journalist')).toBeInTheDocument();
  });

  it('renders the avatar with correct props', () => {
    const profileImageUrl =
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop';
    render(<UserProfileSnippet {...defaultProps} profileImageUrl={profileImageUrl} />);

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', profileImageUrl);
  });

  // TODO: ADD TESTS FOR FEATURES WHEN YOU REALLY NEED THEM

  //   it('does not render share button when onShareProfile is not provided', () => {
  //     render(<UserProfileSnippet {...defaultProps} />);

  //     expect(screen.queryByText('Share Profile')).not.toBeInTheDocument();
  //   });

  //   it('renders share button when onShareProfile is provided', () => {
  //     render(<UserProfileSnippet {...defaultProps} onShareProfile={() => {}} />);

  //     expect(screen.getByText('Share Profile')).toBeInTheDocument();
  //   });

  //   it('calls onClick when the snippet is clicked', () => {
  //     const handleClick = jest.fn();
  //     render(<UserProfileSnippet {...defaultProps} onClick={handleClick} />);

  //     fireEvent.click(screen.getByText('John Doe'));
  //     expect(handleClick).toHaveBeenCalledTimes(1);
  //   });

  //   it('calls onShareProfile when the share button is clicked', () => {
  //     const handleShare = jest.fn();
  //     render(<UserProfileSnippet {...defaultProps} onShareProfile={handleShare} />);

  //     fireEvent.click(screen.getByText('Share Profile'));
  //     expect(handleShare).toHaveBeenCalledTimes(1);
  //   });

  //   it('prevents onClick from firing when share button is clicked', () => {
  //     const handleClick = jest.fn();
  //     const handleShare = jest.fn();

  //     render(<UserProfileSnippet {...defaultProps} onClick={handleClick} onShareProfile={handleShare} />);

  //     fireEvent.click(screen.getByText('Share Profile'));

  //     expect(handleShare).toHaveBeenCalledTimes(1);
  //     expect(handleClick).not.toHaveBeenCalled();
  //   });

  //   it('applies correct cursor style when onClick is provided', () => {
  //     render(<UserProfileSnippet {...defaultProps} onClick={() => {}} />);

  //     const container = screen.getByText('John Doe').closest('.user-profile-snippet');
  //     expect(container).toHaveStyle('cursor: pointer');
  //   });

  //   it('applies default cursor style when onClick is not provided', () => {
  //     render(<UserProfileSnippet {...defaultProps} />);

  //     const container = screen.getByText('John Doe').closest('.user-profile-snippet');
  //     expect(container).toHaveStyle('cursor: default');
  //   });
});
