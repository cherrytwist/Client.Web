import React, { FC, useMemo } from 'react';
import { FourOuFour, PageProps } from '../../pages';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useOpportunityGroupsQuery, useOpportunityNameQuery } from '../../generated/graphql';
import ManagementPageTemplate from '../../components/Admin/ManagementPageTemplate';
import { managementData } from '../../components/Admin/managementData';
import CreateGroupPage from '../../components/Admin/Group/CreateGroupPage';
import OppChallPage, { ProfileSubmitMode } from '../../components/Admin/OppChallPage';
import { GroupPage } from '../../components/Admin/Group/GroupPage';
import { AdminParameters } from './admin';
import { ChallengeOpportunities } from './challenge';
import { ListPage } from '../../components/Admin';

export const OpportunitiesRoutes: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();

  const currentPaths = useMemo(() => [...paths, { value: url, name: 'opportunities', real: true }], [paths]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ChallengeOpportunities paths={currentPaths} />
      </Route>
      <Route exact path={`${path}/new`}>
        <OppChallPage title={'Create opportunity'} mode={ProfileSubmitMode.createOpportunity} paths={currentPaths} />
      </Route>
      <Route path={`${path}/:opportunityId`}>
        <OpportunityRoutes paths={currentPaths} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};

export const OpportunityRoutes: FC<PageProps> = ({ paths }) => {
  const { path, url } = useRouteMatch();
  const { opportunityId } = useParams<AdminParameters>();

  const { data } = useOpportunityNameQuery({ variables: { id: Number(opportunityId) } });

  const currentPaths = useMemo(() => [...paths, { value: url, name: data?.opportunity?.name || '', real: true }], [
    paths,
    data?.opportunity?.name,
    url,
  ]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ManagementPageTemplate data={managementData.opportunityLvl} paths={currentPaths} />
      </Route>
      <Route exact path={`${path}/groups`}>
        <OpportunityGroups paths={currentPaths} />
      </Route>
      <Route exact path={`${path}/groups/new`}>
        <CreateGroupPage action={'createOpportunityGroup'} paths={currentPaths} />
      </Route>
      <Route exact path={`${path}/edit`}>
        <OppChallPage title={'Edit opportunity'} mode={ProfileSubmitMode.updateOpportunity} paths={currentPaths} />
      </Route>
      <Route exact path={`${path}/groups/:groupId`}>
        <GroupPage paths={currentPaths} />
      </Route>
    </Switch>
  );
};

const OpportunityGroups: FC<PageProps> = ({ paths }) => {
  const { url } = useRouteMatch();
  const { opportunityId } = useParams<AdminParameters>();

  const { data } = useOpportunityGroupsQuery({ variables: { id: Number(opportunityId) } });

  const groups = data?.opportunity?.groups?.map(g => ({ id: g.id, value: g.name, url: `${url}/${g.id}` }));

  return <ListPage paths={paths} data={groups || []} newLink={`${url}/new`} />;
};