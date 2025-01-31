import { useState } from 'react';
import { Box, Button, Checkbox, Grid, Group, ScrollArea, Stack, Text, Title } from '@mantine/core';
import classes from './onboarding.module.css';

const data = [
  {
    id: 'national_security_and_foreign_affairs',
    name: 'National Security & Foreign Affairs',
    description: 'Domains related to defense, international relations, and national security.',
    linked_domains: ['defence', 'international relations'],
  },
  {
    id: 'science_technology_and_innovation',
    name: 'Science, Technology & Innovation',
    description:
      'Domains related to scientific advancement, research, technology development, and digital infrastructure.',
    linked_domains: [
      'space',
      'meteorology',
      'research and development',
      'innovation',
      'science technology',
      'information technology',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description:
      'Domains focused on public health, medical care, social support, and community well-being.',
    linked_domains: ['healthcare', 'traditional medicine'],
  },
  {
    id: 'family_and_social_welfare',
    name: 'Family & Social Welfare',
    description:
      'Domains focused on public health, medical care, social support, and community well-being.',
    linked_domains: [
      'social welfare',
      'child welfare',
      'minority welfare',
      'tribal welfare',
      'environment',
      'food security',
      'labour',
      'women empowerment',
      'consumer rights',
    ],
  },
  {
    id: 'education_and_skill_development',
    name: 'Education & Skill Development',
    description:
      'Domains related to education at all levels, vocational training and skill development.',
    linked_domains: ['education', 'vocational training', 'youth development', 'sports'],
  },
  {
    id: 'infrastructure_and_transportation',
    name: 'Infrastructure & Transportation',
    description: 'Domains related to all modes of transportation and infrastructure development.',
    linked_domains: [
      'railways',
      'road transportation',
      'ports and shipping',
      'civil aviation',
      'urban development',
      'northeast development',
    ],
  },
  {
    id: 'agriculture_and_natural_resources',
    name: 'Agriculture & Natural Resources',
    description:
      'Domains related to food production, farming, fishing, environmental protection and water management.',
    linked_domains: [
      'agriculture',
      'fishing',
      'water resources',
      'fertilizer production',
      'rural development',
    ],
  },
  {
    id: 'energy_and_resources',
    name: 'Energy & Resources',
    description: 'Domains related to energy production, distribution, mining, and petroleum.',
    linked_domains: ['energy', 'petroleum and natural gas', 'minerals'],
  },
  {
    id: 'industry_trade_and_labour',
    name: 'Industry, Trade & Labour',
    description:
      'Domains related to industrial production, commerce, trade policies and labor laws.',
    linked_domains: [
      'industries and trade',
      'heavy industry development',
      'chemical industry',
      'textile industry',
      'tourism industry',
      'food processing industry',
      'entrepreneurship',
    ],
  },
  {
    id: 'finance_and_economy',
    name: 'Finance & Economy',
    description:
      'Domains related to government finances, taxation, financial markets and economic planning.',
    linked_domains: [
      'government finances',
      'taxes and duties',
      'stock and futures markets',
      'data and statistics',
      'planning',
    ],
  },
  {
    id: 'law_governance_and_justice',
    name: 'Law, Governance & Justice',
    description: 'Domains related to the legal system, elections, law enforcement, and governance.',
    linked_domains: [
      'elections',
      'law and justice',
      'legislative affairs',
      'law enforcement',
      'local governance',
      'government officials',
      'policy implementation',
      'head of government office',
    ],
  },
  {
    id: 'media_and_communication',
    name: 'Media & Communication',
    description:
      'Domains related to public broadcasting, media, telecommunications and information technologies.',
    linked_domains: ['public broadcasting', 'communication'],
  },
  {
    id: 'society_culture_and_tourism',
    name: 'Society, Culture & Tourism',
    description: 'Domains related to history, culture, tourism and urban development.',
    linked_domains: ['history and culture', 'cooperative development'],
  },
];

export function SelectSubjects() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Checkbox.Group
      value={value}
      onChange={setValue}
      // label="Pick packages to install"
      // description="Choose all packages that you will need in your application"
    >
      {data.map((item) => (
        <Box mb={32}>
          <Title mb={16} size={'h3'}>
            {item.name}
          </Title>
          <Grid>
            {item.linked_domains.map((domain) => (
              <Grid.Col span={{ md: 4, sm: 6 }}>
                <Checkbox.Card className={classes.root} radius="md" value={domain} key={domain}>
                  <Group wrap="nowrap" align="flex-start" justify="stretch">
                    <Checkbox.Indicator />
                    <Box>
                      <Text className={classes.label}>{domain}</Text>
                      {/* <Text className={classes.description}>{item.description}</Text> */}
                    </Box>
                  </Group>
                </Checkbox.Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      ))}
    </Checkbox.Group>
  );
}
