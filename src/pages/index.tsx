import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function HomePage() {
  return (
    <>
      <ResponsiveAppShell>
        {/* <SubjectBadges /> */}
        <NewsListing />
      </ResponsiveAppShell>
    </>
  );
}

HomePage.auth = true;

export default HomePage;
