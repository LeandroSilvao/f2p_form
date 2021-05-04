import React, { useContext } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { FormSuityContext } from "../../contexts/FormSuity";

import Select from "../Select"

import './index.css'

export default function States(props) {
    const { languagePT, _Json_FormSuity } = useContext(FormContext)
    const { answers, questions } = useContext(FormSuityContext)

    const Labels = {
        answers: languagePT ? 'Selecionar uma resposta para a pergunta' : '',
        title: languagePT ? 'Questionário' : ''
    }

    let questionsAnswers = []

    function OnChange(e) {
        const { value, props } = e
        const req = {
            questionId: parseInt(props.suityQuestionId),
            answerId: parseInt(value)
        }
        questionsAnswers = questionsAnswers.filter(q => q.questionId !== parseInt(props.suityQuestionId))
        questionsAnswers.push(req)
        _Json_FormSuity(questionsAnswers)
    }

    function RenderAnswers(QuestionId) {
        const answersFiltered = answers.filter(a => a.suityQuestionId === QuestionId)
        return (
            answersFiltered.map(a => {
                return (
                    <option key={a.suityAnswerId} value={a.suityAnswerId} >{a.answer}</option>
                )
            })
        )
    }

    function RenderQuestions() {
        return (
            questions.map((q, index) => {
                return (
                    <div className="div-question-answer" key={q.suityQuestionId} id={q.suityQuestionId}>
                        <div className="d-flex">
                            <p className="required">*</p>
                            <p className="inputDescription">{q.question}</p>
                        </div>
                        <select className="selectpicker" required name={q.suityQuestionId} id={q.suityQuestionId}
                            onChange={e => OnChange(e)}>
                            <option defaultValue value="">{Labels.answers}</option>
                            {RenderAnswers(q.suityQuestionId)}
                        </select>

                        {/* <Select title={Labels.answers} required={true} id={index} props={{ suityQuestionId: q.suityQuestionId }}
                            options={answers.filter(a => a.suityQuestionId === q.suityQuestionId).map(a => a)}
                            value="suityAnswerId" label="answer" OnChange={OnChange} /> */}
                    </div>
                )
            })
        )
    }


    return (
        <>
            <div className="componentTitle">
                <span>{Labels.title}</span>
                <hr />
            </div>
            {RenderQuestions()}
        </>
    )
}
