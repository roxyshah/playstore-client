import React, { Component } from 'react';
import PlaystoreView from './playstoreDetail/playstoreView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      genres: '',
      sort: '',
      error: null
    }
  }

  //methods to update state
  setGenres(genres) {
    this.setState({
      genres
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    console.log(url);
    fetch(url)
    // fetch('http://localhost:8000/apps?genres=Action&sort=Rating')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      })

  }

  render() {
    
    const apps = this.state.apps.map((playstoreData, i) => {
      return <PlaystoreView {...playstoreData} key={i}/>
    })

    return (
      <main className="App">
        <h1>Google Playstore Apps</h1>
        <div className="genres">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="genres">Genre: </label>
            <input
              type="text"
              id="genres"
              name="genres"
              value={this.state.genres}
              onChange={e => this.setGenres(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="App">App</option>
              <option value="Rating">Rating</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;
