import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { LangSelectPage } from '../LangSelect';
import { Survey } from '../Survery';
import './styles.css';

const SURVEY_ID = 'gds-2022';

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
                    <Survey />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
