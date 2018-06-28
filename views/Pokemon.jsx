var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <img src= {this.props.pokemon.img}/>
            <h1>{this.props.pokemon.name}</h1>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                num: {this.props.pokemon.num}
              </li>
              <li className="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
