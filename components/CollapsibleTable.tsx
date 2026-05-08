import React from 'react';
import {
  MriAccordion,
  MriAccordionItem,
  MriAccordionTrigger,
  MriAccordionContent,
} from '@mriqbox/ui-kit';

interface Props {
  children?: React.ReactNode;
  label?: string;
}

const CollapsibleTable: React.FC<Props> = ({ children, label = 'Lista' }) => {
  return (
    <MriAccordion type="single" collapsible className="mt-4 w-full">
      <MriAccordionItem value="list">
        <MriAccordionTrigger>{label}</MriAccordionTrigger>
        <MriAccordionContent>{children}</MriAccordionContent>
      </MriAccordionItem>
    </MriAccordion>
  );
};

export default CollapsibleTable;
