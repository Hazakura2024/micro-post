import styled from "styled-components";
import { usePostList } from "../hooks/usePostList";


export const PostListHeader = () => {

    const {
        isLoading,
        onClickReload,
        localSearchWord,
        onChangeSearchWord,
        localSearchName,
        onChangeSearchName,
        onClickSearch,
        onClickClear,
    } = usePostList()

    return (
        <SHeader>
            <div>投稿一覧 </div>
            <SReloadButton disabled={isLoading} onClick={onClickReload}>
                更新
            </SReloadButton>
            <input type="text" value={localSearchWord} onChange={(e) => onChangeSearchWord(e)} placeholder="内容を検索" />
            <input type="text" value={localSearchName} onChange={(e) => onChangeSearchName(e)} placeholder="ユーザーの投稿を検索" />
            <SMiniButton onClick={onClickSearch}>検索</SMiniButton>
            <SMiniButton onClick={onClickClear}>クリア</SMiniButton>
        </SHeader>
    )
}

export default PostListHeader

const SHeader = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const SReloadButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 16px;
  border-radius: 8px;
  color: #fafafa;
  width: 96px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
const SMiniButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 6px;
  border-radius: 8px;
  color: #fafafa;
  width: 54px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
