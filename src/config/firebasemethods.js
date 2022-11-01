import app from "./firebaseconfig";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

let signUpUser = (obj) => {
  let { email, password, userName, contact } = obj;

  // === this promise will return on Signup page. ===
  return new Promise((resolve, reject) => {
    // === this "then" will give the status of Authentication. ===
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // user successfully registerd in authentication
        const user = userCredential.user;
        const reference = ref(database, `users/${user.uid}`);
        obj.id = user.uid;
        set(reference, obj)
          // === this "then" will give the status of database function
          .then(() => {
            // this "resolve" is our custom message which will show in signup page "then"

            // this "resolve" is our custom message which will show in signup page "then"
            resolve("User Created Successfully and send to database");
          })
          .catch((errr) => {
            reject(errr);
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

let loginUser = (obj) => {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          let status = e.exists();
          console.log(status);
          if (status) {
            resolve(e.val());
          } else {
            reject("User Not Found");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
      });
  });
};

let checkUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        reject("user nhi hai");
      }
    });
  });
};

let sendData = (obj, node, id) => {
  let postListRef;
  return new Promise((resolve, reject) => {
    if (id) {
      postListRef = ref(database, `${node}/${id}`);
    } else {
      let addRef = ref(database, node);
      obj.id = push(addRef).key;
      postListRef = ref(database, `${node}/${obj.id}`);
    }
    set(postListRef, obj)
      .then((res) => {
        resolve(`Data send to this node ${node}/${obj.id} successfully.`);
      })
      .catch((err) => {
        reject("Failed to end data");
      });
  });
};

let getData = (node, userId) => {
  let dbReference = ref(database, `${node}/${userId ? userId : ""}`);
  return new Promise((resolve, reject) => {
    onValue(
      dbReference,
      (data) => {
        if (data.exists()) {
          let userData = data.val();
          if (userId) {
            resolve(userData);
          } else {
            let dataArr = Object.values(userData);
            resolve(dataArr);
          }
        } else {
          reject("Data not found");
        }
      },
      {
        onlyOnce: false,
      }
    );
  });
};

let deleteData = (node, listId) => {
  if (!listId) {
    let dbReference = ref(database, `${node}`);
    return new Promise((resolve, reject) => {
      set(dbReference, null)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } else {
    let dbReference = ref(database, `${node}/${listId}`);
    return new Promise((resolve, reject) => {
      set(dbReference, null)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export { signUpUser, loginUser, checkUser, sendData, getData, deleteData };
