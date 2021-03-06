import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { FourOuFour } from '../../pages';
import { Path } from '../../context/NavigationProvider';
import ApplicationPage from '../../components/Admin/Community/ApplicationPage';
import { ApplicationInfoFragment } from '../../types/graphql-schema';
import ApplicationDetailsPage from '../../components/Admin/Community/ApplicationDetailsPage';

interface Props {
  paths: Path[];
  applications: ApplicationInfoFragment[];
}

export const ApplicationRoute: FC<Props> = ({ paths, applications }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:appId`}>
        <ApplicationDetailsPage />
      </Route>
      <Route path={path}>
        <ApplicationPage paths={paths} applications={applications} />
      </Route>
      <Route path="*">
        <FourOuFour />
      </Route>
    </Switch>
  );
};
