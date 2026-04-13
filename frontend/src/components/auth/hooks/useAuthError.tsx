import React, { useCallback } from 'react'
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { toast } from 'react-toastify';

export const useAuthError = (
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
    const handleAuthError = useCallback(
        (error: unknown, message: string) => {
            const msg = extractErrorMessage(error, message);
            setErrorMessage(msg);
            toast.error(msg);
        },
        [setErrorMessage],
    );
    return { handleAuthError };
}
