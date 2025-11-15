

interface SetList {
    name: string,
    songs: string[],
}

interface Song {
    id: string,
    title: string,
    artist: string,
    minutes: number,
    seconds: number,
    type: string,
    key: string[],
    bpm: number,
    link: string,
    notes: string,
    bandId: string,
}

export {
    SetList,
    Song
};
