import Stream from './Stream.js';
export const StreamsList = ({channels = {}}) => (
  <ul class="streams-list">
    {
      Object.keys(channels).map(channel => <li key={channel}><Stream online={!!channels[channel].stream} {...channels[channel]} /></li>)
    }
    </ul>
)

export default StreamsList;