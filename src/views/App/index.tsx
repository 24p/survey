import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { LangSelectPage } from '../LangSelect';
import { SurveyPage } from '../Survery';

const SURVEY_ID = 'xxx-xxxx-xxxx-xxxx';

const LangComponent = () => {
    const {lang} = useParams();

    return <Redirect to={`${lang}/${SURVEY_ID}`}/>
};

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LangSelectPage />
                </Route>
                <Route exact path="/:lang">
                    <LangComponent />
                </Route>
                <Route exact path="/:lang/:surveyId">
                    <SurveyPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
