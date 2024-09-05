import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function ProfilePage() {
  return (
    <ResponsiveAppShell>
      {/* <SubjectBadges /> */}
      <NewsListing />
    </ResponsiveAppShell>
  );
}

ProfilePage.auth = true;

export default ProfilePage;
