import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { UserInfo } from "../types/User";
import { getUser } from "../api/User";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { apiClient } from "../hooks/useAxiosIntercepter";

// (学習メモ): Providerコンポーネント:アプリ全体を包み込むための部品。
// (学習メモ): propsはany となっているが、Provider の中身（children）が入ってくる。
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // (学習メモ): children（子コンポーネントたち）を取り出す。

  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, name: "", icon_path: null, token: "" });
  // (学習メモ): value 属性に渡したオブジェクトが、中に入っている全コンポーネントからアクセス可能に。

  const saveInfoWithName = async (id: number) => {
    try {
      const user = await getUser();
      setUserInfo(prev => ({
        ...prev,
        id: id,
        name: user.name,
        icon_path: user.icon_path,
      }));
    } catch (error: unknown) {
      const msg = extractErrorMessage(error, "ユーザー情報が取得できません");
      toast.error(msg);
      setUserInfo(prev => ({
        ...prev,
        id: id,
        name: "",
        icon_path: "",
      }));
      throw error;
    }
  };

  const [authLoading, setAuthLoading] = useState(true);

  const bootstrappedRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (!bootstrappedRef.current) {
      bootstrappedRef.current = (async () => {
        try {
          const res = await apiClient.post('/auth/refresh');
          const token = res.data.token;

          apiClient.defaults.headers.common.Authorization = "Bearer " + token;


          setUserInfo(prev => ({
            ...prev,
            token,
          }))

          const user = await getUser();

          setUserInfo((prev) => ({
            ...prev,
            id: user.id,
            name: user.name,
            icon_path: user.icon_path,
          }))
        } catch {
          delete apiClient.defaults.headers.common.Authorization;
          setUserInfo({ id: 0, name: "", icon_path: null, token: "" });
        }
      })()
    };

    bootstrappedRef.current.finally(() => {
      setAuthLoading(false);
    })
  }, [])

  // (学習メモ): レンダリングへの影響を考慮し、メモ化する
  const value = useMemo(
    () => ({ authLoading, userInfo, setUserInfo, saveInfoWithName }),
    [userInfo, authLoading],
  );

  if (authLoading) {
    return <div>Loading...</div>

  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
