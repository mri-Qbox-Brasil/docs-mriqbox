import React from 'react';
import { IconBrandGithub, IconTag, IconFileText, IconDownload, IconBrandNpm } from '@tabler/icons-react';

interface Props {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  side?: 'left' | 'right';
  link?: string;
  label?: string;
}

const Button: React.FC = ({ side = 'left', children, icon, link }: Props) => {
  return (
    <div className="h-fit w-fit">
      <a href={link}>
        <div className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500/20 p-2 text-green-500 hover:bg-green-500/30">
          {side === 'left' && <div>{icon}</div>}
          {children}
          {side === 'right' && <div>{icon}</div>}
        </div>
      </a>
    </div>
  );
};

export default Button;

export function GhButton(props: Props) {
  return (
    <Button icon={<IconBrandGithub />} side={props.side} link={props.link}>
      {props.label || "Github"}
    </Button>
  );
}

export function DocButton(props: Props) {
  return (
    <Button icon={<IconFileText />} side={props.side} link={props.link}>
      {props.label || "Documentação"}
    </Button>
  );
}

export function DownloadButton(props: Props) {
  return (
    <Button icon={<IconDownload />} side={props.side} link={props.link}>
      {props.label || "Download"}
    </Button>
  );
}

export function ReleaseButton(props: Props) {
  return (
    <Button icon={<IconTag />} side={props.side} link={props.link}>
      {props.label || "Releases"}
    </Button>
  );
}

export function NpmButton(props: Props) {
  return (
    <Button icon={<IconBrandNpm />} side={props.side} link={props.link}>
      {props.label || "Pacote"}
    </Button>
  );
}
