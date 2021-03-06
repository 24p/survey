import { useEffect, useState } from 'react';
import { apiGraphQLClient } from './graphQlClient';

const SO7_SURVEY_QUERY = `
    query(
        $surveyId: ID,
    ){
        survey(
            surveyId: $surveyId,
        ){
            id,
            meta{
                name
            },
            config,
            sections
        }
    }
`;

const SO7_TRANSLATION_QUERY = `
    query(
        $id: ID,
    ){
        translation(
            id: $id,
        )
    }
`;

export function useDebounce<T>(value: T, delay: number = 500) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => clearTimeout(handler);
        },
        [value, delay] // Only re-call effect if value or delay changes
    );

    return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export const fetchSurvey = async (
    surveyId: string,
): Promise<any | null> => {
    const variables = {
        surveyId,
    };

    try {
        const responseData = await apiGraphQLClient.unauthorizedRequest<any, { survey: any }>(
            SO7_SURVEY_QUERY,
            variables,
        );

        return responseData?.survey ?? null;
    } catch (err) {
        console.error(JSON.stringify(err?.message));

        return null;
    }
};

export const fetchTranslation = async (
    id: string,
    language: string,
): Promise<any | null> => {
    const variables = {
        id,
    };

    try {
        const responseData = await apiGraphQLClient.unauthorizedRequest<any, any>(
            SO7_TRANSLATION_QUERY,
            variables,
        );
        console.log("-> responseData", responseData);

        return responseData?.translation?.[language] ?? 'NOT FOUND';
    } catch (err) {
        console.error(JSON.stringify(err?.message));

        return null;
    }
};
