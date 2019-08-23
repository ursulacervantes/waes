import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextEditor from './components/TextEditor';
import TextFilter from './components/TextFilter';

import './App.css';

function App() {
  return (
    <div className="App mt-3">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <TextEditor></TextEditor>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <TextFilter></TextFilter>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
