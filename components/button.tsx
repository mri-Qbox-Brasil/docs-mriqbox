import React, { useEffect, useState } from 'react';
import { MriButton } from '@mriqbox/ui-kit';
import { Github, Tag, FileText, Download, Package } from 'lucide-react';

interface Props {
  side?: 'left' | 'right';
  link?: string;
  label?: string;
  repo?: string;
}

interface ReleaseInfo {
  tag_name: string;
  published_at: string;
  downloads: number;
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

    fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`)
      .then((r) => (r.ok ? r.json() : null))
      .then((releases) => {
        if (!Array.isArray(releases) || releases.length === 0) return;
        const published = releases.filter((r: any) => !r.draft && !r.prerelease);
        const latest = published[0] ?? releases[0];
        const downloads = releases.reduce(
          (sum: number, r: any) =>
            sum + (r.assets ?? []).reduce((s: number, a: any) => s + (a.download_count ?? 0), 0),
          0,
        );
        const info: ReleaseInfo = {
          tag_name: latest.tag_name,
          published_at: latest.published_at,
          downloads,
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

interface KitButtonProps extends Props {
  icon: React.ReactNode;
  defaultLabel: string;
}

function KitLinkButton({ icon, defaultLabel, label, link, side = 'left' }: KitButtonProps) {
  return (
    <a href={link} className="no-underline">
      <MriButton variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
        {side === 'left' && icon}
        {label || defaultLabel}
        {side === 'right' && icon}
      </MriButton>
    </a>
  );
}

export default function Button(props: Props & { icon?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <KitLinkButton
      icon={props.icon}
      defaultLabel={typeof props.children === 'string' ? props.children : 'Button'}
      label={typeof props.children === 'string' ? props.children : undefined}
      link={props.link}
      side={props.side}
    />
  );
}

export function GhButton(props: Props) {
  return <KitLinkButton icon={<Github />} defaultLabel="Github" {...props} />;
}

export function DocButton(props: Props) {
  return <KitLinkButton icon={<FileText />} defaultLabel="Documentação" {...props} />;
}

export function DownloadButton(props: Props) {
  const release = useLatestRelease(props.repo);

  return (
    <a href={props.link} className="no-underline">
      <MriButton variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 h-auto">
        <Download />
        <div className="flex flex-col leading-tight">
          <span>{props.label || 'Download'}</span>
          {release && (
            <span className="text-xs opacity-75">
              {release.tag_name} · atualizado {formatRelativeTime(release.published_at)} ·{' '}
              {release.downloads.toLocaleString('pt-BR')} downloads
            </span>
          )}
        </div>
      </MriButton>
    </a>
  );
}

export function ReleaseButton(props: Props) {
  return <KitLinkButton icon={<Tag />} defaultLabel="Releases" {...props} />;
}

export function NpmButton(props: Props) {
  return <KitLinkButton icon={<Package />} defaultLabel="Pacote" {...props} />;
}
