import { db } from "@/firebase";
import { collection, getCountFromServer, query, where } from "firebase/firestore";

async function countFollowers(userId: string) {
    const followingsRef = collection(db, 'followings');
    const followersQuery = query(followingsRef, where('followingId', '==', userId));

    const countSnapshot = await getCountFromServer(followersQuery);
    return countSnapshot.data().count;
}

export default countFollowers