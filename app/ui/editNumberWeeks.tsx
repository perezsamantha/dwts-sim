'use client';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useBoundStore } from '../store/useStore';
import { useState } from 'react';

export default function EditNumberWeeks() {
  const { numberWeeks, updateNumberWeeks, resetSim } = useBoundStore();

  const weekOptions = Array.from({ length: 5 }, (_, i) => i + 8);

  const [tab, setTab] = useState(numberWeeks - 8);

  const handleChange = (index: number) => {
    setTab(index);
    updateNumberWeeks(index + 8);
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
        {weekOptions.map((week) => (
          <Tab key={week}>{week}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
