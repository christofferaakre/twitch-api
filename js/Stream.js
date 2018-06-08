export const Stream = ({
  _links,
  stream,
  name
}) => < a href = {
  stream ? stream.channel.url : '#'
}
target = "__blank" >
  <
  article class = "stream" > {
    name && < h3 > {
      name
    } < /h3>} {
      stream && stream.game && < small > {
          stream.game
        } < /small>} {
          stream ? ( <
            div class = "stream-info" >
            <
            img class = "preview"
            src = {
              stream.preview.medium
            }
            alt = "search" / >
            <
            p > {
              stream.channel.status
            } < /p> <
            /div>
          ) : 'offline'
        } <
        /article> <
        /a>
      export default Stream;