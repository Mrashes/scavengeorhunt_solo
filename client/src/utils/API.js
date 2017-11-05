import axios from "axios"

export default {
    saveGame: (gamedata) => {
        return axios.post("/api/game/", gamedata)
    },

    getGame: (gameid) => {
        return axios.get("/api/game/"+gameid)
    },

    getAllGames: () => {
        return axios.get("api/game/")
    },

    saveUserScore: (scoredata) => {
        return axios.post("/api/users/", scoredata)
    },   

    getScoreByGameId: (gameid) => {
        return axios.get("api/users/"+gameid)
    },

    getAllScores: () => {
        return axios.get("/api/users/")
    },

    postErrors: (error) => {
        return axios.post("/api/errors/", error)
    },
}