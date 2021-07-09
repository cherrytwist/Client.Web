import {
  LoginFlow,
  RecoveryFlow,
  RegistrationFlow,
  SettingsFlow,
  UiNode,
  UiNodeInputAttributes,
  UiText,
  VerificationFlow,
} from '@ory/kratos-client';
import { ReactComponent as EyeSlash } from 'bootstrap-icons/icons/eye-slash.svg';
import { ReactComponent as Eye } from 'bootstrap-icons/icons/eye.svg';
import React, { FC, useMemo, useState } from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '../core/Button';
import Delimiter from '../core/Delimiter';
import Icon from '../core/Icon';
import IconButton from '../core/IconButton';
import { Required } from '../Required';
import { getNodeName, getNodeTitle, getNodeValue, guessVariant, isUiNodeInputAttributes } from './Kratos/helpers';
import KratosTermsLabel from './KratosTermsLabel';

interface KratosUIProps {
  flow?: LoginFlow | RegistrationFlow | SettingsFlow | VerificationFlow | RecoveryFlow;
  termsURL?: string;
  privacyURL?: string;
}

interface KratosProps {
  node: UiNode;
}

interface KratosInputExtraProps {
  autoComplete?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
}

const toAlertVariant = (type: string) => {
  if (type === 'error') {
    return 'danger';
  } else {
    return 'primary';
  }
};

const isInvalid = (node: UiNode) =>
  !!(node && Array.isArray(node.messages) && node.messages.find(x => x.type === 'error'));

const getFeedbackElements = (node: UiNode) =>
  isInvalid(node)
    ? node.messages.map((x, key) => (
        <Form.Control.Feedback type="invalid" key={key}>
          {x.text}
        </Form.Control.Feedback>
      ))
    : null;

type KratosInputProps = KratosProps & KratosInputExtraProps;

const KratosHidden: FC<KratosProps> = ({ node }) => {
  const attributes = node.attributes as UiNodeInputAttributes;
  return <Form.Control type={'hidden'} value={attributes.value as string} name={attributes.name} />;
};

const KratosButton: FC<KratosProps> = ({ node }) => {
  const attributes = node.attributes as UiNodeInputAttributes;
  return (
    <Button
      name={getNodeName(node)}
      variant="primary"
      type={attributes.type}
      disabled={attributes.disabled}
      value={attributes.value}
      block
      small
    >
      {getNodeTitle(node)}
    </Button>
  );
};

const KratosInput: FC<KratosInputProps> = ({ node, autoCapitalize, autoCorrect, autoComplete }) => {
  const attributes = useMemo(() => node.attributes as UiNodeInputAttributes, [node]);
  const [value, setValue] = useState(getNodeValue(node));
  const [inputType, setInputType] = useState(attributes.type);
  const isPassword = useMemo(() => attributes.type === 'password', [attributes]);

  const invalid = isInvalid(node);
  const feedbackElements = useMemo(() => getFeedbackElements(node), [node]);

  return (
    <Form.Group>
      <Form.Label>
        {getNodeTitle(node)}
        {attributes.required && <Required />}
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={inputType}
          value={value ? String(value) : ''}
          name={getNodeName(node)}
          onChange={e => setValue(e.target.value)}
          required={attributes.required}
          disabled={attributes.disabled}
          isInvalid={invalid}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          /*aria-labelledby={} TODO */
        />
        {isPassword && (
          <InputGroup.Append>
            <InputGroup.Text>
              <IconButton onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
                <Icon component={inputType === 'password' ? Eye : EyeSlash} color="inherit" size={'xs'} />
              </IconButton>
            </InputGroup.Text>
          </InputGroup.Append>
        )}
        {feedbackElements}
      </InputGroup>
    </Form.Group>
  );
};

const KratosCheckbox: FC<KratosProps> = ({ node }) => {
  const attributes = node.attributes as UiNodeInputAttributes;
  const [state, setState] = useState(Boolean(getNodeValue(node)));

  const invalid = isInvalid(node);

  const feedbackElements = useMemo(() => getFeedbackElements(node), [node]);
  const updatedTitle = attributes.name === 'traits.accepted_terms' ? <KratosTermsLabel /> : getNodeTitle(node);

  return (
    <Form.Group controlId={node.group}>
      <Form.Check name={getNodeName(node)} type="checkbox">
        <Form.Check.Input
          type="checkbox"
          name={getNodeName(node)}
          checked={state}
          onChange={() => setState(oldState => !oldState)}
          isInvalid={invalid}
          value={String(state)}
        />
        <Form.Check.Label>
          {updatedTitle}
          {attributes.required && <Required />}
        </Form.Check.Label>
        {feedbackElements}
      </Form.Check>
    </Form.Group>
  );
};

const KratosMessages: FC<{ messages?: Array<UiText> }> = ({ messages }) => {
  return (
    <>
      {messages?.map(x => (
        <Alert key={x.id} variant={toAlertVariant(x.type)}>
          {x.text}
        </Alert>
      ))}
    </>
  );
};

const toUiControl = (node: UiNode, key: number) => {
  const attributes = node.attributes;
  if (isUiNodeInputAttributes(attributes)) {
    const variant = guessVariant(node);

    const extraProps: KratosInputExtraProps = {
      autoCapitalize: 'off',
      autoCorrect: 'off',
    };

    switch (variant) {
      case 'email':
      case 'username':
        extraProps.autoComplete = 'username';
        break;
      case 'password':
        extraProps.autoComplete = 'password';
        break;
    }

    switch (attributes.type) {
      case 'hidden':
        return <KratosHidden key={key} node={node} />;
      case 'submit':
        return <KratosButton key={key} node={node} />;
      case 'checkbox':
        return <KratosCheckbox key={key} node={node} />;
      default:
        return <KratosInput key={key} node={node} {...extraProps} />;
    }
  } else {
    return <KratosInput key={key} node={node} />;
  }
};

export const KratosUI: FC<KratosUIProps> = ({ flow, ...rest }) => {
  type NodeGroups = { default: UiNode[]; oidc: UiNode[]; password: UiNode[]; rest: UiNode[] };

  const nodesByGroup = useMemo(() => {
    if (!flow) return;

    return flow.ui.nodes.reduce(
      (acc, node) => {
        switch (node.group) {
          case 'default':
            return { ...acc, default: [...acc.default, node] };
          case 'oidc':
            return { ...acc, oidc: [...acc.oidc, node] };
          case 'password':
            return { ...acc, password: [...acc.password, node] };
          default:
            return { ...acc, rest: [...acc.rest, node] };
        }
      },
      { default: [], oidc: [], password: [], rest: [] } as NodeGroups
    );
  }, [flow]);

  if (!nodesByGroup || !flow) return null;

  const ui = flow.ui;

  return (
    <KratosUIProvider {...rest}>
      <div>
        <KratosMessages messages={ui.messages} />
        <Form action={ui.action} method={ui.method} noValidate>
          {nodesByGroup.default.map(toUiControl)}
          {nodesByGroup.password.map(toUiControl)}
          {nodesByGroup.password.length > 0 && <ResetPassword />}
          {nodesByGroup.oidc.length > 0 && <Delimiter>or</Delimiter>}
          {nodesByGroup.oidc.map(toUiControl)}
          {nodesByGroup.rest.map(toUiControl)}
        </Form>
      </div>
    </KratosUIProvider>
  );
};
export default KratosUI;

interface KratosUIContextProps {
  termsURL?: string;
  privacyURL?: string;
}

export const KratosUIContext = React.createContext<KratosUIContextProps>({});

interface KratosUIProviderProps {
  termsURL?: string;
  privacyURL?: string;
}

export const KratosUIProvider: FC<KratosUIProviderProps> = ({ children, termsURL, privacyURL }) => {
  return (
    <KratosUIContext.Provider
      value={{
        termsURL,
        privacyURL,
      }}
    >
      {children}
    </KratosUIContext.Provider>
  );
};

const ResetPassword: FC = () => {
  return (
    <div className={'text-right'}>
      <Link to={'/auth/recovery'}>Reset password</Link>
    </div>
  );
};
