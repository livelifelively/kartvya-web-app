import { Box } from '@mantine/core';
import { NewsCard } from '../news-card/news-card';

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
  {
    id: 4,
    image:
      'https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/shethepeople/media/media_files/gpDBnjz75xRgSBpl1Jna.jpg',
    title: 'Sainik Schools are Co-Educational, Open to Partnerships for All-Girls Sainik Schools',
    description:
      'The Ministry of Defense clarified in Lok Sabha that all 33 existing Sainik Schools are co-educational, with 1541 girls enrolled. While no new all-girls Sainik Schools are planned under the traditional model, partnerships with NGOs and private entities are encouraged. Samvid Gurukulam in Mathura, UP, has been approved as an all-girls Sainik School',
    badges: [
      { label: 'Ministry of Defence' },
      { label: 'Department of Military Affairs' },
      { label: 'Shri Sanjay Seth' },
      { label: 'Shri Brijmohan Agrawal' },
    ],
    location: {
      name: 'New Delhi',
    },
    date: 'July 26, 2024',
  },
  {
    id: 5,
    image:
      'https://www2.gov.bc.ca/assets/gov/public-safety-and-emergency-services/emergency-preparedness-response-recovery/embc/preparedbc/decorative-graphics/know-your-hazards/pandemics/pandemic-preparedness-banner.png',
    title: 'Govt Highlights Pan India Disease Surveillance Platform',
    description:
      'India has a system called the Integrated Disease Surveillance Programme (IDSP) to keep track of diseases and protect public health. Using an online platform, Integrated Health Information Platform (IHIP), it collects real-time data to quickly detect and control disease outbreaks. In 2023, there were 1,862 outbreaks, with Kerala (253), Karnataka (223), and Maharashtra (208) reporting the most. The system monitors diseases like COVID-19, Monkeypox, and Dengue. Health workers, doctors, and labs gather and report data nationwide. This helps in early detection and quick response, ensuring public safety. The IDSP has been operational since 2004 and covers all 36 States and Union Territories. This information was shared by the Ministry of Health and Family Welfare in response to a question in the Lok Sabha.',
    badges: [
      { label: 'Ministry of Defence' },
      { label: 'Department of Military Affairs' },
      { label: 'Smt. Anupriya Patel' },
      { label: 'Smt. Poonamben Hematbhai Maadam' },
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
