import { auth , provider, storage} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER } from "./actionType";
import { addDoc, collection , getFirestore} from "firebase/firestore";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export function signInApi() {
    return ((dispatch) => {
        signInWithPopup(auth, provider)
        .then( (payload) => {
            dispatch(setUser(payload.user))
        }).catch ((err) => {
            alert(err.message);
        })
    })
}

export function getUserAuth(){
    return (dispatch) => {
        auth.onAuthStateChanged( async (user) => {
            if(user) {
                dispatch (setUser(user));
            }
        })
    }
}

export function signOutApi() {
    return (dispatch) => {
        auth.signOut().then ( () => {
            dispatch(setUser(null));
            alert('Signed out successfully!');
        }).catch ( (err) => {
            alert(err.message);
        })
    }
}

export function postArticleApi(payload) {
    return (dispatch) => {

        if(payload.image != ''){
            const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
            upload.on('state_changed', 
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log(`progress: ${progress}%`);

                if(snapshot.state ==='RUNNING'){
                    console.log(`progress: ${progress}%`);
                }
            }, err => {
                console.log(`error:  ${err.code} ` )
            }, async () => {
                const downloadURL = await upload.snapshot.ref.getDownoadURL();

                const docRef = await addDoc(collection(getFirestore(), "articles"), {
                    actor: {
                        
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
                  });
            })

        }
    }
}