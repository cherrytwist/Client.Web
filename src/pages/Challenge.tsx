import { ReactComponent as FileEarmarkIcon } from 'bootstrap-icons/icons/file-earmark.svg';
import { ReactComponent as GemIcon } from 'bootstrap-icons/icons/gem.svg';
import { ReactComponent as JournalBookmarkIcon } from 'bootstrap-icons/icons/journal-text.svg';
import { ReactComponent as Edit } from 'bootstrap-icons/icons/pencil-square.svg';
import clsx from 'clsx';
import React, { FC, useMemo, useRef, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import ActivityCard, { ActivityCardItem } from '../components/ActivityPanel';
import ChallengeCommunitySection from '../components/Challenge/ChallengeCommunitySection';
import OpportunityCard from '../components/Challenge/OpportunityCard';
import ContextEdit from '../components/ContextEdit';
import Button from '../components/core/Button';
import { CardContainer } from '../components/core/Container';
import Divider from '../components/core/Divider';
import Icon from '../components/core/Icon';
import Markdown from '../components/core/Markdown';
import Section, { Body, Header as SectionHeader, SubHeader } from '../components/core/Section';
import Typography from '../components/core/Typography';
import { SwitchCardComponent } from '../components/Ecoverse/Cards';
import BackdropWithMessage from '../components/layout/BackdropWithMessage';
import OrganizationPopUp from '../components/Organizations/OrganizationPopUp';
import { Theme } from '../context/ThemeProvider';
import { useChallengeActivityQuery, useChallengeLifecycleQuery } from '../generated/graphql';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import { useUpdateNavigation } from '../hooks/useNavigation';
import { createStyles } from '../hooks/useTheme';
import { useUserContext } from '../hooks/useUserContext';
import { SEARCH_PAGE } from '../models/Constants';
import { Challenge as ChallengeType, Context, Organisation } from '../types/graphql-schema';
import getActivityCount from '../utils/get-activity-count';
import hexToRGBA from '../utils/hexToRGBA';
import { PageProps } from './common';

const useOrganizationStyles = createStyles(theme => ({
  organizationWrapper: {
    display: 'flex',
    gap: `${theme.shape.spacing(1)}px`,
    flexWrap: 'wrap',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  column: {
    flexDirection: 'column',
  },
  imgContainer: {
    display: 'flex',
    flex: '0 45%',
    width: '100%',
    margin: '0 auto',
  },
  img: {
    height: 'initial',
    maxWidth: '100%',
    maxHeight: 150,
    margin: '0 auto',
    objectFit: 'contain',
  },
  link: {
    marginTop: `${theme.shape.spacing(2)}px`,
    marginRight: `${theme.shape.spacing(4)}px`,
  },
}));

const OrganisationBanners: FC<{ organizations: Organisation[] }> = ({ organizations }) => {
  const { t } = useTranslation();
  const styles = useOrganizationStyles();
  const [modalId, setModalId] = useState<string | null>(null);

  return (
    <>
      <div className={clsx(styles.organizationWrapper, organizations.length === 2 && styles.column)}>
        {organizations.map((org, index) => {
          if (index > 4) return null;
          return (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`challenge-${org.id}-tooltip`}>{org.displayName}</Tooltip>}
              key={index}
            >
              <div className={styles.imgContainer} onClick={() => setModalId(org.id)}>
                <img src={org.profile?.avatar} alt={org.displayName} className={styles.img} />
              </div>
            </OverlayTrigger>
          );
        })}
      </div>

      {!!modalId && <OrganizationPopUp id={modalId} onHide={() => setModalId(null)} />}

      {organizations.length > 4 && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="challenge-rest-tooltip">{organizations.map(x => x.displayName).join(', ')}</Tooltip>}
        >
          <div className={'d-flex'}>
            <Typography variant="h3">{t('pages.challenge.organizationBanner.load-more')}</Typography>
          </div>
        </OverlayTrigger>
      )}
    </>
  );
};

interface ChallengePageProps extends PageProps {
  challenge: ChallengeType;
}

const useChallengeStyles = createStyles(theme => ({
  link: {
    marginTop: `${theme.shape.spacing(2)}px`,
    marginRight: `${theme.shape.spacing(4)}px`,
    '&:hover': {
      color: theme.palette.background,
    },
  },
  edit: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonsWrapper: {
    display: 'flex',
    gap: theme.shape.spacing(1),
  },
}));

interface Params {
  challengeId?: string;
  opportunityId?: string;
  ecoverseId?: string;
}

const Challenge: FC<ChallengePageProps> = ({ paths, challenge }): React.ReactElement => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const history = useHistory();
  const styles = useChallengeStyles();
  const { isAuthenticated } = useAuthenticationContext();
  const { user } = useUserContext();
  const { ecoverseId = '' } = useParams<Params>();

  const [isEditOpened, setIsEditOpened] = useState<boolean>(false);

  const opportunityRef = useRef<HTMLDivElement>(null);
  useUpdateNavigation({ currentPaths: paths });
  const { displayName: name, context, opportunities, leadOrganisations, id } = challenge;
  const { data: challengeLifecycleQuery } = useChallengeLifecycleQuery({ variables: { ecoverseId, challengeId: id } });
  const { references, background = '', tagline, who = '', visual } = context || {};
  const bannerImg = visual?.banner;
  const video = references?.find(x => x.name === 'video');

  const { data: _activity } = useChallengeActivityQuery({ variables: { ecoverseId, challengeId: id } });
  const activity = _activity?.ecoverse?.challenge?.activity || [];

  const projects = useMemo(
    () =>
      opportunities?.flatMap(o =>
        o?.projects?.flatMap(p => ({
          caption: o.displayName,
          url: `${url}/opportunities/${o.nameID}/projects/${p.nameID}`,
          ...p,
        }))
      ),
    [opportunities]
  );

  const challengeProjects = useMemo(
    () => [
      ...(projects || []).map(p => ({
        title: p?.displayName || '',
        description: p?.description,
        caption: p?.caption,
        tag: { status: 'positive', text: p?.lifecycle?.state || '' },
        type: 'display',
        onSelect: () => history.replace(p?.url || ''),
      })),
      {
        title: 'MORE PROJECTS STARTING SOON',
        type: 'more',
      },
    ],
    [projects]
  );

  const activitySummary: ActivityCardItem[] = useMemo(() => {
    return [
      {
        name: t('pages.activity.opportunities'),
        digit: getActivityCount(activity, 'opportunities') || 0,
        color: 'primary',
      },
      {
        name: t('pages.activity.projects'),
        digit: getActivityCount(activity, 'projects') || 0,
        color: 'positive',
      },
      {
        name: t('pages.activity.members'),
        digit: getActivityCount(activity, 'members') || 0,
        color: 'neutralMedium',
      },
    ];
  }, [activity]);

  const challengeRefs = challenge?.context?.references
    ?.filter(r => !r.name.includes('visual') || r.uri === '' || r.uri === '""')
    ?.slice(0, 3);

  return (
    <>
      <Section
        details={
          <ActivityCard
            title={t('pages.activity.title', { blockName: t('pages.challenge.title') })}
            items={activitySummary}
            lifecycle={challengeLifecycleQuery?.ecoverse.challenge.lifecycle}
            classes={{ padding: (theme: Theme) => `${theme.shape.spacing(4)}px` }}
          />
        }
        classes={{
          background: (theme: Theme) =>
            bannerImg ? `url("${bannerImg}") no-repeat center center / cover` : theme.palette.neutral,
          coverBackground: (theme: Theme) => hexToRGBA(theme.palette.neutral, 0.4),
        }}
        gutters={{
          root: true,
          content: true,
          details: false,
        }}
      >
        <Body className="d-flex flex-column flex-grow-1">
          <div className="d-flex align-items-center flex-grow-1">
            <SectionHeader
              text={name}
              className="flex-grow-1"
              classes={{ color: (theme: Theme) => theme.palette.neutralLight }}
            />
            {user?.isAdmin && (
              <>
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={'Edit challenge context'}>
                      {t('pages.challenge.sections.header.buttons.edit.tooltip')}
                    </Tooltip>
                  }
                >
                  <Edit
                    color={'white'}
                    width={20}
                    height={20}
                    className={styles.edit}
                    onClick={() => setIsEditOpened(true)}
                  />
                </OverlayTrigger>
                <ContextEdit
                  variant={'challenge'}
                  show={isEditOpened}
                  onHide={() => setIsEditOpened(false)}
                  data={challenge.context as Context}
                  id={id}
                />
              </>
            )}
          </div>

          <div>
            <Button
              inset
              variant="semiTransparent"
              text="opportunities"
              onClick={() => opportunityRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.link}
            />
            {challengeRefs?.map((l, i) => (
              <Button
                key={i}
                as="a"
                inset
                variant="semiTransparent"
                text={l.name}
                href={l.uri}
                target="_blank"
                className={styles.link}
              />
            ))}
          </div>
        </Body>
      </Section>
      <Section
        avatar={<Icon component={JournalBookmarkIcon} color="primary" size="xl" />}
        details={<OrganisationBanners organizations={leadOrganisations} />}
      >
        <SectionHeader text="Challenge details" />
        <SubHeader text={tagline} />
        <Body>
          <Markdown children={background} />
          <div className={styles.buttonsWrapper}>
            {video && <Button text={t('buttons.see-more')} as={'a'} href={video.uri} target="_blank" />}
            {user?.ofChallenge(challenge?.id) ? (
              <></>
            ) : (
              <Button text={t('buttons.apply')} as={Link} to={`${url}/apply`} />
            )}
          </div>
        </Body>
      </Section>
      <Divider />
      <BackdropWithMessage
        message={t('components.backdrop.authentication', {
          blockName: t('pages.ecoverse.sections.community.header').toLocaleLowerCase(),
        })}
        show={!!user}
      >
        <ChallengeCommunitySection
          challengeId={challenge.id}
          ecoverseId={ecoverseId}
          title={t('pages.challenge.sections.community.header')}
          subTitle={t('pages.challenge.sections.community.subheader')}
          body={who}
          onExplore={() => history.push(SEARCH_PAGE)}
        />
      </BackdropWithMessage>
      <Divider />
      <div ref={opportunityRef} />
      <Section avatar={<Icon component={GemIcon} color="primary" size="xl" />}>
        <SectionHeader text={t('pages.challenge.sections.opportunities.header')} />
        <SubHeader text={t('pages.challenge.sections.opportunities.subheader')} />
        {!opportunities ||
          (opportunities.length === 0 && <Body text={t('pages.challenge.sections.opportunities.body-missing')}></Body>)}
      </Section>
      {opportunities && (
        <CardContainer>
          {opportunities?.map((opp, i) => (
            <OpportunityCard
              key={i}
              displayName={opp.displayName}
              activity={opp.activity || []}
              url={`${url}/opportunities/${opp.nameID}`}
              lifecycle={{ state: opp?.lifecycle?.state || '' }}
              context={{
                tagline: opp?.context?.tagline || '',
                visual: { background: opp?.context?.visual?.background || '' },
              }}
              tags={opp?.tagset?.tags || []}
            />
          ))}
        </CardContainer>
      )}
      <Divider />
      <BackdropWithMessage
        message={t('components.backdrop.authentication', { blockName: t('pages.ecoverse.sections.projects.header') })}
        show={!!user}
      >
        <Section avatar={<Icon component={FileEarmarkIcon} color="primary" size="xl" />}>
          <SectionHeader
            text={t('pages.challenge.sections.projects.header.text')}
            tagText={t('pages.challenge.sections.projects.header.tag')}
          />
          <SubHeader text={t('pages.challenge.sections.projects.subheader')} />
          <Body text={t('pages.challenge.sections.projects.body')} />
        </Section>
        {isAuthenticated && (
          <CardContainer cardHeight={380} xs={12} md={6} lg={4} xl={3}>
            {challengeProjects.map(({ type, ...rest }, i) => {
              const Component = SwitchCardComponent({ type });
              return <Component {...rest} key={i} />;
            })}
          </CardContainer>
        )}
      </BackdropWithMessage>
      <Divider />
    </>
  );
};

export { Challenge };
