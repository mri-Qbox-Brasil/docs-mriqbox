import React, { useEffect, useState } from 'react';
import { IconBrandGithub, IconTag, IconFileText, IconDownload, IconBrandNpm } from '@tabler/icons-react';

interface Props {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  side?: 'left' | 'right';
  link?: string;
  label?: string;
  repo?: string;
}

interface ReleaseInfo {
  tag_name: string;
  published_at: string;
}

function formatRelativeTime(iso: string) {
  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
  const diffMs = new Date(iso).getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diffSec) >= secs || unit === 'second') {
      return rtf.format(Math.round(diffSec / secs), unit);
    }
  }
  return '';
}

function useLatestRelease(repo?: string) {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    if (!repo) return;

    const cacheKey = `gh-release:${repo}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setRelease(JSON.parse(cached));
        return;
      }
    } catch {}

    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        const info: ReleaseInfo = {
          tag_name: data.tag_name,
          published_at: data.published_at,
        };
        setRelease(info);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(info));
        } catch {}
      })
      .catch(() => {});
  }, [repo]);

  return release;
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
  const release = useLatestRelease(props.repo);

  return (
    <Button icon={<IconDownload />} side={props.side} link={props.link}>
      <div className="flex flex-col leading-tight">
        <span>{props.label || "Download"}</span>
        {release && (
          <span className="text-xs opacity-75">
            {release.tag_name} · atualizado {formatRelativeTime(release.published_at)}
          </span>
        )}
      </div>
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
