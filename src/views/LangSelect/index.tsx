import React from 'react';
import { useLocalStorage } from '../../utilities/hooks';
import { Button, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import './styles.css';
import { Link } from 'react-router-dom';

const LANG_SET = [
    {
        shortCode: 'EN',
        label: 'English'
    },
    {
        shortCode: 'DE',
        label: 'German'
    },
    {
        shortCode: 'AR',
        label: 'Arabice'
    },
    {
        shortCode: 'HY',
        label: 'Armenian'
    },
    {
        shortCode: 'CS',
        label: 'Czech'
    },
    {
        shortCode: 'DA',
        label: 'Danish'
    },
    {
        shortCode: 'NL',
        label: 'Dutch'
    },
    {
        shortCode: 'FA',
        label: 'Persian'
    },
    {
        shortCode: 'FI',
        label: 'Finnish'
    },
    {
        shortCode: 'FR',
        label: 'French'
    },
    {
        shortCode: 'HE',
        label: 'Hebrew'
    },
    {
        shortCode: 'IT',
        label: 'Italian'
    },
    {
        shortCode: 'RO',
        label: 'Romanian'
    },
    {
        shortCode: 'ZH',
        label: 'Chinese'
    },
];
export const LangSelectPage = () => {
    const [gdsLang, setGdsLang] = useLocalStorage<string | null>('gds_lang', null);

    const selectedLang = LANG_SET.find(l => l.shortCode === gdsLang);

    return (
        <div className='language-selection'>
            <Radio.Group
                value={gdsLang}
                onChange={(event: RadioChangeEvent) => setGdsLang(event.target.value)}
            >
                { LANG_SET.map( lang =>
                    <Radio.Button
                        key={lang.shortCode}
                        value={lang.shortCode}
                    >
                        {lang.label}
                    </Radio.Button>)}
            </Radio.Group>
            { selectedLang && <Link to={gdsLang} ><Button>
            </Button></Link> }
        </div>
    );
};
