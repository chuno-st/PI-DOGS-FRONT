import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getTemperament } from "../../redux/actions/actions";

import s from "../CreateBreed/createBreed.module.css"

function CreateBreed() {

    const [state, setState] = useState({

        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span_min: '',
        life_span_max: '',
        temperaments: [],
        errors: {
            name: '* campo requerido',
            height_min: '* campo requerido',
            height_max: '* campo requerido',
            weight_min: '* campo requerido',
            weight_max: '* campo requerido',
            life_span_min: '* campo requerido',
            life_span_max: '* campo requerido',

        },
        disabled: false
    })


    function handleChange(e) {
        // console.log(e.target.name)
        const { value, name } = e.target;
        let errors = state.errors;

        let nombrePattern = /(^(?=.{2,}$)(?=.+[a-zA-Z])[a-zA-Z]+$)/;
        let numberPattern = /^([1-9]\d*(.|,)\d*|0?(.|,)\d*[1-9]\d*|[1-9]\d*)$/;

        switch (name) {
            case 'name':
                errors.name = !nombrePattern.test(value) ? 'El dato no debe contener números, espacios, y/o caractéres especiales' : '';
                break;
            case 'height_min':
                errors.height_min = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value < state.height_max ? '' : 'La altura mínima debe ser menor a la altura máxima';
                break;
            case 'height_max':
                errors.height_max = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value > state.height_min ? '' : 'La altura máxima debe ser mayor a la altura mínima';
                break;
            case 'weight_min':
                errors.weight_min = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value < state.weight_max ? '' : 'El peso mínimo debe ser menor al peso máximo';
                break;
            case 'weight_max':
                errors.weight_max = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value > state.weight_min ? '' : 'El peso máximo debe ser mayor al peso mínimo';
                break;
            case 'life_span_min':
                errors.life_span_min = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value < state.life_span_max ? '' : 'La esperanza de vida mínima debe ser menor a la esperanza de vida máxima';
                break;
            case 'life_span_max':
                errors.life_span_max = !numberPattern.test(value) ? 'El dato ingresado debe ser un número mayor a cero' : value > state.life_span_min ? '' : 'La esperanza de vida máxima debe ser mayor a la esperanza de vida mínima';
                break;
            default:
                break;
        }

        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    function handleSelectChange(e) {
        setState({
            ...state,
            temperaments: [...state.temperaments, e.target.value]
        });
    };

    function handleDelete (e) {
        setState({
            ...state,
            temperaments: [...state.temperaments.filter(temp => temp !== e)]
        })
    }

    const allTemperaments = useSelector(state => state.temperaments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    const history = useHistory()

    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(state)
        alert('Raza creada con exito')
        dispatch(createBreed(state))
        setState({
            name: '',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            life_span_min: '',
            life_span_max: '',
            temperaments: [],
            errors: {
                name: '* campo requerido',
                height_min: '* campo requerido',
                height_max: '* campo requerido',
                weight_min: '* campo requerido',
                weight_max: '* campo requerido',
                life_span_min: '',
                life_span_max: '',

            },
            disabled: true
        })
        history.push('/home')
    }

    return (
        <div className={s.style}>
            <h2>Creá tu propia raza</h2>
            <form className={s.container} onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <br />
                    <div>
                        <label>{state.name && <>{'Nombre de la raza : '}</>}</label>
                        <input type="text" name="name" value={state.name} onChange={(e) => handleChange (e)} placeholder='Nombre de la raza' required />
                        {state.errors.name && <p className="">{state.errors.name}</p>}
                    </div>
                    <div>
                        <label>{state.height_min && <>{'Altura mínima (cm) : '}</>}</label>
                        <input type="text" name="height_min" value={state.height_min} onChange={(e) => handleChange (e)} placeholder='Altura mínima (centímetros)' required />
                        {state.errors.height_min && <p className="">{state.errors.height_min}</p>}
                    </div>
                    <div>
                        <label>{state.height_max && <>{'Altura máxima (cm) : '}</>}</label>
                        <input type="text" name="height_max" value={state.height_max} onChange={(e) => handleChange (e)} placeholder='Altura máxima (centímetros)' required />
                        {state.errors.height_max && <p>{state.errors.height_max}</p>}
                    </div>
                    <div>
                        <label>{state.weight_min && <>{'Peso mínimo (kg) : '}</>}</label>
                        <input type="text" name="weight_min" value={state.weight_min} onChange={(e) => handleChange (e)} placeholder='Peso mínimo (kilogramos)' required />
                        {state.errors.weight_min && <p>{state.errors.weight_min}</p>}
                    </div>
                    <div>
                        <label>{state.weight_max && <>{'Peso máximo (kg) : '}</>}</label>
                        <input type="text" name="weight_max" value={state.weight_max} onChange={(e) => handleChange (e)} placeholder='Peso máximo (kilogramos)' required />
                        {state.errors.weight_max && <p>{state.errors.weight_max}</p>}
                    </div>
                    <div>
                        <label>{state.life_span_min && <>{'Esperanza de vida mínima (años) : '}</>}</label>
                        <input type="text" name="life_span_min" value={state.life_span_min} onChange={(e) => handleChange (e)} placeholder='Esperanza de vida mínima (años)' required/>
                        {state.errors.life_span_min && <p>{state.errors.life_span_min}</p>}
                    </div>
                    <div>
                        <label>{state.life_span_max && <>{'Esperanza de vida máxima (años) : '}</>}</label>
                        <input type="text" name="life_span_max" value={state.life_span_max} onChange={(e) => handleChange (e)} placeholder='Esperanza de vida máxima (años)' required/>
                        {state.errors.life_span_max && <p>{state.errors.life_span_max}</p>}
                    </div>
                    <label>Seleccionar temperamento/s:
                        <br />
                        <select name='temperaments' value={state.value} onChange={(e) => handleSelectChange (e)}>
                            {allTemperaments && allTemperaments.map(e => {
                                return (
                                    <option key={e.ID} name="temperament" value={e.Nombre}> {e.Nombre} </option>
                                )
                            })}
                        </select>
                        {state.temperaments && state.temperaments.map((e, i) => (
                            <div key={i}>
                                <label htmlFor={`${i}`}>{`Temperamento  # ${i + 1} :  ${e}`}</label>
                                <button className={s.buttonX} onClick={()=> handleDelete(e)}>x</button>
                            </div>
                        ))}
                    </label>
                    <br />
                    <button className={s.buttonCreate} type="submit" disabled={state.errors.name || state.errors.height_min || state.errors.height_max || state.errors.weight_min || state.errors.weight_max || state.errors.life_span_min || state.errors.life_span_max ? true : false}>Crear Raza</button>
                </div>
            </form>
        </div>
    )
};

export default CreateBreed;