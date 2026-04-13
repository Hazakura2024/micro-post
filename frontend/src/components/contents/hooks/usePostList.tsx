import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../../../contexts/PostListContext";

export const usePostList = () => {
    const {
        postList,
        getPostList,
        isLoading,
        page,
        setPage,
        searchWord,
        setSearchWord,
        searchName,
        setSearchName,
    } = useContext(PostListContext);

    const [localSearchWord, setLocalSearchWord] = useState("");
    const [localSearchName, setLocalSearchName] = useState("");

    // 初表示時の取得
    useEffect(() => {
        getPostList(0, undefined, searchWord, searchName);
        setPage(1)
    }, []);

    // 更新ボタンはこのままで良さそう
    const onClickReload = () => {
        getPostList(0, undefined, searchWord, searchName);
        setPage(1)
    };

    const onClickClear = () => {
        setSearchName("")
        setSearchWord("")
        setPage(1)
        setLocalSearchName("")
        setLocalSearchWord("")
    }

    const onClickNext = () => {
        setPage(page + 1)
    }

    const onClickBack = () => {
        setPage(page - 1)
    }

    const onChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchWord(e.target.value)

    }
    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLocalSearchName(e.target.value)
    }

    const onClickSearch = () => {
        setPage(1)
        setSearchName(localSearchName)
        setSearchWord(localSearchWord)
    }
    return {
        isLoading,
        onClickReload,
        localSearchWord,
        onChangeSearchWord,
        localSearchName,
        onChangeSearchName,
        onClickSearch,
        onClickClear,
        onClickBack,
        page,
        onClickNext,
        postList,
    }

}