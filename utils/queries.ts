import { SetList, Song, SongToSetList, User } from "@/constants/types";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, runTransaction, Timestamp, where } from "firebase/firestore";


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

async function fetchSongsToSetListsForBand(bandId: string): Promise<SongToSetList[]> {
    try {
        if (!bandId) return [];
        console.log("fetching songs to setlists for band:", bandId);
        const currentBandSongsToSetListsQuery = query(collection(db, "songsToSetLists"), where("bandId", "==", bandId));
        const currentBandSongsToSetListsSnaps = await getDocs(currentBandSongsToSetListsQuery);
        const currentBandSongsToSetLists: SongToSetList[] = []
        currentBandSongsToSetListsSnaps.forEach(doc => {
          const data = doc.data()
          const serializedSongToSetList: SongToSetList = {
              songId: data?.songId ?? "",
              setlistId: data?.setlistId ?? "",
              order: data?.order ?? 0,
              bandId: data?.bandId ?? "",
          }
          currentBandSongsToSetLists.push(serializedSongToSetList)
        })
        return currentBandSongsToSetLists;
    } catch (e) {
        console.warn("Failed to fetch songs to setlists", e);
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

async function deleteSetListAndSongs(setListId: string): Promise<void> {
    try {
        await runTransaction(db, async (transaction) => {
            const setListDocRef = doc(db, "setlists", setListId);
            const songsToSetListsQuery = query(
                collection(db, "songsToSetLists"),
                where("setlistId", "==", setListId)
            );
            const songsToSetListsSnaps = await getDocs(songsToSetListsQuery);
            songsToSetListsSnaps.forEach((docSnap) => {
                transaction.delete(docSnap.ref);
            });
            transaction.delete(setListDocRef);
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log(e)
        throw new Error("Transaction failed: ");
    }
}

export { deleteSetListAndSongs, fetchSetListsForBand, fetchSongsForBand, fetchSongsToSetListsForBand, getUser };

