import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import { PostType } from "../types/Post";
import { getList } from "../api/Post";
import { UserContext } from "./UserProvider";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";

export const PostListContext = createContext(
  {} as {
    postList: PostType[];
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    getPostList: () => Promise<void>;
    isloading: boolean;
    setIsloading: Dispatch<React.SetStateAction<boolean>>;
  },
);

export const PostListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [isloading, setIsloading] = useState(false);

  const { userInfo } = useContext(UserContext);

  const getPostList = async () => {
    setIsloading(true);
    try {
      const posts = await getList(userInfo.token);

      if (posts) {
        const formattedPosts = posts.map((p: PostType) => ({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        }));
        setPostList(formattedPosts);
      }
    } catch (error: unknown) {
      const msg = extractErrorMessage(error, '投稿が取得できません');
      toast.error(msg);
    } finally {
      setIsloading(false);
    }
  };

  const value = useMemo(
    () => ({ postList, setPostList, getPostList, isloading, setIsloading }),
    [postList, setPostList, isloading],
  );
  return (
    <PostListContext.Provider value={value}>
      {children}
    </PostListContext.Provider>
  );
};
