import React from 'react';

export default function PokemonList({ pokemon }) {
    const divStyle = {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 32,
    };
    return (
        <div>
            {pokemon.map((p) => (
                <div key={p} style={divStyle} className='pokemonNames'>
                    {p}
                </div>
            ))}
        </div>
    );
}
