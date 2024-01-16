import React from "react";
import {createRoot} from "react-dom/client";
import "./style.css";


const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};


function App() {
    const id = Math.floor(Math.random() * 150) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const [pokeData, setPokeData] = React.useState(null)
    const [generatedCard, setGeneratedCard] = React.useState(null);

    React.useEffect(() => {
        GetData();
    }, []);     // initializes GetData

    React.useEffect(() => {
        if (pokeData) {
            setGeneratedCard(GenerateCard(pokeData))
        }
    }, [pokeData]); // run when pokeData changes

    function GetData() {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setPokeData(data)
        })
    }

    function PokeTypes(props) { 
        // console.log(props.types)

        const typeNames = props.types.map((prop) => {
            return prop.type.name
        })

        return (
            <>
                {typeNames.map((item) => (
                    <span key={item} style={{backgroundColor: props.theme}}>{item}</span>
                ))}
            </>
        )
    }

    function GenerateCard(pokeData) {

        // console.log(pokeData.type)

        const hp = pokeData.stats[0].base_stat;
        const imgSrc = pokeData.sprites.other.dream_world.front_default;
        const pokeName = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
        const statAttack = pokeData.stats[1].base_stat;
        const statDefense = pokeData.stats[2].base_stat;
        const statSpeed = pokeData.stats[5].base_stat;

        const themeColor = typeColor[pokeData.types[0].type.name];
        // console.log(themeColor);

        const styleCard = {background: 
            `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`}

        return (
            <div className="container">
                <div id="card" style={styleCard}>
                    <p className="hp">
                        <span>HP </span>
                        {hp}
                    </p>
                    <img src={imgSrc} />
                    <h2 className="poke-name">{pokeName}</h2>
                    <div className="types">
                        <PokeTypes types={pokeData.types} theme={themeColor}/>
                    </div>
                    <div className="poke-stats">
                        <div>
                        <h3>{statAttack}</h3>
                        <p>Attack</p>
                        </div>
                        <div>
                        <h3>{statDefense}</h3>
                        <p>Defense</p>
                        </div>
                        <div>
                        <h3>{statSpeed}</h3>
                        <p>Speed</p>
                        </div>
                    </div>
                </div>
                <button id="btn" onClick={GetData}>Generate</button>
          </div>
        )
    }

    return (
        <>
        {generatedCard}
        </>
    )

}


const root = createRoot(document.getElementById("root"));
root.render(<App />);
