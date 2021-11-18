import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

class Main extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {cur: 0, pw: "", interval: null, seconds: 0, timeStr: "00:00:00"};
        this.onSubmit = this.onSubmit.bind(this);
        this.back = this.back.bind(this);
        this.tick = this.tick.bind(this);
    }

    async onSubmit() {
        console.log('pw: ', this.state.pw);
        if (!this.state.pw) {
            return;
        }
        
        if (this.state.pw.length < 1 || this.state.pw.length > 6 || this.state.pw.match("^[a-z0-9]+$") == null) {
            alert("The password must contain between 1 and 6 characters and all the characters must be digits or lowercase letters.");
            return;
        }

        this.setState({cur: 1, seconds: 1, interval: setInterval(this.tick, 1000)});
        
        let res = await axios.get('https://www.random.org/integers/?num=1&min=0&max=100&col=1&base=10&format=plain&rnd=new');
        console.log(res);
        clearInterval(this.state.interval);
        this.setState({cur: 2});
    }

    back() {
        this.setState({cur: 0, pw: "", interval: null, seconds: 0, timeStr: "00:00:00"});
    }

    tick() {
        this.setState({seconds: this.state.seconds + 1, timeStr: new Date(this.state.seconds * 1000).toISOString().substr(11, 8)});
    }

    render() {
        let content;
        if (this.state.cur === 0) {
            content = <InputGroup size="lg" className="centered">
                        <FormControl 
                            placeholder="lol"
                            value={this.state.pw}
                            onChange={e => this.setState({pw: e.target.value })}
                        ></FormControl>
                        <Button onClick={this.onSubmit}>Crack it!</Button>
                    </InputGroup>;
        } else if (this.state.cur === 1) {
            content = <div>
                            <Spinner animation="border" variant="primary" /> <br/>
                            <h4>{this.state.timeStr}</h4>
                        </div>;
        } else {
            content = <div>
                            <h2>Your password was cracked in:</h2> <br/>
                            <h1>{this.state.timeStr}</h1> <br/>
                            <Button onClick={this.back}>Back to Main</Button>
                        </div>;
        }

        return (
            <Container>
                <Row>
                    <Col className="centered">
                        <div className="almost-centered">
                            <h1>Distributed Password Cracker</h1>
                            <h4>It's distributed!</h4>
                            <br/><br/><br/><br/><br/>
                            {content}
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