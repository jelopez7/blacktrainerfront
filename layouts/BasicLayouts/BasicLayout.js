import React from 'react';
import {Container} from 'semantic-ui-react';

export default function BasicLayout({children}) {
  return (
    <Container fluid className='basic-layout' >
        <Container className='content'>
            {children}
        </Container>
        
    </Container>
  )
}
