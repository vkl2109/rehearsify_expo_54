import { SetList, Song, SongToSetList, User } from "@/constants/types";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, runTransaction, Timestamp, updateDoc, where } from "firebase/firestore";


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

async function refetchSetList(setListId: string): Promise<SetList | null> {
    try {
        const setListRef = doc(db, "setlists", setListId);
        const setListSnap = await getDoc(setListRef);
        if (setListSnap.exists()) {
            const data = setListSnap.data();
            const serializedSetList: SetList = {
                id: setListSnap.id,
                name: data?.name ?? "",
                bandId: data?.bandId ?? "",
                createdAt: data?.createdAt ?? Timestamp.now(),
                createdBy: data?.createdBy ?? "",
            }
            return serializedSetList;
        } else {
            console.log("No such set list!");
            return null;
        }
    } catch (e) {
        console.warn("Failed to refetch set list", e);
        throw e
    }
}

async function updateSetListDetails(setListId: string, newName: string): Promise<void> {
    try {
        const setListRef = doc(db, "setlists", setListId);
        await updateDoc(setListRef, {
            name: newName
        });
        console.log("Set list details updated successfully!");
    } catch (e) {
        console.log("Failed to update set list details", e);
        throw e;
    }
}

async function addSongsToCurrentSetlist(
  newSongIds: string[],
  currentSetlistId: string,
  currentBandId: string
) {
  if (!newSongIds.length) return;

  try {
    await runTransaction(db, async (transaction) => {
      const songsToSetListsRef = collection(db, "songsToSetLists");

      // 1. Fetch current joins for this setlist
      const q = query(songsToSetListsRef, where("setlistId", "==", currentSetlistId));
      const existingSnap = await getDocs(q);

      // 2. Compute the next order
      let maxOrder = 0;
      existingSnap.forEach((docSnap) => {
        const data = docSnap.data() as SongToSetList;
        if (data.order && data.order > maxOrder) maxOrder = data.order;
      });

      // 3. Add new songs with sequential order
      newSongIds.forEach((songId, idx) => {
        const newId = `${songId}_${currentSetlistId}`;
        const newRef = doc(db, "songsToSetLists", newId);
        const newJoin: SongToSetList = {
          bandId: currentBandId,
          setlistId: currentSetlistId,
          songId,
          order: maxOrder + idx + 1,
        };
        transaction.set(newRef, newJoin);
      });
    });
  } catch (e) {
    console.error("Failed to add songs to set list:", e);
    throw e;
  }
}

async function fetchSongsToSetLists(setListId: string): Promise<SongToSetList[]> {
    try {
        const songsToSetListsQuery = query(
            collection(db, "songsToSetLists"),
            where("setlistId", "==", setListId)
        );
        const songsToSetListsSnaps = await getDocs(songsToSetListsQuery);
        const songsToSetLists: SongToSetList[] = []
        songsToSetListsSnaps.forEach(doc => {
          const data = doc.data()
          const serializedSongToSetList: SongToSetList = {
              songId: data?.songId ?? "",
              setlistId: data?.setlistId ?? "",
              order: data?.order ?? 0,
              bandId: data?.bandId ?? "",
          }
          songsToSetLists.push(serializedSongToSetList)
        })
        return songsToSetLists;
    } catch (e) {
        console.warn("Failed to fetch songs to setlists", e);
        return [];
    }
}

async function removeSongFromSetList(
    songsToSetListJoins: SongToSetList[],
    songToRemove: SongToSetList
) {
    try {
        const songId = songToRemove?.songId;
        const setListId = songToRemove?.setlistId;

        if (!songId || !setListId) {
            throw new Error("Invalid song to remove!");
        }

        const removeId = `${songId}_${setListId}`;

        await runTransaction(db, async (transaction) => {
            // 1. READ all required documents up front
            const refsToRead = [];

            // join to delete
            const removeRef = doc(db, "songsToSetLists", removeId);
            refsToRead.push(removeRef);

            // all joins in this setlist
            const joinRefs = songsToSetListJoins.map((j) =>
                doc(db, "songsToSetLists", `${j.songId}_${j.setlistId}`)
            );
            refsToRead.push(...joinRefs);

            // Read all in parallel (inside transaction)
            const snaps = await Promise.all(
                refsToRead.map((r) => transaction.get(r))
            );

            // 2. Ensure the join-to-delete exists
            if (!snaps[0].exists()) {
                throw new Error(`Join does not exist: ${removeId}`);
            }

            // 3. Reconstruct the actual existing joins
            const existingJoins: SongToSetList[] = [];

            for (let i = 1; i < snaps.length; i++) {
                const snap = snaps[i];
                if (snap.exists()) {
                    existingJoins.push(snap.data() as SongToSetList);
                }
            }

            // 4. Filter out the removed join
            const remaining = existingJoins.filter((join) => {
                const id = `${join.songId}_${join.setlistId}`;
                return id !== removeId;
            });

            // 5. Sort remaining by order
            const ordered = remaining.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            // --- NOW PERFORM WRITES ---

            // 6. Delete the join
            transaction.delete(removeRef);

            // 7. Rewrite order for remaining
            ordered.forEach((j, index) => {
                const id = `${j.songId}_${j.setlistId}`;
                const ref = doc(db, "songsToSetLists", id);

                transaction.update(ref, {
                    order: index + 1,
                });
            });
        });
    } catch (e) {
        throw new Error("removeSongFromSetList failed: " + e);
    }
}

export {
    addSongsToCurrentSetlist, deleteSetListAndSongs,
    fetchSetListsForBand,
    fetchSongsForBand, fetchSongsToSetLists, fetchSongsToSetListsForBand,
    getUser,
    refetchSetList, removeSongFromSetList, updateSetListDetails
};

