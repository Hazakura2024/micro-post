import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserInfo } from "../types/User";

// データの共有バケツの実体
export const userContext = createContext(
    // contextの型定義

    // asは型強制
    // 最初は実体がないので無理やり教えておく
    {} as {
        userInfo: UserInfo;
        // 以下はsetUserInfoにカーソルを当てたら分かるもの。
        // SetStateAction: データの更新方法を、値を直接入れる&関数で更新するの両方で許可
        // Dispach: Reactにおいて、「状態を更新するために、新しい値をエンジンに送り込む関数」であることを示す
        setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    },
);

// Providerコンポーネント:アプリ全体を包み込むための部品。
// propsはany となっているが、Provider の中身（children）が入ってくる。
export const UserProvider = (props: any) => {
    // children（子コンポーネントたち）を取り出す。
    const { children } = props;
    const [userInfo, setUserInfo] = useState({id: 0, token: "" })
    // value 属性に渡したオブジェクトが、中に入っている全コンポーネントからアクセス可能に。
    return (
        <userContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </userContext.Provider>
    )
}