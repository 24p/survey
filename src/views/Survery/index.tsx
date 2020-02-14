import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { get } from '../../utilities/xhr';
import { useLocalStorage } from '../../utilities/hooks';
import { Button, Col, Row } from 'antd';
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

export type Page = {
    name: string;
    conditions?: ReadonlyArray<Condition>;
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
    page.conditions.forEach(checkCondition);

    return true;
};

export const Survey = () => {
    const {lang, surveyId} = useParams();
    if(!lang) {

        return null;
    }
    const selectedLang = LANG_SET.get(lang);

    const [survey, setSurvey] = useLocalStorage<ReadonlyArray<Page> | null>('gds_survey', null);
    const [page, setPage] = useLocalStorage<number>('gds_page', 0);

    const onPreviousPageClick = () => {
        if (page === 0) {
            history.back();
            return;
        }
        setPage( (page: number) => page -1 );
    };
    const onNextPageClick = () => {
        setPage((page: number) => page + 1);
    };

    useEffect(() => {
        (async () => {
            // fetch survey with lang and surveyId
            try {
                const response = await get(
                    'https://api.myjson.com/bins/15kkqw'
                    // `gds-platform.com/survey/${surveyId}/${lang}.json`
                );
                setSurvey(response);
            }
            catch(err) {
                console.warn(err);
            }
        })();
    }, [lang, surveyId]);

    if (!survey || !selectedLang) {
        return <LoadingIndicator />;
    }

    if (page > survey.length) {
        // TODO return submit page

        return <LoadingIndicator />;
    }

    const selectedPage: Page = survey[page];

    if (!conditionsFulfilled(page)) {
        setPage((page: number) => page + 1);

        return <LoadingIndicator />;
    }

    return (
        <div className='page'>
            <Row>
                <Col span={24}>
                    <img
                        src='https://www.globaldrugsurvey.com/wp-content/themes/globaldrugsurvey/assets/img/header-logo-mobile@2x.png'
                        alt='Global Drugs Survey'
                        width='100%'
                        height='auto'
                    />
                </Col>
            </Row>
            <Row>
                <Col
                    span={24}
                    className='loading-col'
                >
                    <SurveyPage page={selectedPage} />
                </Col>
            </Row>
            <br/><hr/><br/>
            <Row gutter={[32, 32]}>
                <Col
                    span={12}
                    className='navigate-col'
                >
                    <Button
                        size='large'
                        type='dashed'
                        className='navigate-button'
                        onClick={onPreviousPageClick}
                    >
                        {selectedLang.previousPageLabel}
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        size='large'
                        type='primary'
                        className='navigate-button'
                        onClick={onNextPageClick}
                    >
                        {selectedLang.nextPageLabel}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};
