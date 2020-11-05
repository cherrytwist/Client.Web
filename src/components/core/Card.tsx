import clsx from 'clsx';
import React, { FC } from 'react';
import { Breakpoints, Theme } from '../../context/ThemeProvider';
import { createStyles } from '../../hooks/useTheme';
import { agnosticFunctor } from '../../utils/functor';
import Tag from './Tag';
import Typography from './Typography';

interface HeaderProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
  classes?: unknown;
}

const useHeaderStyles = createStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.neutralMedium,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    padding: props =>
      agnosticFunctor(props.color)(theme, {}) ||
      `${theme.shape.spacing(2)}px ${theme.shape.spacing(6)}px ${theme.shape.spacing(2)}px ${theme.shape.spacing(4)}px`,

    '& span': {
      minHeight: 36,

      [theme.media.down('lg')]: {
        minHeight: 0,
      },
    },
  },
}));

export const HeaderCaption: FC<HeaderProps> = ({ text, className, classes }) => {
  const styles = useHeaderStyles(classes || {});

  return (
    <Typography as="div" variant="caption" color="background" weight="bold" className={clsx(styles.header, className)}>
      <span>{text}</span>
    </Typography>
  );
};

const usePrimaryTextStyles = createStyles(theme => ({
  text: {
    display: 'flex',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    textTransform: 'uppercase',
    lineHeight: props => agnosticFunctor(props.lineHeight)(theme, {}),
  },
  wrapper: {
    color: props => agnosticFunctor(props.color)(theme, {}) || theme.palette.neutral,
  },
}));

export const PrimaryText: FC<HeaderProps> = ({ text, className, classes }) => {
  const styles = usePrimaryTextStyles(classes || {});

  return (
    <div className={styles.wrapper}>
      <Typography as="h4" variant="h4" weight="bold" color="inherit" className={clsx(styles.text, className)}>
        {text}
      </Typography>
    </div>
  );
};

const useTagStyles = createStyles(() => ({
  tag: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

export const CardTag: FC<HeaderProps> = ({ text, className }) => {
  const styles = useTagStyles();

  return <Tag className={clsx(styles.tag, className)} text={text} />;
};

const useBodyStyles = createStyles(theme => ({
  content: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    flexGrow: 1,
    flexDirection: 'column',
    background: props => agnosticFunctor(props.background)(theme, {}) || theme.palette.neutralLight,
    padding: props => agnosticFunctor(props.padding)(theme, {}) || theme.shape.spacing(4),

    [theme.media.down('md')]: {
      background: props => agnosticFunctor(props.background)(theme, { md: true }) || theme.palette.neutralLight,
      padding: props => agnosticFunctor(props.padding)(theme, { md: true }) || theme.shape.spacing(4),
    },
    [theme.media.down('sm')]: {
      background: props => agnosticFunctor(props.background)(theme, { sm: true }) || theme.palette.neutralLight,
      padding: props => agnosticFunctor(props.padding)(theme, { sm: true }) || theme.shape.spacing(4),
    },
    [theme.media.down('xs')]: {
      background: props => agnosticFunctor(props.background)(theme, { xs: true }) || theme.palette.neutralLight,
      padding: props => agnosticFunctor(props.padding)(theme, { xs: true }) || theme.shape.spacing(4),
    },
  },
}));

interface BodyProps {
  className?: string;
  background?: string | ((theme: Theme, media: Record<keyof Breakpoints, boolean>) => string | boolean);
  padding?: string | ((theme: Theme, media: Record<keyof Breakpoints, boolean>) => string | boolean);
}

export const Body: FC<BodyProps> = ({ children, className, ...rest }) => {
  const styles = useBodyStyles(rest);

  return <div className={clsx(styles.content, className)}>{children}</div>;
};

interface CardProps {
  className?: string;
  headerProps?: HeaderProps;
  tagProps?: HeaderProps;
  bodyProps?: BodyProps;
  primaryTextProps?: HeaderProps;
}

const useCardStyles = createStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));

const Card: FC<CardProps> = ({ className, headerProps, tagProps, bodyProps, primaryTextProps, children }) => {
  const styles = useCardStyles();

  return (
    <div className={clsx(styles.root, className, 'ct-card')}>
      {headerProps && <HeaderCaption {...headerProps} />}
      <Body {...bodyProps}>
        {tagProps && <CardTag {...tagProps} />}
        {primaryTextProps && <PrimaryText {...primaryTextProps} />}
        {children}
      </Body>
    </div>
  );
};

export default Card;