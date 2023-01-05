import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieItems extends React.Component{
    // use bootstrap css.
    render(){
        return(
            <div>
                <center>
                <Card style={{ width: '18rem' }}>
                <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                        <p>{this.props.movie.year}</p>
                        <img src={this.props.movie.posterUrl} width="250" height="250"></img>
                        <footer>
                        <p>{this.props.movie.director[0]}</p>
                        <p>Rates: {this.props.movie.rates}</p>
                        </footer>
                        </blockquote>
                        <Button variant="primary">Learn more..</Button>
                    </Card.Body>
                 </Card>
                 <br/>
                 </center>
            </div>
        );
    }
}