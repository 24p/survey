import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

export const SurveyPage = () => {
    const {lang, surveyId} = useParams();


    return (
        <div className='language-selection'>
            {lang }{surveyId}
        </div>
    );
};
