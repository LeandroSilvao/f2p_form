import { createContext, useEffect, useState } from "react"

import axios from 'axios'
import config from '../config'

const InitialState = {
    questions:[],
    answers:[]
}

export const FormSuityContext = createContext(InitialState);

export const FormSuityProvider = (props) => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        GetQuestions()
        GetAnswers()
    }, [])

    function GetQuestions() {
        axios.get(config._urlQuestions)
            .then(res => { if (res.data) setQuestions(res.data) })
            .catch(err => console.log(`${err}`))
    }

    function GetAnswers() {
        axios.get(config._urlAnswers)
            .then(res => { if (res.data) setAnswers(res.data) })
            .catch(err => console.log(err))
    }

    return (
        <FormSuityContext.Provider
            value={{
                questions, answers
            }}
        >
            {props.children}
        </FormSuityContext.Provider>
    );
};
