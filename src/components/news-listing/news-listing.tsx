import { Box } from '@mantine/core';
import { NewsCard } from '../news-card/news-card';

/**### '

**New Delhi, 26th July 2024** –  */

const newsListingData = [
  {
    id: 1,
    image:
      'https://staticimg.amarujala.com/assets/images/2022/04/17/janani-suraksha-yojana_1650174950.jpeg?w=674&dpr=1.0',
    title:
      'Union Government allocates ₹2,116.19 crores to promote in hospital deliveries. Aims To reduce maternal and neonatal mortality',
    description:
      'The Union Government has allocated ₹2,116.19 crores to promote in-hospital deliveries and reduce maternal and neonatal mortality. ₹1,709.23 crores will go to Low Performing States like Assam, Bihar, and Uttar Pradesh under the Janani Suraksha Yojana in FY 2023-24. Utilization rates have improved to 83%. The scheme provides financial incentives ranging from ₹600 to ₹1400 to encourage hospital deliveries. Over 1 million Accredited Social Health Activists (ASHAs) have been appointed to support safer childbirths.',
    badges: [
      { label: 'Ministry of Health & Family Welfare' },
      { label: 'Department of Health and Family Welfare' },
      { label: 'Smt. Anupriya Patel' },
      { label: 'Shri Pradeep Kumar Singh' },
    ],
    location: {
      name: 'New Delhi',
    },
    date: 'July 26, 2024',
  },
  {
    id: 2,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/CHAMAR_REGIMENT_BADGE.png',
    title: 'Government Rules Out Re-establishment of Chamar/Jatav Regiment',
    description:
      "In response to a question in Lok Sabha, the Government reiterated its policy against raising new regiments for specific classes, communities, religions, or regions. The minister of state responded that despite the Chamar/Jatav Regiment's WWII valor, there are no plans to revive it. Recruitment in the Indian Army is based on domicile and merit, ensuring equal opportunities for all citizens, confirmed the Minister of State for Defence.",
    badges: [
      { label: 'Ministry of Defence' },
      { label: 'Department of Military Affairs' },
      { label: 'Shri Sanjay Seth' },
      { label: 'Shri Arun Kumar Sagar' },
    ],
    location: {
      name: 'New Delhi',
    },
    date: 'July 26, 2024',
  },
  {
    id: 3,
    image:
      'https://media.licdn.com/dms/image/D4D12AQGMcLysVTOTGQ/article-cover_image-shrink_600_2000/0/1663924914690?e=2147483647&v=beta&t=HifjxcBkfvOoJ9t4DsgvWYKiA___sMgPdVN2cS72EpU',
    title: "Indian Army Launches IoT-Based Generator System 'Vidyut Rakshak",
    description:
      "The Indian Army has launched 'Vidyut Rakshak,' an IoT-based generator monitoring and control system. Initially deployed in the Leh-Ladakh region, it enhances operational efficiency by enabling remote control and fault prediction for multiple generators. Developed at a cost of ₹5 Lakh, it significantly boosts the Army's capability in remote areas.",
    badges: [
      { label: 'Ministry of Defence' },
      { label: 'Department of Military Affairs' },
      { label: 'Shri Sanjay Seth' },
      { label: 'Shri DhairyaSheel Sambhajirao Mane' },
      { label: 'Shri Sudheer Gupta' },
    ],
    location: {
      name: 'New Delhi',
    },
    date: 'July 26, 2024',
  },
];

export function NewsListing() {
  return (
    <>
      {newsListingData.map((news: any) => {
        return (
          <Box mb="md">
            <NewsCard newsData={news} key={news.id} />
          </Box>
        );
      })}
    </>
  );
}
