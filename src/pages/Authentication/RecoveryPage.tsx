import { RecoveryFlow } from '@ory/kratos-client';
import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import KratosUI from '../../components/Authentication/KratosUI';
import Typography from '../../components/core/Typography';
import { useKratosClient } from '../../hooks/useKratosClient';

interface RegisterPageProps {
  flow: string;
}

export const RecoveryPage: FC<RegisterPageProps> = ({ flow }) => {
  const [recoveryFlow, setRecoveryFlow] = useState<RecoveryFlow>();
  const kratos = useKratosClient();

  const { t } = useTranslation();

  useEffect(() => {
    if (flow && kratos) {
      kratos.getSelfServiceRecoveryFlow(flow).then(({ status, data: flow, ..._response }) => {
        if (status !== 200) {
          console.error(flow);
        }
        setRecoveryFlow(flow);
      });
    }
  }, [flow]);

  return (
    <Container fluid={'sm'}>
      <Row className={'d-flex justify-content-center'}>
        <Col sm={4}>
          <Typography variant={'h3'} className={'mt-4 mb-4'}>
            {t('pages.recovery.header')}
          </Typography>
          <KratosUI flow={recoveryFlow} />
        </Col>
      </Row>
    </Container>
  );
};
export default RecoveryPage;