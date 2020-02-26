import React, { ChangeEvent, useRef } from 'react';

import './styles.css';
import { Page, Question } from '../../views/Survery';
import { useLocalStorage } from '../../utilities/hooks';

const QuestionComponent = (
    {question}: {question: Question}
) => {
    const [answer, setAnswer] = useLocalStorage(question.name, null);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        setAnswer(event.target.value);


    switch (question.type) {
        case 'number':
            const min = question?.minValue ?? 10;
            const max = question?.maxValue ?? 99999;
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
            // const minLength = question?.minCharacters ?? '';
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <input
                    type='text'
                    name={question.name}
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
                <input
                    type='text'
                    name={question.name}
                    value={answer}
                    onChange={handleInputChange}
                />
            </div>;
        case 'multi':
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>{question.title}</label>
                <input
                    type='text'
                    name={question.name}
                    value={answer}
                    onChange={handleInputChange}
                />
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
