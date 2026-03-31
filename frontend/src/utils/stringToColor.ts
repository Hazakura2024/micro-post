const stringToHash = (str: string | null | undefined) => {
    let hash = 0;
    const safeStr = str || ''; // strがnullまたはundefinedの場合、空文字列をフォールバックとして使用
    for (let i = 0; i < safeStr.length; i++) {
        hash = safeStr.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash;
}

export const stringToColor = (userName: string | null | undefined) => { // userNameがnullまたはundefinedを受け入れるように型を修正
    const hash = stringToHash(userName || ''); // stringToHashに安全な文字列を渡す

    const hue = Math.abs(hash) % 360;
    const saturation = 70;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
};