'use client';

import React, { useState } from 'react';
import { AtelierOpeningExperience } from './AtelierOpeningExperience';
import { MarginaliaBorders } from './MarginaliaBorders';

export const ClientExperienceShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [replayKey, setReplayKey] = useState<number>(0);
  const [forceOpening, setForceOpening] = useState<boolean>(false);

  const handleReplay = () => {
    setForceOpening(true);
    setReplayKey((k) => k + 1);
  };

  return (
    <>
      {/* Dynamic Desktop & Mobile Entrance Sequences */}
      <AtelierOpeningExperience
        key={replayKey}
        forceOpen={forceOpening}
        onComplete={() => setForceOpening(false)}
      />

      {/* Handloom Selvage Borders & Vertical Editorial Margins */}
      <MarginaliaBorders onReplayOpening={handleReplay} />

      {/* Main Page Elements */}
      {children}
    </>
  );
};
