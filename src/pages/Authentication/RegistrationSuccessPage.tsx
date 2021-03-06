import { ReactComponent as CheckCircle } from 'bootstrap-icons/icons/check-circle.svg';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../../components/core/Button';
import Icon from '../../components/core/Icon';
import Markdown from '../../components/core/Markdown';
import Typography from '../../components/core/Typography';
import AuthenticationLayout from '../../layout/AuthenticationLayout';

interface RegistrationSuccessPageProps {}

export const RegistrationSuccessPage: FC<RegistrationSuccessPageProps> = () => {
  const { t } = useTranslation();

  return (
    <AuthenticationLayout>
      <Typography variant={'h2'} className={'text-center'}>
        <Icon component={CheckCircle} color={'primary'} size={'xl'} />
      </Typography>
      <Typography variant={'h2'} className={'text-center'}>
        {t('pages.registration-success.header')}
      </Typography>
      <Typography variant={'h3'} className={'text-center'}>
        {t('pages.registration-success.subheader')}
      </Typography>
      <Markdown children={t('pages.registration-success.message')} />
      <Typography>
        <ul>
          <li>
            The key next step is to complete your{' '}
            <Link to={'/profile'}>
              <strong>profile:</strong>
            </Link>{' '}
            This makes it easier for others to find you, and your profile is also used when applying to join
            communities.
          </li>
          <li>
            <Link to={'/'}>
              <strong>Browse:</strong>
            </Link>{' '}
            Review the set of hosted Ecoverses , as well as the Challenges within each Ecoverse.
          </li>
          <li>
            Apply to become a member of one or more Ecoverses. Your application is then reviewed based on your profile
            and provided information.
          </li>
          <li>
            <Link to={'/search'}>
              <strong>Search</strong>
            </Link>{' '}
            for relevant Challenges, Users and Organisations.
          </li>
        </ul>
      </Typography>

      <Typography>
        Once you have verified your email address you can apply to join one or more Eoverses.
        <ul>
          <li>
            <strong>Contribute</strong>: After browsing the Challenges and Opportunites, join those that you want to
            contribute to and apply to join them.
          </li>
          <li>
            <Link to={'/search'}>
              <strong>Connect to other members.</strong>
            </Link>
          </li>
        </ul>
      </Typography>

      <Typography>As with any community, the more everyone brings in the more everyone gets out!</Typography>
      <Typography>We really hope you enjoy engaging!</Typography>
      <div className={'mt-4 text-center'}>
        <Button as={Link} to={'/'}>
          {t('buttons.home')}
        </Button>
      </div>
    </AuthenticationLayout>
  );
};
export default RegistrationSuccessPage;
