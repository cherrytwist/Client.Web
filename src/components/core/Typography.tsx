import clsx from 'clsx';
import React, { FC } from 'react';
import { Palette, Typography } from '../../context/ThemeProvider';
import { createStyles } from '../../hooks/useTheme';

const useTypographyStyles = createStyles(theme => ({
  h1: {
    fontFamily: theme.typography.h1.font,
    fontSize: theme.typography.h1.size,
  },
  h2: {
    fontFamily: theme.typography.h2.font,
    fontSize: theme.typography.h2.size,
    textTransform: 'uppercase',
    paddingBottom: theme.shape.spacing(1),
  },
  h3: {
    fontFamily: theme.typography.h3.font,
    fontSize: theme.typography.h3.size,
    paddingBottom: theme.shape.spacing(1),
  },
  h4: {
    fontFamily: theme.typography.h4.font,
    fontSize: theme.typography.h4.size,
  },
  h5: {
    fontFamily: theme.typography.h5.font,
    fontSize: theme.typography.h5.size,
  },
  caption: {
    fontFamily: theme.typography.caption.font,
    fontSize: theme.typography.caption.size,
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: theme.typography.body.font,
    fontSize: theme.typography.body.size,
  },
  button: {
    fontFamily: theme.typography.button.font,
    fontSize: theme.typography.button.size,
    textTransform: 'uppercase',
  },
  primary: {
    color: theme.palette.primary,
  },
  positive: {
    color: theme.palette.positive,
  },
  neutral: {
    color: theme.palette.neutral,
  },
  neutralMedium: {
    color: theme.palette.neutralMedium,
  },
  neutralLight: {
    color: theme.palette.neutralLight,
  },
  negative: {
    color: theme.palette.negative,
  },
  divider: {
    color: theme.palette.divider,
  },
  background: {
    color: theme.palette.background,
  },
  inherit: {
    color: 'inherit',
  },
}));

interface FontWeight {
  regular: number;
  medium: number;
  boldLight: number;
  bold: number;
}

const fontWeight: FontWeight = {
  regular: 400,
  medium: 500,
  boldLight: 700,
  bold: 900,
};

interface TypographyProps {
  variant?: keyof Typography;
  className?: string;
  color?: keyof Palette | 'inherit';
  weight?: keyof FontWeight;
  as?: string;
}

const Toolbar: FC<TypographyProps> = ({
  variant = 'body',
  color = 'neutral',
  weight = 'medium',
  as,
  className,
  children,
}) => {
  const classes = useTypographyStyles();
  as = as || 'div';

  return React.createElement(as, {
    className: clsx(classes[variant], classes[color], className),
    style: { fontWeight: fontWeight[weight] },
    children,
  });
};

export default Toolbar;