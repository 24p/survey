import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { get } from '../../utilities/xhr';

export const SurveyPage = () => {
    const {lang, surveyId} = useParams();
    const [survey, setSurvey] = useState<any>(null);

    useEffect(() => {
        (async () => {
            // fetch survey with lang and surveyId
            try {
                const response = await get(
                    `gds-platform.com/survey/${lang}/${surveyId}`
                );
                setSurvey(response);
            }
            catch(err) {
                console.warn(err);
            }
        })();
    }, [lang, surveyId]);

    if (!survey) {
        return <div>loading survey</div>
    }

    return (
        <div className='language-selection'>
            {lang }{surveyId}
        </div>
    );
};
