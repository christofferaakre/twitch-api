const names = ["freecodecamp", "OgamingSC2", "esl_sc2", "noobs2ninjas"];
const api = "https://wind-bow.glitch.me/twitch-api";
import StreamsList from "./StreamsList.js";
import Search from "./Search.js";
export class App extends React.Component {
  state = {
    channels: {},
    search: ""
  };
  componentDidMount() {
    names.forEach(channel => {
      const streamsURL = `${api}/streams/${channel}`;
      const usersURL = `${api}/users/${channel}`;
      fetch(streamsURL).then(response =>
        response.json().then(stream => {
          this.setState(({ channels }) => ({
            channels: { ...channels, [channel]: stream }
          }));
          fetch(usersURL).then(response =>
            response
              .json()
              .then(user =>
                this.setState(({ channels }) => ({
                  channels: {
                    ...channels,
                    [channel]: { ...channels[channel], name: user.display_name }
                  }
                }))
              )
          );
        })
      );
    });
  }

  handleSearchChange = e => {
    const { value: search } = e.target;
    this.setState(() => ({ search }));
  };

  filterChannels = channels => {
    const search = this.state.search.toLowerCase();
    let matches = {};
    Object.keys(channels).forEach(channel => {
      if (
        channel.toLowerCase().startsWith(search) ||
        (channels[channel].stream &&
          channels[channel].stream.channel.display_name
            .toLowerCase()
            .startsWith(search))
      ) {
        matches = { ...matches, [channel]: channels[channel] };
      }
    });
    return matches;
  };

  render() {
    const { channels, search } = this.state;
    return (
      <div class="container">
        <Search
          id="search"
          name="search"
          class="search"
          placeholder="search"
          value={search}
          onChange={this.handleSearchChange}
        />
        <StreamsList channels={this.filterChannels(channels)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
