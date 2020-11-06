import { ReactComponent as CompassIcon } from 'bootstrap-icons/icons/compass.svg';
import { ReactComponent as FileEarmarkIcon } from 'bootstrap-icons/icons/file-earmark.svg';
import { ReactComponent as PeopleIcon } from 'bootstrap-icons/icons/people.svg';
import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ActivityCard from '../components/ActivityPanel';
import activitiesMock from '../components/ActivityPanel/tempMockActivities';
import Button from '../components/core/Button';
import { CardContainer } from '../components/core/Container';
import Divider from '../components/core/Divider';
import Icon from '../components/core/Icon';
import Section, { Body, Header as SectionHeader, SubHeader } from '../components/core/Section';
import { challenges, community, odyssey, projects } from '../components/core/Typography.dummy.json';
import { ChallengeCard, ProjectCard } from '../components/Ecoverse/Cards';
import { useUpdateNavigation } from '../hooks/useNavigation';
import { PageProps } from './common';

const Ecoverse: FC<PageProps> = ({ paths }): React.ReactElement => {
  const { url } = useRouteMatch();
  useUpdateNavigation({ currentPaths: paths });

  return (
    <>
      <Section details={<ActivityCard title={'ecoverse activity'} items={activitiesMock} />}>
        <SectionHeader text={odyssey.header} />
        <SubHeader text={odyssey.subheader} />
        <Body text={odyssey.body}>
          <Button text="Learn more" onClick={ev => console.log(ev)} />
        </Body>
      </Section>
      <Divider />
      <Section avatar={<Icon component={CompassIcon} color="primary" size="xl" />}>
        <SectionHeader text={challenges.header} />
        <SubHeader text={challenges.subheader} />
        <Body text={challenges.body}></Body>
      </Section>
      <CardContainer cardHeight={320} xs={12} md={6} lg={4} xl={3}>
        {challenges.list.map((props, i) => (
          <ChallengeCard key={i} {...props} url={`${url}/challenges/${props.id}`} />
        ))}
      </CardContainer>
      <Divider />
      <Section avatar={<Icon component={PeopleIcon} color="primary" size="xl" />}>
        <SectionHeader text={community.header} />
        <SubHeader text={community.subheader} />
        <Body text={community.body}>
          <Button variant="primary" text="Explore and connect" onClick={ev => console.log(ev)} />
        </Body>
      </Section>
      <Divider />
      <Section avatar={<Icon component={FileEarmarkIcon} color="primary" size="xl" />}>
        <SectionHeader text={projects.header} tagText={projects.headerTag} />
        <SubHeader text={projects.subheader} />
      </Section>
      <CardContainer cardHeight={480} xs={12} md={6} lg={4} xl={3}>
        {projects.list.map((props, i) => (
          <ProjectCard key={i} {...props} />
        ))}
      </CardContainer>
      <Divider />
    </>
  );
};

export { Ecoverse };