import React, { ChangeEvent, useRef } from 'react';

import './styles.css';
import { ImageOption, Page, Question, TextOption } from '../../views/Survery';
import { useLocalStorage } from '../../utilities/hooks';
import DatePicker from 'react-datepicker';

const QuestionComponent = (
    {question}: {question: Question}
) => {
    const [answer, setAnswer] = useLocalStorage(question.name, '');
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) =>
        setAnswer(event.target.value);

    switch (question.type) {
        case 'number':
            const min = question?.minValue ?? undefined;
            const max = question?.maxValue ?? undefined;
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <input
                    type='number'
                    id={question.name}
                    name={question.name}
                    min={min}
                    max={max}
                    value={answer}
                    onChange={handleInputChange}
                />
                <div className="requirements">
                    Must be a between {min} and {max}.
                </div>
            </div>;
        case 'text':
            const minCharacters = question?.minCharacters ?? undefined;
            const maxCharacters = question?.maxCharacters ?? undefined;
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <input
                    type='text'
                    name={question.name}
                    minLength={minCharacters}
                    maxLength={maxCharacters}
                    value={answer}
                    onChange={handleInputChange}
                />
            </div>;
        case 'date':
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <DatePicker
                    selected={answer || new Date()}
                    onChange={setAnswer} />
            </div>;
        case 'multi':
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <select
                    name={question.name}
                    value={answer}
                    onChange={handleInputChange}
                >
                    {
                        question.options.map(
                            (option: ImageOption | TextOption, i) => {
                                switch(option.type) {
                                    case 'image':
                                        return <option
                                            value={option.name}
                                            key={`${option.name}_${i}`}
                                            style={{
                                                backgroundImage: option.url
                                            }}
                                        >
                                        </option>;
                                    case 'text':
                                        return <option
                                            value={option.name}
                                            key={`${option.name}_${i}`}
                                        >
                                            {option.title}
                                        </option>;
                                }
                            }
                        )
                    }
                </select>
            </div>;
        default:
            return null;
    }
};

type TProps = {
    page: Page;
    selectedLang: any;
    onSubmit: () => void;
}
export const SurveyPage = (
    {
        page,
        selectedLang,
        onSubmit,
    }: TProps,
) => {
    const SurveyPageRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pageIsValid = SurveyPageRef?.current?.checkValidity();
        if (!pageIsValid ) {
            return;
        }
        onSubmit();
    };

    return <>
        <h1>{page.name}</h1>
        <form
            ref={SurveyPageRef}
            onSubmit={handleSubmit}
        >
            {page.questions.map(
                (question: Question, i: number) =>
                    <QuestionComponent
                        question={question}
                        key={`question_${i}`}
                    />
                )
            }

            <input
                className='navigate-button button selected'
                type='submit'
                placeholder={selectedLang.nextPageLabel}
            />

        </form>

    </>;
};
