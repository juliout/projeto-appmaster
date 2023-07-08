import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'
import { collection, query, where, getDocs  } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({id: 1552});
  const [loading, setLoading] = useState(true);
  const [likeds, setLikeds] = useState(true)

  useEffect(()=> {
    if(currentUser) {
     
      async function getLiked() {
        const q = query(collection(db, `${currentUser.id}`), where("liked", "==", true));

        const querySnapshot = await getDocs(q);

        const dados = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          dados.push({
            game_id: doc.id,
            liked: doc.data().liked
          })
        });
        console.log(dados)
      }
      getLiked()
    }
  }, [currentUser])

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     const session = JSON.parse(localStorage.getItem('session'));
//     if (session && session.user) {
//       setCurrentUser(session.user);
//       auth.signInWithCustomToken(session.token);
//     }

//     // Limpe o observador ao desmontar o componente
//     return () => unsubscribe();
//   }, []);

  const login = async (email, password) => {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        // Obter o token de autenticação do Firebase
        const token = await user.getIdToken();
  
        // Salvar a sessão no localStorage
        const session = {
          user: {
            uid: user.uid,
            email: user.email,
            // Adicione outros dados do usuário que desejar
          },
          token: token,
        };
        localStorage.setItem('session', JSON.stringify(session));

  };

  const register = async (email, password) => {
      return await auth.createUserWithEmailAndPassword(email, password);

  };

//   const logout = async () => {
//     try {
//       await auth.signOut();
//     } catch (error) {
//       console.log(error);
//       // Trate o erro de logout
//     }
//   };



  return (
    <AuthContext.Provider value={{
      currentUser, 
      loading,
      register,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};
