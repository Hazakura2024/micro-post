import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown, defaultMessage: string) => {

    // NOTE: classValidatorはmessageを文字列または配列で返すため、両方表示できるように。
    if (error instanceof AxiosError && error.response?.data?.message) {
        const msg = error.response.data.message;

        if (Array.isArray(msg)) {
            return msg.join(', ');
        }

        if (typeof msg === 'string') {
            return msg;
        }

    } else if (error instanceof AxiosError) {
        return error.message;
    }
    return defaultMessage;
}