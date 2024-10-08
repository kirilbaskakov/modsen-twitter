import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase";

const getFollowings = async (userId: string): Promise<Array<string>> => {
    const followingsRef = collection(db, 'followings');
    const q = query(followingsRef, where('followerId', '==', userId));
    const response = await getDocs(q);
    return response.docs.map((doc) => doc.data().followingId);
}

export default getFollowings;