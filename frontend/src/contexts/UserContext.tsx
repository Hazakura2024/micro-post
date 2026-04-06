import { createContext } from "react";
import type { UserInfo } from "../types/User";

// (学習メモ): データの共有バケツの実体
export const UserContext = createContext(
    // (学習メモ): contextの型定義

    // (学習メモ): asは型強制
    // (学習メモ): 最初は実体がないので無理やり教えておく
    {} as {
        userInfo: UserInfo;
        // (学習メモ): 以下はsetUserInfoにカーソルを当てたら分かるもの。
        // (学習メモ): SetStateAction: データの更新方法を、値を直接入れる&関数で更新するの両方で許可
        // (学習メモ): Dispach: Reactにおいて、「状態を更新するために、新しい値をエンジンに送り込む関数」であることを示す
        setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
        saveInfoWithName: (id: number) => Promise<void>;
    },
);