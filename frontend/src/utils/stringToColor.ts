const stringToHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash;
}

export const stringToColor = (userName: string) => {
    const hash = stringToHash(userName);

    const hue = Math.abs(hash) % 360;
    const saturation = 70;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
};