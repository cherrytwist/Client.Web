import { ReactComponent as CardListIcon } from 'bootstrap-icons/icons/card-list.svg';
import clsx from 'clsx';
import React, { FC } from 'react';
import Divider from '../../components/core/Divider';
import Icon from '../../components/core/Icon';
import Section, { Body, Header as SectionHeader, SubHeader } from '../../components/core/Section';
import Tag from '../../components/core/Tag';
import { useUpdateNavigation } from '../../hooks/useNavigation';
import { createStyles } from '../../hooks/useTheme';
import { Project as ProjectType, User } from '../../types/graphql-schema';
import { PageProps } from '../common';

const useStyles = createStyles(theme => ({
  tag: {
    top: -theme.shape.spacing(2),
    left: 0,
  },
  offset: {
    marginRight: theme.shape.spacing(4),
  },
}));

interface ProjectPageProps extends PageProps {
  project: ProjectType;
  users: User[] | undefined;
  loading?: boolean;
}

const ProjectIndex: FC<ProjectPageProps> = ({ paths, project }): React.ReactElement => {
  const styles = useStyles();

  useUpdateNavigation({ currentPaths: paths });

  const { displayName: name, description, lifecycle } = project;

  return (
    <>
      <Section
        classes={{
          background: theme => theme.palette.positive,
        }}
        gutters={{
          root: true,
          content: true,
          details: false,
        }}
      >
        <SectionHeader text={name} />
        <Body text={description} />
        {lifecycle?.state && (
          <Tag text={lifecycle?.state} className={clsx('position-absolute', styles.tag)} color="neutralMedium" />
        )}
      </Section>
      <Section hideDetails avatar={<Icon component={CardListIcon} color="primary" size="xl" />}>
        <SectionHeader text={'Solution details'} />
        <SubHeader text={'How we envision the first steps'} />
        <Body />
      </Section>
      <Divider />
    </>
  );
};

export { ProjectIndex };
