import React, {Component} from 'react';
import './App.css';
import Profile from './profile.js';
import Gallery from './gallery.js';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
class Music extends Component{
	constructor(props){
		super(props);
		this.state = {
			query: "",
			artist: null,
			tracks: []
		}
	}
	
	search() {
    //console.log('this.state', this.state);        
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const ALBUM_URL ='https://api.spotify.com/v1/artists/'
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
    var accessToken = 'BQDLMldpH-bJpaOaKsduqzZbCLykomC08PVFaMGU_t-RgKyrlk458gD8IayPubxpfC2I02JKKcMMRLcaNc0h15zFELA9BcDzLY3v9wv9-cgG_AbgT9sxeH0LPP5KZUxqnbAimSKY2g1DGnmE3BqoG2DS-gyntld6uxRi0SRaU7OsCuPApr8'
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => {
      	const artist = json.artists.items[0]
      	console.log('artist', artist);
      	this.setState({artist});

      	FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      	fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => {
      	const {tracks} = json;
      	console.log("artist's top tracks", json);
      	this.setState({tracks})
      })
  	});
  }

	render(){
		return(
				<div className = "app">
					<div className = "title">Music Master</div>
					<FormGroup>
						<InputGroup>
							<FormControl 
								type = "text"
								placeholder = "search for an artist"
								value = {this.state.query}
								onChange = {(event) => this.setState({query: event.target.value})}
								onKeyPress = {(event) => {
									if(event.key === 'Enter'){
										this.search();
									}
								}}
							/>
							<InputGroup.Addon onClick = {() =>this.search()}>
								<Glyphicon glyph = "search"></Glyphicon>
							</InputGroup.Addon>
						</InputGroup>
					</FormGroup>
					{
					(this.state.artist!==null)?
					<div>
						<Profile artist = {this.state.artist} />
					
						<Gallery tracks = {this.state.tracks} />
					</div>
					:<div></div>
				}
				</div>
			);
	}
}

export default Music;