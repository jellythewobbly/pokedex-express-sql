var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/edit/"+ this.props.pokemon.id + "?_method=PUT"}
          >
            <div className="pokemon-attribute">
              id:<input name="id" type="text" defaultValue={this.props.pokemon.id} />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.pokemon.num}
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.pokemon.img}
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokemon.height}
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.pokemon.weight}
              />
            </div>
            <input value="EDIT POKEMON" name="submit" type="submit" />
            </form>

            <form
            className="pokemon-delete"
            method="POST"
            action={"/pokemon/edit/"+ this.props.pokemon.id + "?_method=DELETE"}
            >
            <input value="DELETE POKEMON" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
