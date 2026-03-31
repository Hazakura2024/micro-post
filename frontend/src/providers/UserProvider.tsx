import {
  useMemo,
  useState,
} from "react";
import type { UserInfo } from "../types/User";
import { getUser } from "../api/User";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

// (学習メモ): Providerコンポーネント:アプリ全体を包み込むための部品。
// (学習メモ): propsはany となっているが、Provider の中身（children）が入ってくる。
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // (学習メモ): children（子コンポーネントたち）を取り出す。

  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, name: "", icon_path: null, token: "" });
  // (学習メモ): value 属性に渡したオブジェクトが、中に入っている全コンポーネントからアクセス可能に。

  const saveInfoWithName = async (id: number, token: string) => {
    try {
      const user = await getUser(id, token);
      setUserInfo({
        id: id,
        name: user.name,
        icon_path: user.icon_path,
        token: token,
      });
    } catch (error: unknown) {
      const msg = extractErrorMessage(error, "ユーザー情報が取得できません");
      toast.error(msg);
      setUserInfo({
        id: id,
        name: "",
        icon_path: "",
        token: token,
      });
    }
  };

  // (学習メモ): レンダリングへの影響を考慮し、メモ化する
  const value = useMemo(
    () => ({ userInfo, setUserInfo, saveInfoWithName }),
    [userInfo],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
