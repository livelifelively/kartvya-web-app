import { render, screen } from '@/test-utils';
import UserSubjectsSidebar from './user-subjects-sidebar';

describe('UserSubjectsSidebar component', () => {
  const defaultProps = {
    subjects: [
      { name: 'Environment', id: 'env-01' },
      { name: 'Education', id: 'edu-01' },
      { name: 'Healthcare', id: 'health-01' },
    ],
  };

  it('renders subjects card with correct aria label', () => {
    render(<UserSubjectsSidebar {...defaultProps} />);
    const card = screen.getByLabelText('User Policy Subjects');
    expect(card).toBeInTheDocument();
  });

  it('renders all subjects correctly', () => {
    render(<UserSubjectsSidebar {...defaultProps} />);

    // Check that all subjects are rendered
    expect(screen.getByText('Environment')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();

    // Check that they all have the correct aria-labels
    expect(screen.getByLabelText('Subject: Environment')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject: Education')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject: Healthcare')).toBeInTheDocument();
  });

  //   it('renders correct number of subject tags', () => {
  //     render(<UserSubjectsSidebar {...defaultProps} />);

  //     const subjects = screen.getAllByRole('link');
  //     expect(subjects).toHaveLength(defaultProps.subjects.length);
  //   });

  //   it('renders each subject as an anchor element', () => {
  //     render(<UserSubjectsSidebar {...defaultProps} />);

  //     const subjectElements = screen.getAllByRole('link');

  //     subjectElements.forEach((element, index) => {
  //       const subjectName = defaultProps.subjects[index].name;
  //       expect(element).toHaveTextContent(subjectName);
  //       expect(element).toHaveAttribute('aria-label', `Subject: ${subjectName}`);
  //     });
  //   });

  it('handles empty subjects array', () => {
    render(<UserSubjectsSidebar subjects={[]} />);

    const card = screen.getByLabelText('User Policy Subjects');
    expect(card).toBeInTheDocument();

    const subjects = screen.queryAllByRole('link');
    expect(subjects).toHaveLength(0);
  });

  it('renders subjects container with appropriate label', () => {
    render(<UserSubjectsSidebar {...defaultProps} />);

    const subjectsGroup = screen.getByLabelText('Subject tags');
    expect(subjectsGroup).toBeInTheDocument();
  });
});
