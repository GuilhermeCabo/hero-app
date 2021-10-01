import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

type Hero = {
  id: string;
  name: string;
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
};

interface RouteParams {
  id: string;
}

export const Hero: React.FC = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const getHero = async () => {
      const { data } = await api.get(`/${id}`);
      setHero(data);
      setLoading(false);
    };

    getHero();
  }, [setHero, setLoading]);

  return (
    <Container>
      {hero && (
        <>
          <h3>{hero.name} </h3> <img src={hero.image?.url} alt={hero.name} />
          <div>
            <div>
              <h2>Biography</h2>
              <div>
                <strong>Full Name: </strong>
                <span>{hero.biography["full-name"]}</span>
              </div>
              <div>
                <strong>Alter egos: </strong>
                <span>{hero.biography["alter-egos"]}</span>
              </div>
              <div>
                <strong>Alias: </strong>
                {hero.biography.aliases.reduce((previous, current, index) => {
                  if (!index) return current;
                  return `${previous}, ${current}`;
                })}
              </div>
            </div>
            <div>
              <strong>Occupation: </strong>
              <span>{hero.work.occupation}</span>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
