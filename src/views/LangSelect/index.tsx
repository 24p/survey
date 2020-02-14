import React from 'react';
import { useLocalStorage } from '../../utilities/hooks';
import './styles.css';
import { Link } from 'react-router-dom';

export const LANG_SET = new Map([
    [
        'EN',
        {
            label: 'English',
            startLabel: 'Start the survey',
            nextPageLabel: 'next page',
            previousPageLabel: 'previous page   ',
        },
    ],
    [
        'DE',
        {
            label: 'German',
            startLabel: 'Starten Sie die Umfrage',
            nextPageLabel: 'Nächste Seite',
            previousPageLabel: 'vorherige Seite',
        },
    ],
    [
        'AR',
        {
            label: 'Arabic',
            startLabel: 'بدء الاستطلاع',
            nextPageLabel: 'الصفحة التالية',
            previousPageLabel: 'الصفحة السابقة',
        },
    ],
    [
        'HY',
        {
            label: 'Armenian',
            startLabel: 'Սկսեք հարցումը',
            nextPageLabel: 'հաջորդ էջը',
            previousPageLabel: 'Նախորդ էջ',
        },
    ],
    [
        'CS',
        {
            label: 'Czech',
            startLabel: 'Zahájit průzkum',
            nextPageLabel: 'další strana',
            previousPageLabel: 'předchozí stránka',
        },
    ],
    [
        'DA',
        {
            label: 'Danish',
            startLabel: 'Start undersøgelsen',
            nextPageLabel: 'Næste side',
            previousPageLabel: 'forrige side',
        },
    ],
    [
        'NL',
        {
            label: 'Dutch',
            startLabel: 'Start de enquête',
            nextPageLabel: 'volgende bladzijde',
            previousPageLabel: 'vorige bladzijde',
        },
    ],
    [
        'FA',
        {
            label: 'Persian',
            startLabel: 'نظرسنجی را شروع کنید',
            nextPageLabel: 'صفحه بعد',
            previousPageLabel: 'صفحه قبلی',
        },
    ],
    [
        'FI',
        {
            label: 'Finnish',
            startLabel: 'Aloita kysely',
            nextPageLabel: 'seuraava sivu',
            previousPageLabel: 'Edellinen sivu',
        },
    ],
    [
        'FR',
        {
            label: 'French',
            startLabel: 'Lancer l\'enquête',
            nextPageLabel: 'page suivante',
            previousPageLabel: 'page précédente',
        },
    ],
    [
        'HE',
        {
            label: 'Hebrew',
            startLabel: 'התחל את הסקר',
            nextPageLabel: 'עמוד הבא',
            previousPageLabel: 'עמוד קודם',
        },
    ],
    [
        'IT',
        {
            label: 'Italian',
            startLabel: 'Inizia il sondaggio',
            nextPageLabel: 'pagina successiva',
            previousPageLabel: 'pagina precedente',
        },
    ],
    [
        'RO',
        {
            label: 'Romanian',
            startLabel: 'Începeți sondajul',
            nextPageLabel: 'pagina următoare',
            previousPageLabel: 'pagina precedentă',
        },
    ],
    [
        'ZH',
        {
            label: 'Chinese',
            startLabel: '开始调查',
            nextPageLabel: '下一页',
            previousPageLabel: '上一页',
        },
    ],
    [
        'ES',
        {
            label: 'Spanish',
            startLabel: 'Comience la encuesta',
            nextPageLabel: 'siguiente página',
            previousPageLabel: 'pagina anterior',
        },
    ],
]);
export const LangSelectPage = () => {
    const [gdsLang, setGdsLang] = useLocalStorage<string | null>('gds_lang', null);

    const selectedLang = LANG_SET.get(gdsLang);

    return (
        <div className='page'>
            <img
                src='https://www.globaldrugsurvey.com/wp-content/themes/globaldrugsurvey/assets/img/header-logo-mobile@2x.png'
                alt='Global Drugs survey'
                width='100%'
                height='auto'
            />
            <br/><hr/><br/>

            <div className='lang-buttons'>
                {Array.from(LANG_SET).map(([shortCode, lang]) =>
                    <button
                        key={shortCode}
                        value={shortCode}
                        onClick={() => setGdsLang(shortCode)}
                        className={`button ${shortCode === gdsLang ? 'selected' : ''}`}
                    >
                        {lang.label}
                    </button>,
                )}
            </div>
            <br/><hr/><br/>
            {selectedLang &&
            <Link to={gdsLang} className='start-survey-button'>
                <button className='button selected'>
                    {selectedLang.startLabel}
                </button>
            </Link>
            }
        </div>
    );
};
