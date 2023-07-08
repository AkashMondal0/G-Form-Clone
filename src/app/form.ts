import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/FirebaseConfig";
import { MainState } from "@/interfaces/interfaces";

const CreateUser = async (data: MainState, uid: string) => {
    try {
        await setDoc(doc(db, 'users', uid), data);
        return true;
    } catch (e) {
        // console.error("Error adding document: ", e);
        return false;
    }
}

const getDatabase = async (uid: string) => { 
    
}

export { CreateUser }