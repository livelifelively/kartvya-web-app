import { render, screen } from '@/test-utils';
import UserMainLocationSidebar from './user-main-location-sidebar';

describe('UserMainLocationSidebar component', () => {
  const defaultProps = {
    mainLocation: {
      state: 'Maharashtra',
      stateId: 'mh-01',
      district: 'Mumbai',
      districtId: 'mu-01',
      vidhansabha: 'Andheri East',
      vidhansabhaId: 'ae-01',
      loksabha: 'Mumbai North West',
      loksabhaId: 'mnw-01',
    },
  };

  it('renders location card with correct aria label', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);
    const card = screen.getByLabelText('User Location Information');
    expect(card).toBeInTheDocument();
  });

  it('renders all location type labels', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);

    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('District')).toBeInTheDocument();
    expect(screen.getByLabelText('Loksabha')).toBeInTheDocument();
    expect(screen.getByLabelText('Vidhansabha')).toBeInTheDocument();
  });

  it('renders state information correctly', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);

    const stateLabel = screen.getByLabelText('State');
    expect(stateLabel).toBeInTheDocument();

    const stateValue = screen.getByLabelText('State: Maharashtra');
    expect(stateValue).toBeInTheDocument();

    expect(stateValue.tagName.toLowerCase()).toBe('a');
  });

  it('renders district information correctly', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);

    const districtLabel = screen.getByLabelText('District');
    expect(districtLabel).toBeInTheDocument();

    const districtValue = screen.getByLabelText('District: Mumbai');

    expect(districtValue).toBeInTheDocument();
    expect(districtValue.tagName.toLowerCase()).toBe('a');
  });

  it('renders loksabha information correctly', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);

    const loksabhaLabel = screen.getByLabelText('Loksabha');
    expect(loksabhaLabel).toBeInTheDocument();

    const loksabhaValue = screen.getByLabelText('Loksabha: Mumbai North West');
    expect(loksabhaValue).toBeInTheDocument();
    expect(loksabhaValue.tagName.toLowerCase()).toBe('a');
  });

  it('renders vidhansabha information correctly', () => {
    render(<UserMainLocationSidebar {...defaultProps} />);

    const vidhansabhaLabel = screen.getByLabelText('Vidhansabha');
    expect(vidhansabhaLabel).toBeInTheDocument();

    const vidhansabhaValue = screen.getByLabelText('Vidhansabha: Andheri East');
    expect(vidhansabhaValue).toBeInTheDocument();
    expect(vidhansabhaValue.tagName.toLowerCase()).toBe('a');
  });
});
