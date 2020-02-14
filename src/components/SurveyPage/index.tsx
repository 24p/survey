import React from 'react';

import './styles.css';
import { Page, Question } from '../../views/Survery';

const renderQuestion = (question: Question) => {
    switch (question.type) {
        case 'number':
            return <input />
    }
};

export const SurveyPage = ({page}:{page: Page}) => (<>
        <h1>{page.name}</h1>
        {page.questions.map(renderQuestion)}
    </>
);
