import { Box, ScrollArea } from '@mantine/core';
import { IconBuildingBank, IconAffiliate, IconMessageDots, IconBinoculars, IconUserScan } from '@tabler/icons-react';
import classes from './navbar-nested.module.css';
import { LinksGroup } from './navbar-links-group';
import UserProfileSnippet from '../user-name-sidebar/user-name-sidebar';
import UserMainLocationSidebar from '../user-main-location-sidebar/user-main-location-sidebar';
import UserNameSidebar from '../user-name-sidebar/user-name-sidebar';
import UserSubjectsSidebar from '../user-subjects-sidebar/user-subjects-sidebar';

const mockdata = [
  //   {
  //     label: 'Market news',
  //     icon: IconNotes,
  //     initiallyOpened: true,
  //     links: [
  //       { label: 'Overview', link: '/' },
  //       { label: 'Forecasts', link: '/' },
  //       { label: 'Outlook', link: '/' },
  //       { label: 'Real time', link: '/' },
  //     ],
  //   },
  { label: 'Know', icon: IconBuildingBank, link: '/citizen/know' },
  { label: 'Express', icon: IconMessageDots, link: '/citizen/express' },
  { label: 'Collaborate', icon: IconAffiliate, link: '/citizen/collaborate' },
  { label: 'Explore', icon: IconBinoculars, link: '/citizen/explore' },
  { label: 'Profile', icon: IconUserScan, link: '/citizen/profile' },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <ScrollArea className={classes.links}>
      <Box>
        <UserNameSidebar
          userName="Ashish Rana"
          userHandle="livelifelively"
          profileImageUrl="https://media.licdn.com/dms/image/v2/C4D03AQE_YrkBZCgHKQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516492214108?e=2147483647&v=beta&t=cfCDWwBS1R0Kusu6ssLBzkc_MtDAEFUxgei88KDd3MM"
          status="Democracy is a system of government where power is held by the people and exercised through elected representatives."
        />
      </Box>
      <Box mt="xs">
        <UserMainLocationSidebar
          mainLocation={{
            state: 'Maharashtra',
            stateId: '1',
            district: 'Mumbai',
            districtId: '1',
            vidhansabha: 'Mumbai Vidhansabha',
            vidhansabhaId: '1',
            loksabha: 'Mumbai Lok Sabha',
            loksabhaId: '1',
          }}
        />
      </Box>
      {/* <div className={classes.linksInner}>{links}</div> */}
      <Box mt="xs">
        <UserSubjectsSidebar
          subjects={[
            { name: 'Defence', id: '1' },
            { name: 'Foreign Relations', id: '2' },
            { name: 'Economy', id: '3' },
            { name: 'Healthcare', id: '4' },
            { name: 'Education', id: '5' },
            { name: 'Environment', id: '6' },
            { name: 'Culture', id: '7' },
            { name: 'Sports', id: '8' },
            { name: 'Information Technology', id: '9' },
            { name: 'State Government Finance', id: '10' },
            { name: 'Union Government Finance', id: '11' },
            { name: 'Politics', id: '12' },
            { name: 'Law and Order', id: '13' },
          ]}
        />
      </Box>
    </ScrollArea>
  );
}
