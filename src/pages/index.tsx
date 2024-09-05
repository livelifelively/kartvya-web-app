import { About } from '@/components/about/about';
import NoSideBarsAppShell from '@/components/app-shell/no-sidebars-app-shell';

function AboutPage() {
  return (
    <NoSideBarsAppShell title="About Us - Kartvya" showFooter={false}>
      <About />
    </NoSideBarsAppShell>
  );
}

AboutPage.auth = false;

export default AboutPage;
