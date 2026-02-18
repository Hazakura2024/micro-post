import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown, defaultMessage: string): never => {
    // NOTE: 1.ネットワークエラー（サーバー到達不可の場合）
    if (error instanceof AxiosError && !error.response) {
        throw new Error('ネットワークに接続できません');
    }

    // NOTE: 2.HTTPエラー
    if (error instanceof AxiosError && error.response) {
        console.log(error.response)
        throw error;
    }

    if (error instanceof Error) {
        throw error;
    }

    // NOTE: その他の予期しないエラー
    throw new Error(defaultMessage);
}