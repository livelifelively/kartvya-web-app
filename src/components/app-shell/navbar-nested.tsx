import { ScrollArea } from '@mantine/core';
import {
  IconBuildingBank,
  IconAffiliate,
  IconMessageDots,
  IconBinoculars,
  IconUserScan,
} from '@tabler/icons-react';
import classes from './navbar-nested.module.css';
import { LinksGroup } from './navbar-links-group';

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
      <div className={classes.linksInner}>{links}</div>
    </ScrollArea>
  );
}
