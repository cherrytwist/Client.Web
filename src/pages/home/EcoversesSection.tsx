import React, { useMemo } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CardContainer } from '../../components/core/Container';
import Loading from '../../components/core/Loading';
import EcoverseCard from '../../components/Ecoverse/EcoverseCard';
import ErrorBlock from '../../components/core/ErrorBlock';
import { useUserContext } from '../../hooks/useUserContext';
import { useUpdateNavigation } from '../../hooks/useNavigation';
import { useEcoversesWithActivityQuery } from '../../generated/graphql';

const EcoversesSection = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { data, loading, error } = useEcoversesWithActivityQuery();
  const ecoverses = data?.ecoverses || [];

  const currentPaths = useMemo(() => [], []);
  useUpdateNavigation({ currentPaths });

  return (
    <>
      {loading ? (
        <Loading text={'Loading ecoverses'} />
      ) : error ? (
        <Col xs={12}>
          <ErrorBlock blockName="Ecoverses" />
        </Col>
      ) : (
        <CardContainer cardHeight={540} xs={12} md={6} lg={4} xl={3}>
          {ecoverses.map((ecoverse, i) => {
            const anonymousReadAccess = ecoverse?.authorization?.anonymousReadAccess;
            return (
              <EcoverseCard
                key={i}
                id={ecoverse.id}
                name={ecoverse.displayName}
                activity={ecoverse?.activity || []}
                context={{
                  tag: user?.ofEcoverse(ecoverse.id) ? t('components.card.you-are-in') : '',
                  tagline: ecoverse?.context?.tagline || '',
                  visual: {
                    background: ecoverse?.context?.visual?.background || '',
                  },
                }}
                authorization={{
                  anonymousReadAccess: anonymousReadAccess != null ? anonymousReadAccess : true,
                }}
                tags={ecoverse?.tagset?.tags || []}
                url={`/${ecoverse.nameID}`}
              />
            );
          })}
        </CardContainer>
      )}
    </>
  );
};

export default EcoversesSection;
