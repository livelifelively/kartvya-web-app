import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function ExplorePage() {
  return (
    <>
      <ResponsiveAppShell>
        {/* <SubjectBadges /> */}
        <NewsListing />
      </ResponsiveAppShell>
    </>
  );
}

ExplorePage.auth = true;

export default ExplorePage;
