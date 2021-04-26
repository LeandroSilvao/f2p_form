import React, { useEffect, useState } from 'react';

import './index.css'

import { FaAngleDown } from "react-icons/fa";

function Select(props) {
    const [optionsToggle, setOptionsToggle] = useState(false)
    const [options, setOptions] = useState([])
    const [selectValueLabel, setSelectValueLabel] = useState('')

    useEffect(() => {
        setOptions(props.options)
    }, [props.options])

    function setValue(e) {
        const value = e.target.getAttribute("value")
        const label = e.target.getAttribute("label")
        setOptionsToggle(!optionsToggle)
        setSelectValueLabel(label)
        props.OnChange({value, props: props.props})
    }
    function Blur(e) {
        const { relatedTarget } = e
        if (relatedTarget && relatedTarget.getAttribute('kind') === `options-select${props.id}`) { }
        else if (relatedTarget && relatedTarget.getAttribute('kind') === `div-select${props.id}`) { }
        else setOptionsToggle(false)
    }
    function renderOptions() {
        return (
            options.map(opt => {
                return (
                    <span onClick={e => setValue(e)} className="option"
                        key={opt[`${props.value}`]}
                        value={opt[`${props.value}`]}
                        label={opt[`${props.label}`]}>
                        {opt[`${props.label}`]}
                    </span>
                )
            })
        )
    }
    

    return (
        <div className="custom-select" id="custom-select" onClick={() => setOptionsToggle(!optionsToggle)}>
            <div className="div-select" onBlur={(e) => Blur(e)} tabIndex='-1' kind={`div-select${props.id}`}>
                <span>{selectValueLabel === "" ? props.title : selectValueLabel}</span>
                <input required={props.required} value={selectValueLabel === "" ? "" : selectValueLabel} title="Selecione um item da lista" onChange={() =>{}}/>
                <FaAngleDown className="icon-select" onClick={() => setOptionsToggle(!optionsToggle)} />
            </div>
            <div className={optionsToggle ? "options-select" : "d-none"} tabIndex='0' kind={`options-select${props.id}`}>
                {renderOptions()}
            </div>
        </div>
    );
}

export default Select;