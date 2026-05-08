import {
  MriAvatar,
  MriAvatarImage,
  MriAvatarFallback,
  MriButton,
} from '@mriqbox/ui-kit';
import { Github, Coffee } from 'lucide-react';

interface Props {
  image: string;
  username: string;
  kofiName?: string;
}

const ContributorLink: React.FC<Props> = ({ image, username, kofiName }) => {
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="flex w-40 flex-col items-center justify-center gap-2">
      <MriAvatar className="h-24 w-24 shadow-md">
        <MriAvatarImage src={image} alt={`${username}-avatar`} />
        <MriAvatarFallback>{initials}</MriAvatarFallback>
      </MriAvatar>

      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="w-full no-underline">
        <MriButton className="w-full bg-primary/20 text-primary hover:bg-primary/30">
          <Github />
          {username}
        </MriButton>
      </a>

      {kofiName && (
        <a href={`https://ko-fi.com/${kofiName}`} target="_blank" rel="noreferrer" className="w-full no-underline">
          <MriButton className="w-full bg-primary/20 text-primary hover:bg-primary/30">
            <Coffee />
            Apoie
          </MriButton>
        </a>
      )}
    </div>
  );
};

export default ContributorLink;
