import { SetList, Song, User } from "@/constants/types";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";


async function fetchSetListsForBand(bandId: string): Promise<SetList[]> {
    try {
        if (!bandId) return [];
        console.log("fetching set lists for band:", bandId);
        const currentBandSetListsQuery = query(collection(db, "setlists"), where("bandId", "==", bandId));
        const currentBandSetListSnaps = await getDocs(currentBandSetListsQuery);
        const currentBandSetLists: SetList[] = []
        currentBandSetListSnaps.forEach(doc => {
          const data = doc.data()
          const serializedSetList: SetList = {
              id: doc.id,
              name: data?.name ?? "",
              bandId: data?.bandId ?? "",
              createdAt: data?.createdAt ?? Timestamp.now(),
              createdBy: data?.createdBy ?? "",
          }
          currentBandSetLists.push(serializedSetList)
        })
        return currentBandSetLists;
    } catch (e) {
        console.warn("Failed to fetch set lists", e);
        return [];
    }
}

async function fetchSongsForBand(bandId: string): Promise<Song[]> {
    try {
        if (!bandId) return [];
        console.log("fetching songs for band:", bandId);
        const currentBandSongsQuery = query(collection(db, "songs"), where("bandId", "==", bandId));
        const currentBandSongSnaps = await getDocs(currentBandSongsQuery);
        const currentBandSongs: Song[] = []
        currentBandSongSnaps.forEach(doc => {
          const data = doc.data()
          const serializedSong: Song = {
              id: doc.id,
              title: data?.title ?? "",
              artist: data?.artist ?? "",
              minutes: data?.minutes ?? 0,
              seconds: data?.seconds ?? 0,
              type: data?.type ?? "",
              bandId: data?.bandId ?? "",
              key: data?.key || [],
              bpm: data?.bpm ?? 0,
              link: data?.link ?? "",
              notes: data?.notes ?? "",
          }
          currentBandSongs.push(serializedSong)
        })
        return currentBandSongs;
    } catch (e) {
        console.warn("Failed to fetch songs", e);
        return [];
    }
}

async function getUser(userId: string): Promise<User | null> {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const serializedUser: User = {
                uid: userId,
                email: userData?.email ?? "",
                firstName: userData?.firstName ?? "",
                lastName: userData?.lastName ?? "",
                currentBandId: userData?.currentBandId ?? "",
                instruments: userData?.instruments || [],
            }
            return serializedUser;
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (e) {
        console.warn("Failed to fetch user", e);
        return null;
    }
}

export {
    fetchSetListsForBand, fetchSongsForBand, getUser
};

