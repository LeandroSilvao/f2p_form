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
    }

    let questionsAnswers = []

    function OnChange(e){
        const {value, props} = e
        const req = {
            questionId: parseInt(props.suityQuestionId),
            answerId: parseInt(value)
        }
        questionsAnswers = questionsAnswers.filter(q => q.questionId !== parseInt(props.suityQuestionId))
        questionsAnswers.push(req)
        _Json_FormSuity(questionsAnswers)
    }

    function RenderQuestions() {
        return (
            questions.map((q,index) => {
                return (
                    <div className="div-question-answer" key={q.suityQuestionId} id={q.suityQuestionId}>
                        <span className="inputDescriptionTitle">{q.question}</span>
                        <div className="d-flex">
                            {/* <select className="selectpicker" required name={q.suityQuestionId} id={q.suityQuestionId} onChange={e => OnChangeField(e)}>
                                <option defaultValue value="">{Labels.answers}</option>
                                {RenderAnswers(q.suityQuestionId)}
                            </select> */}
                            <Select title={Labels.answers} required={true} id={index} props={{suityQuestionId: q.suityQuestionId}}
                            options={answers.filter(a => a.suityQuestionId === q.suityQuestionId).map(a => a)} 
                            value="suityAnswerId" label="answer" OnChange={OnChange}/>
                            <p className="required">*</p>
                        </div>
                    </div>
                )
            })
        )
    }



    // function RenderAnswers(QuestionId) {
    //     const answersFiltered = answers.filter(a => a.suityQuestionId === QuestionId)
    //     return (
    //         answersFiltered.map(a => {
    //             return (
    //                 <option key={a.suityAnswerId} value={a.suityAnswerId} >{a.answer}</option>
    //             )
    //         })
    //     )
    // }

    return (RenderQuestions())
}
