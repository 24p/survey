import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { get } from '../../utilities/xhr';
import { useLocalStorage } from '../../utilities/hooks';
import { Button, Col, Icon, Row } from 'antd';
import { LANG_SET } from '../LangSelect';

export const SurveyPage = () => {
    const {lang, surveyId} = useParams();
    if(!lang) {

        return null;
    }
    const selectedLang = LANG_SET.get(lang);

    const [survey, setSurvey] = useLocalStorage<any>('gds_survey', null);
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
        return <div className='page'>
            <Row>
                <Col
                    span={24}
                >

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
                >

                    <Icon type="loading" />
                </Col>
            </Row>
        </div>
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
                    <Icon type="loading" />
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
