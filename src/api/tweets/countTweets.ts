import { collection, getCountFromServer, query, where } from "firebase/firestore";

import { db } from "@/firebase";

async function countTweets(userId: string) {
    const tweetsRef = collection(db, 'tweets');
    const tweetsQuery = query(tweetsRef, where('authorId', '==', userId));

    const countSnapshot = await getCountFromServer(tweetsQuery);
    return countSnapshot.data().count;
}

export default countTweets