import React, { useEffect, useState } from 'react';
import { Flex, ActionIcon, Text } from '@mantine/core';
import {
  IconArrowBigUpLine,
  IconArrowBigDownLine,
  IconArrowBigDownLineFilled,
  IconArrowBigUpLineFilled,
} from '@tabler/icons-react';
import classes from './support-oppose.module.css';

interface SupportOpposeProps {
  initialSupportCount: number;
  initialOpposeCount: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}k`;
  }
  return num.toString();
};

const SupportOpposeButtons: React.FC<SupportOpposeProps> = ({
  initialSupportCount,
  initialOpposeCount,
}) => {
  // State variables
  const [supportCount, setSupportCount] = useState<number>(initialSupportCount);
  const [opposeCount, setOpposeCount] = useState<number>(initialOpposeCount);
  const [userAction, setUserAction] = useState<'support' | 'oppose' | null>(null);

  useEffect(() => {
    // const fetchInitialCounts = async () => {
    //   try {
    //     const response = await axios.get('/api/initial-counts');
    //     setSupportCount(response.data.supportCount);
    //     setOpposeCount(response.data.opposeCount);
    //   } catch (error) {
    //     console.error('Error fetching initial counts:', error);
    //   }
    // };
    // fetchInitialCounts();
  }, []);

  const handleSupportClick = async () => {
    if (userAction === 'support') {
      setSupportCount(supportCount - 1); // Revert support count
      setUserAction(null); // Reset user action
      await updateCountsOnServer(supportCount - 1, opposeCount);
      return;
    }
    if (userAction === 'oppose') {
      setOpposeCount(opposeCount - 1); // Revert oppose if previously opposed
    }
    setSupportCount(supportCount + 1);
    setUserAction('support');
    await updateCountsOnServer(supportCount + 1, opposeCount);
  };

  const handleOpposeClick = async () => {
    if (userAction === 'oppose') {
      setOpposeCount(opposeCount - 1); // Revert oppose count
      setUserAction(null); // Reset user action
      await updateCountsOnServer(supportCount, opposeCount - 1);
      return;
    }
    if (userAction === 'support') {
      setSupportCount(supportCount - 1); // Revert support if previously supported
    }
    setOpposeCount(opposeCount + 1);
    setUserAction('oppose');
    await updateCountsOnServer(supportCount, opposeCount + 1);
  };

  const updateCountsOnServer = async (newSupportCount: number, newOpposeCount: number) => {
    // try {
    //   await axios.post('/api/update-counts', {
    //     supportCount: newSupportCount,
    //     opposeCount: newOpposeCount,
    //   });
    // } catch (error) {
    //   console.error('Error updating counts on server:', error);
    // }
  };

  return (
    <Flex>
      <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
        <ActionIcon variant="transparent" radius="md" size={32} onClick={handleSupportClick}>
          {userAction === 'support' ? (
            <IconArrowBigUpLineFilled className={classes.like} stroke={1.2} />
          ) : (
            <IconArrowBigUpLine className={classes.like} stroke={1.2} />
          )}
        </ActionIcon>
        <Text ta="center" fz="xs">
          {formatNumber(supportCount)}
        </Text>
      </Flex>

      <Flex gap={0} justify="center" align="center" direction="row" wrap="nowrap">
        <ActionIcon variant="transparent" radius="md" size={32} onClick={handleOpposeClick}>
          {userAction === 'oppose' ? (
            <IconArrowBigDownLineFilled className={classes.like} stroke={1.2} />
          ) : (
            <IconArrowBigDownLine className={classes.like} stroke={1.2} />
          )}
        </ActionIcon>
        <Text ta="center" fz="xs">
          {formatNumber(opposeCount)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SupportOpposeButtons;
