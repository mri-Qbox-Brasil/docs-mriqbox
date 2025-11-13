import { IconBrandGithubFilled, IconCoffee } from '@tabler/icons-react';

const ContributorLink: React.FC<{ image: string; username: string; kofiName: string }> = ({ image, username, kofiName }) => {
  return (
    <div className="flex w-40 flex-col items-center justify-center gap-2">
      <img src={image} alt={`${username}-image`} className="rounded-full bg-neutral-100 shadow-md dark:bg-neutral-900" />
      <a href={`https://github.com/${username}`} target="_blank" className="w-full">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500/20 p-2 text-green-500 hover:bg-green-500/30">
          <IconBrandGithubFilled />
          {username}
        </button>
      </a>
      {kofiName &&
      <a href={`https://ko-fi.com/${kofiName}`} target="_blank" className="w-full">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500/20 p-2 text-green-500 hover:bg-green-500/30">
              <IconCoffee />
              Apoie
          </button>
          </a>
    }
    </div>
  );
};

export default ContributorLink;
