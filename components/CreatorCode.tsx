import React from 'react';
import { MriCard, MriCardContent, MriCopyButton } from '@mriqbox/ui-kit';

interface Props {
  storeName: string;
  storeLink: string;
  storeImage: string;
  code: string;
  percentOff: number;
}

const CreatorCode: React.FC<Props> = ({ storeName, storeLink, code, percentOff, storeImage }) => {
  return (
    <MriCard className="overflow-hidden">
      <a
        href={storeLink}
        target="_blank"
        rel="noreferrer"
        className="flex h-[150px] items-center justify-center bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <img className="self-center" width="150" src={storeImage} alt={storeName} />
      </a>
      <MriCardContent className="flex flex-col items-center gap-2 p-2 pt-2">
        <p className="line-clamp-1 text-lg font-bold">{storeName}</p>
        <p className="flex items-center gap-1 text-sm">
          Code: <code className="font-bold">{code}</code>
          <MriCopyButton text={code} iconSize={4} />
        </p>
        <p className="mt-4 self-end text-sm font-bold text-red-400">{percentOff}% off</p>
      </MriCardContent>
    </MriCard>
  );
};

export default CreatorCode;
