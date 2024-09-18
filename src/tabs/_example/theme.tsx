import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react';

export default () => {
  const tabPanels = [
    {
      value: '1',
      label: '选项',
    },
    {
      value: '2',
      label: '选项',
    },
    {
      value: '3',
      label: '选项',
    },
    {
      value: '4',
      label: '选项',
    },
  ];

  return (
    <div className="demo-tab-bar">
      <Tabs defaultValue={'1'} theme="tag">
        {tabPanels.map((item, index) => (
          <TabPanel key={index} value={item.value} label={item.label}></TabPanel>
        ))}
      </Tabs>
      <Tabs defaultValue={'1'} theme="card">
        {tabPanels.map((item, index) => (
          <TabPanel key={index} value={item.value} label={item.label}></TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
