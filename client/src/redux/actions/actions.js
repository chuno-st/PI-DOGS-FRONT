import axios from "axios";
import { CLEAR_PAGE, CREATE_BREED, DEL_FAV, FILTER_BY_TEMPERAMENT, GET_BREEDS, GET_BREED_DETAIL, GET_TEMPERAMENT, SEARCH_BREED, SET_FAV } from "./actionsTypes";

export function createBreed() {
     return function (dispatch) {
         return axios.post(`http://localhost:3001/dog`)
            .then(res => dispatch({ type: CREATE_BREED, payload: res.data}))
     }
};

export function getBreeds() {
    return (dispatch) => {
        return axios("http://localhost:3001/dogs/")
            .then(res => dispatch({ type: GET_BREEDS, payload: res.data }))
    }
};

export function getBreedDetail(id) {
    return (dispatch) => {
        return axios(`http://localhost:3001/dogs/${id}`)
            .then(res => dispatch({ type: GET_BREED_DETAIL, payload: res.data }))
    }
    // return (dispatch) => {
    //     return fetch(`http://localhost:3001/dogs/:${id}`)
    //     .then (res=> res.json)
    //     .then (json => dispatch({type: GET_BREED_DETAIL, payload:json}))
};

export function clearPage() {
    return {
        type: CLEAR_PAGE
    }
};

export function searchBreed(name) {
    return function (dispatch) {
        return axios(`http://localhost:3001/dogs/?name=${name}`)
            .then(res => dispatch({ type: SEARCH_BREED, payload: res.data }))
    }
};

export function setFav(payload) {
    return {
        type: SET_FAV,
        payload
    }
};

export function delFav(payload) {
    return {
        type: DEL_FAV,
        payload
    }
};

export function getTemperament() {
    return function (dispatch) {
        return axios(`http://localhost:3001/temperament`)
           .then(res => dispatch({ type: GET_TEMPERAMENT, payload: res.data}))
    }
};

export function filterByTemperament(payload) {
    console.log(payload)
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
};