import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import './styles.css';
import { MultiQuestion, Option, Page, Question } from '../../views/Survery';
import { fetchTranslation, useLocalStorage } from '../../utilities/hooks';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

const MultiQuestionComponent = ({question}: {question: MultiQuestion}) => {

    return <div
        key={question.name}
        className='question'
    >
        <label htmlFor={question.name}>
            <Translation
                id={question.description}
            />
        </label>
        {
            question.options.map(
                (option: Option, i) =>
                    <div
                        key={i}
                    >
                        <Translation
                            id={option.description}
                        />
                    </div>
            )
        }
    </div>
}

const QuestionComponent = (
    {question}: {question: Question}
) => {
    const [answer, setAnswer] = useLocalStorage(question.name, '');
    const [focused, setFocued] = useState(false);
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => setAnswer(event.target.value);

    switch (question.type) {
        case 'number':
            const min = question?.minValue ?? undefined;
            const max = question?.maxValue ?? undefined;
            return <div
                key={question.name}
                className='question'
            >
                <label htmlFor={question.name}>
                    <Translation
                        id={question.description}
                    />
                </label>
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
                <label htmlFor={question.name}>
                    <Translation
                        id={question.description}
                    />
                </label>
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
                <label htmlFor={question.name}>
                    <Translation
                        id={question.description}
                    />
                </label>
                <SingleDatePicker
                    id={question.name}
                    focused={focused}
                    onFocusChange={(props: any ) => {
                        setFocued(props.focused)
                    }}
                    date={moment(answer || new Date()) as any}
                    onDateChange={setAnswer}
                    noBorder={true}
                    numberOfMonths={1}
                />
            </div>;
        case 'multi':
            return <MultiQuestionComponent
                question={question}
            />;
        default:
            return null;
    }
};

type TProps = {
    page: Page;
    selectedLang: any;
    onSubmit: () => void;
}

const Translation = ({id}: {id: string}) => {
    const [title, setTitle] = useState<string>('');
    useEffect(() => {
        fetchTranslation(id, 'en')
            .then(setTitle)
            .catch(console.error)
    }, [id]);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: title,
            }}
        />
    );
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
        <Translation
            id={page.description}
        />
        <form
            ref={SurveyPageRef}
            onSubmit={handleSubmit}
        >
            {page.items.map(
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
