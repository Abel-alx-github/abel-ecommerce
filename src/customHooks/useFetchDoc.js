import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseConfig'


import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useFetchDoc = (collectionName, docID) => {
    const [document, setDocument] = useState(null);

    const getDocument = async () => {
        const docRef = doc(db, collectionName, docID);
        const docSnapshot = await getDoc(docRef)

        if(docSnapshot.exists()) {
            const docObj = {
                id : docID,
                ...docSnapshot.data()
            }

            setDocument(docObj)
        } else {
            toast.error('Document is not found.')
        }
    }

    useEffect(() => {
        getDocument()
    }, [])

    return { document }
}

export default useFetchDoc