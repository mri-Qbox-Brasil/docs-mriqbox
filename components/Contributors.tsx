import React, { useEffect, useState } from "react";
import ContributorLink from "./ContributorLink";

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("https://users.mriqbox.com.br/public/members.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContributors();
  }, []);

  if (error) {
    return <div className="text-red-500">Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="mt-2 flex flex-wrap justify-evenly gap-4">
      {contributors.length > 0 ? (
        contributors.map((contributor) => (
          <ContributorLink
            key={contributor.id}
            image={contributor.avatar_url}
            username={contributor.login}
          />
        ))
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default Contributors;