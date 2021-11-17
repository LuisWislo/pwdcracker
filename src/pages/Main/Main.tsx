import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';

class Main extends React.Component {

    onSubmit() {
        axios.get('https://www.random.org/integers/?num=1&min=0&max=100&col=1&base=10&format=plain&rnd=new')
            .then(res => console.log(res.data))
            .catch(() => console.log('oops'))
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="centered">
                        <div className="almost-centered">
                            <h1>Distributed Password Cracker</h1>
                            <h4>It's distributed!</h4>
                            <br/><br/><br/><br/><br/><br/>
                            <InputGroup size="lg" className="centered">
                                <FormControl placeholder="lol"></FormControl>
                                <Button onClick={this.onSubmit}>Crack it!</Button>
                            </InputGroup>
                            <br/>
                        </div>
                        <br/><br/>
                        <div>
                            <p>
                                Type in a password and we'll tell you how long it takes our military-grade code to crack it.
                            </p>
                            <p><span className="inline-danger">DON'T</span> put an actual password of yours, but maybe something similar, see how strong it is.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Main;