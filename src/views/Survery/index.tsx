import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { fetchSurvey, useLocalStorage } from '../../utilities/hooks';
import { LANG_SET } from '../LangSelect';
import { SurveyPage } from '../../components/SurveyPage';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export type ConditionType = '<' | '>' | '=' | '!';
export type QuestionKey = string;
export type QuestionAnswer = string;
export type Condition = [
    QuestionKey,
    ConditionType,
    QuestionAnswer
];

export type NumberQuestion = {
    type: 'number';
    name: string;
    description: string;
    minValue: number;
    maxValue: number;
};

export type DateQuestion = {
    type: 'date';
    name: string;
    description: string;
};

export type TextQuestion = {
    type: 'text';
    name: string;
    description: string;
    maxCharacters?: number;
    minCharacters?: number;
}

export type RatingQuestion = {
    type: 'rating';
    name: string;
    description: string;
    length: number
}

export type Option = {
    name: string;
    description: string;
}
export type MultiQuestion = {
    type: 'multi',
    name: string;
    description: string;
    maxOptions: number;
    minOptions: number;
    options: ReadonlyArray<Option>
}

export type Question = MultiQuestion | TextQuestion | DateQuestion | NumberQuestion | RatingQuestion;
export type Page = {
    name: string;
    description: string;
    conditions?: ReadonlyArray<Condition>;
    items: ReadonlyArray<Question>;
};

const checkCondition = (condition: Condition) => {
    const questionKey = condition[0];
    const conditionType = condition[1];
    const expectedAnswer = condition[2];
    const questionAnswer = localStorage.getItem(questionKey);

    switch (conditionType) {
        case '!':
            if (
                String(questionAnswer).replace(' ', '')
                === String(expectedAnswer).replace(' ', '')
            ) return false;
            break;
        case '<':
            if (
                Number(questionAnswer) >= Number(expectedAnswer)
            ) return false;
            break;
        case '=':
            if (
                String(questionAnswer).replace(' ', '')
                !== String(expectedAnswer).replace(' ', '')
            ) return false;
            break;
        case '>':
            if (
                Number(questionAnswer) <= Number(expectedAnswer)
            ) return false;
            break;
    }

    return true
};

const conditionsFulfilled = (page: Page): boolean => {
    if (
        !page.hasOwnProperty('condition')
        || !page.conditions
        || page.conditions.length !== 3
    ) {
        return true;
    }

    // if one condition is not fulfilled, returns false
    return page.conditions.some((condition) => !checkCondition(condition));
};

export const Survey = () => {
    const {lang, surveyId} = useParams();
    const selectedLang = lang ? LANG_SET.get(lang) : null;

    const [survey, setSurvey] = useLocalStorage<ReadonlyArray<Page> | null>('gds_survey', null);
    const [page, setPage] = useLocalStorage<number>('gds_page', 0);

    const onPreviousPageClick = () => {
        if (page === 0) {
            location.pathname = '/';
            return;
        }
        setPage( (p: number) => p -1 );
    };
    const onNextPageClick = () => {
        setPage((p: number) => p + 1);
    };

    useEffect(() => {
        if (!surveyId) {
            return;
        }

        fetchSurvey(
            surveyId,
        ).then(
            setSurvey,
        ).catch(
            console.error
        )
    }, [lang, surveyId]);

    if (!survey || !selectedLang) {
        return <LoadingIndicator />;
    }
    if (page > survey.length -1) {
        // TODO return submit page
        setPage(0);
        location.pathname = '/';

        return <LoadingIndicator />;
    }

    const selectedPage: Page = survey.sections[page];

    if (!conditionsFulfilled(selectedPage)) {
        setPage((p: number) => p + 1);

        return <LoadingIndicator />;
    }

    return (
        <div className='page'>
            <img
                src='https://www.globaldrugsurvey.com/wp-content/themes/globaldrugsurvey/assets/img/header-logo-mobile@2x.png'
                alt='Global Drugs Survey'
                width='100%'
                height='auto'
            />
            <div
                className='loading-col'
            >
                <div
                    className='page-header'
                    onClick={onPreviousPageClick}
                />
                <SurveyPage
                    page={selectedPage}
                    selectedLang={selectedLang}
                    onSubmit={onNextPageClick}
                />
            </div>
            <br/><hr/><br/>
            <div
                className='navigate-col'
            >
                <button
                    className='navigate-button button'
                    onClick={onPreviousPageClick}
                >
                    {selectedLang.previousPageLabel}
                </button>
            </div>
        </div>
    );
};
