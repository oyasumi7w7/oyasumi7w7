import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import './App.css'

import SearchResults from '../SearchResults/SearchResults'
import PlayList from '../PlayList/PlayList'
import Spotify from '../../util/spotify'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      SearchResults: [],
      playlistName: 'Hayooo',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if (tracks.find(saveTrack => saveTrack.id === track.id)) {
      return;
    }

    tracks.push(track)
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    this.setState({ playlistTracks: tracks })
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  search(term) {
   
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults })
    })
  }
  componentDidMount(){
    Spotify.getAccessToken()
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}

            />
          </div>
        </div>
      </div>
    )
  }
}
export default App
