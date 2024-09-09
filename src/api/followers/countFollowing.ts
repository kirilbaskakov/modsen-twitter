import { collection, getCountFromServer, query, where } from "firebase/firestore";

import { db } from "@/firebase";

async function countFollowing(userId: string) {
    const followingsRef = collection(db, 'followings');
    const followersQuery = query(followingsRef, where('followerId', '==', userId));

    const countSnapshot = await getCountFromServer(followersQuery);
    return countSnapshot.data().count;
}

export default countFollowing;