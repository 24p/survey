import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { get } from '../../utilities/xhr';
import { useLocalStorage } from '../../utilities/hooks';
import { Col, Icon, Row } from 'antd';

export const SurveyPage = () => {
    const {lang, surveyId} = useParams();
    const [survey, setSurvey] = useLocalStorage<any>('gds_survey', null);
    const [page, setPage] = useLocalStorage<number>('gds_page', 0);

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

    if (!survey) {
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
                    className='loading-col'
                >

                    <Icon type="loading" />
                </Col>
            </Row>
        </div>
    );
};
