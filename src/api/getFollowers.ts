import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const getFollowers = async (userId: string): Promise<Array<string>> => {
    const followingsRef = collection(db, 'followings');
    const q = query(followingsRef, where('followingId', '==', userId));
    const response = await getDocs(q);
    return response.docs.map((doc) => doc.data().followerId);
}

export default getFollowers;