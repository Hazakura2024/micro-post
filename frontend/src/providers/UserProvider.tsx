import {
    createContext,
    Dispatch,
    SetStateAction,
    useMemo,
    useState,
} from "react";
import { UserInfo } from "../types/User";

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
        setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    },
);

// (学習メモ): Providerコンポーネント:アプリ全体を包み込むための部品。
// (学習メモ): propsはany となっているが、Provider の中身（children）が入ってくる。
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // (学習メモ): children（子コンポーネントたち）を取り出す。

    const [userInfo, setUserInfo] = useState({ id: 0, token: "" });
    // (学習メモ): value 属性に渡したオブジェクトが、中に入っている全コンポーネントからアクセス可能に。

    // (学習メモ): レンダリングへの影響を考慮し、メモ化する
    const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
