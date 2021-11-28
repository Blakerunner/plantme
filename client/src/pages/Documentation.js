import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Documentation = () => {
  const history = useHistory({});
  const { swaggerJSON } = require('../swagger/swaggerJSON');

  return (
    <>
      <div className='container flex-auto text-center my-2'>
        <SwaggerUI spec={swaggerJSON} />
        <Button
          variant='secondary'
          style={{ margin: '10px' }}
          onClick={() => {
            history.push('/');
          }}>
          Back
        </Button>{' '}
      </div>
    </>
  );
};

export default Documentation;
