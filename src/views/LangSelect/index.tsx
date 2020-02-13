import React from 'react';
import { useLocalStorage } from '../../utilities/hooks';
import { Button, Row, Col } from 'antd';
import './styles.css';
import { Link } from 'react-router-dom';

const LANG_SET = [
    {
        shortCode: 'EN',
        label: 'English',
        startLabel: 'Start the survey'
    },
    {
        shortCode: 'DE',
        label: 'German',
        startLabel: 'Starten Sie die Umfrage'
    },
    {
        shortCode: 'AR',
        label: 'Arabic',
        startLabel: 'بدء الاستطلاع'
    },
    {
        shortCode: 'HY',
        label: 'Armenian',
        startLabel: 'Սկսեք հարցումը'
    },
    {
        shortCode: 'CS',
        label: 'Czech',
        startLabel: 'Zahájit průzkum'
    },
    {
        shortCode: 'DA',
        label: 'Danish',
        startLabel: 'Start undersøgelsen'
    },
    {
        shortCode: 'NL',
        label: 'Dutch',
        startLabel: 'Start de enquête'
    },
    {
        shortCode: 'FA',
        label: 'Persian',
        startLabel: 'نظرسنجی را شروع کنید'
    },
    {
        shortCode: 'FI',
        label: 'Finnish',
        startLabel: 'Aloita kysely'
    },
    {
        shortCode: 'FR',
        label: 'French',
        startLabel: 'Lancer l\'enquête'
    },
    {
        shortCode: 'HE',
        label: 'Hebrew',
        startLabel: 'התחל את הסקר'
    },
    {
        shortCode: 'IT',
        label: 'Italian',
        startLabel: 'Inizia il sondaggio'
    },
    {
        shortCode: 'RO',
        label: 'Romanian',
        startLabel: 'Începeți sondajul'
    },
    {
        shortCode: 'ZH',
        label: 'Chinese',
        startLabel: '开始调查'
    },
    {
        shortCode: 'ES',
        label: 'Spanish',
        startLabel: 'Comience la encuesta',
    },
];
export const LangSelectPage = () => {
    const [gdsLang, setGdsLang] = useLocalStorage<string | null>('gds_lang', null);

    const selectedLang = LANG_SET.find(l => l.shortCode === gdsLang);

    return (
        <div className='page'>
            <Row>
                <Col
                    span={24}
                >
                    <img
                        src='https://www.globaldrugsurvey.com/wp-content/themes/globaldrugsurvey/assets/img/header-logo-mobile@2x.png'
                        alt='Global Drugs survey'
                        width='100%'
                        height='auto'
                    />
                </Col>
            </Row>
            <br/><hr/><br/>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                { LANG_SET.map( lang =>
                    <Col
                        key={lang.shortCode}
                        span={6}
                    >
                        <Button
                            value={lang.shortCode}
                            onClick={()=>setGdsLang(lang.shortCode)}
                            className='lang-button'
                            size='large'
                            type={lang.shortCode === gdsLang ? 'primary' : 'dashed'}
                        >
                            {lang.label}
                        </Button>
                    </Col>
                )}
            </Row>
            <br/><hr/><br/>
            <Row>
                { selectedLang && <Col
                    span={24}
                >
                    <Link to={gdsLang} className='start-survey-button'>
                        <Button size='large' type='primary'>
                            {selectedLang.startLabel}
                        </Button>
                    </Link>
                </Col>}
            </Row>
        </div>
    );
};
