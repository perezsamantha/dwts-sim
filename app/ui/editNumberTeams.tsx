'use client';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useState } from 'react';

export default function EditNumberTeams() {
  const { numberTeams, updateNumberTeams, resetSim, updateCastSize } =
    useBoundStore();

  const teamOptions = Array.from({ length: 7 }, (_, i) => i + 10);

  const [tab, setTab] = useState(numberTeams - 8);

  const handleChange = (index: number) => {
    setTab(index);
    updateNumberTeams(index + 10);
    updateCastSize();
    resetSim();
  };

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="gray"
      index={tab}
      onChange={(value: number) => handleChange(value)}
    >
      <TabList>
        {teamOptions.map((team) => (
          <Tab key={team}>{team}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
