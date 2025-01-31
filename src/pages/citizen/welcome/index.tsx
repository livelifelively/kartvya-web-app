import { ResponsiveAppShell } from '@/components/app-shell';
import { NavbarNested } from '@/components/app-shell/navbar-nested';
import NoSideBarsAppShell from '@/components/app-shell/no-sidebars-app-shell';
import { OnboardingAppShell } from '@/components/app-shell/onboarding-app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
import { Onboarding } from '@/components/onboarding/onboarding';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function WelcomePage() {
  return <Onboarding />;
}

WelcomePage.auth = true;

export default WelcomePage;
