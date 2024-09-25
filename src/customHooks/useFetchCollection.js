import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig/firebaseConfig";
import { useEffect, useState } from "react";

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true)
        try {
            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy("createdAt"));
            onSnapshot(q, (snapshot) => {
                const allData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setData(allData)
                setIsLoading(false)
            });
        } catch(error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    };
        useEffect(() => {
            getCollection()
        }, [])
    
    return {data, isLoading}
};

export default useFetchCollection;