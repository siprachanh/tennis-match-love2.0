const remoteURL ="http://localhost:8088"

export const getPlayerById = (playerId) => {
    return fetch (`${remoteURL}/players/${playerId}`)
    .then(res => res.json())
}
export const getAllPlayers = () => {
    return fetch(`${remoteURL}/players?`)
    .then(res => res.json())
}