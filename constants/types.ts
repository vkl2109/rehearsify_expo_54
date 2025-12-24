import { Timestamp } from "firebase/firestore";


interface SetList {
    name: string,
    id: string,
    createdAt: Timestamp,
    createdBy: string,
    bandId: string,
    author: string
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

interface SongToSetList {
    songId: string,
    setlistId: string,
    order: number,
    bandId: string,
}

interface User {
    uid: string,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    currentBandId: string | null,
    instruments: string[]
}

interface Band {
    createdAt: Timestamp,
    createdBy: string,
    name: string,
    genre: string,
    lastUpdatedBy: string,
    lastUpdatedAt: Timestamp,
    id: string
}

interface BandMember extends User {
    role: string,
}

export {
    Band, BandMember, SetList,
    Song, SongToSetList, User
};

