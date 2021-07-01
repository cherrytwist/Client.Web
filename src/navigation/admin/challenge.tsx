import React, { FC, useMemo } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { ListPage } from '../../components/Admin/ListPage';
import { managementData } from '../../components/Admin/managementData';
import ManagementPageTemplate from '../../components/Admin/ManagementPageTemplate';
import OppChallPage, { ProfileSubmitMode } from '../../components/Admin/OppChallPage';
import { useChallengeCommunityQuery, useEcoverseCommunityQuery, useOpportunitiesQuery } from '../../generated/graphql';
import { useEcoverse } from '../../hooks/useEcoverse';
import { useUpdateNavigation } from '../../hooks/useNavigation';
import { FourOuFour, PageProps } from '../../pages';
import ChallengeList from '../../pages/Admin/Challenge/ChallengeList';
import { AdminParameters } from './admin';
import AuthorizationRoute from './authorization';
import { CommunityRoute } from './community';
import { OpportunitiesRoutes } from './opportunity';

export const ChallengesRoute: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();

  const currentPaths = useMemo(() => [...paths, { value: url, name: 'challenges', real: true }], [paths]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ChallengeList paths={currentPaths} />
      </Route>
      <Route path={`${path}/new`}>
        <OppChallPage mode={ProfileSubmitMode.createChallenge} paths={currentPaths} title="New challenge" />
      </Route>
      <Route exact path={`${path}/:challengeId/edit`}>
        <OppChallPage mode={ProfileSubmitMode.updateChallenge} paths={currentPaths} title="Edit challenge" />
      </Route>
      <Route path={`${path}/:challengeId`}>
        <ChallengeRoutes paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};

const ChallengeRoutes: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();
  const { challengeId } = useParams<AdminParameters>();
  const { ecoverseId } = useEcoverse();

  const { data } = useChallengeCommunityQuery({ variables: { ecoverseId, challengeId } });
  const { data: ecoverseCommunity } = useEcoverseCommunityQuery({ variables: { ecoverseId } });

  const currentPaths = useMemo(
    () => [...paths, { value: url, name: data?.ecoverse?.challenge?.displayName || '', real: true }],
    [paths, data?.ecoverse?.challenge?.displayName]
  );

  const community = data?.ecoverse?.challenge?.community;
  const parentMembers = ecoverseCommunity?.ecoverse?.community?.members || [];
  const challengeUUID = data?.ecoverse.challenge.id || '';

  useUpdateNavigation({ currentPaths });

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ManagementPageTemplate data={managementData.challengeLvl} paths={currentPaths} />
      </Route>
      <Route path={`${path}/community`}>
        <CommunityRoute paths={currentPaths} community={community} parentMembers={parentMembers} />
      </Route>
      <Route path={`${path}/opportunities`}>
        <OpportunitiesRoutes paths={currentPaths} />
      </Route>
      <Route path={`${path}/authorization`}>
        <AuthorizationRoute paths={currentPaths} resourceId={challengeUUID} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};
export const ChallengeOpportunities: FC<PageProps> = ({ paths }) => {
  const { url } = useRouteMatch();
  const { challengeId } = useParams<AdminParameters>();
  const { ecoverseId } = useEcoverse();

  const { data } = useOpportunitiesQuery({ variables: { ecoverseId, challengeId } });

  const opportunities = data?.ecoverse?.challenge?.opportunities?.map(o => ({
    id: o.id,
    value: o.displayName,
    url: `${url}/${o.id}`,
  }));

  return (
    <>
      <ListPage paths={paths} data={opportunities || []} newLink={`${url}/new`} />
    </>
  );
};
