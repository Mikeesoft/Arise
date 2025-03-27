// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBotB-z_VaP3qTEeW4_w18CTXtbtWJMx4k",
  authDomain: "muslim-19df3.firebaseapp.com",
  projectId: "muslim-19df3",
  storageBucket: "muslim-19df3.appspot.com",
  messagingSenderId: "368018689047",
  appId: "1:368018689047:web:c54b58f62175db289e2052",
  measurementId: "G-J0C7S7XRB8",
  databaseURL: "https://muslim-19df3-default-rtdb.firebaseio.com/"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// جلب بيانات المستخدم عند تسجيل الدخول
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        document.getElementById("userEmail").innerText = userData.email;
        document.getElementById("userJoined").innerText = new Date(userData.joinedAt).toLocaleString();
        document.getElementById("userBalance").innerText = userData.balance + " جنيه";
      } else {
        console.log("لم يتم العثور على بيانات المستخدم!");
      }
    }).catch((error) => {
      console.error("خطأ في جلب البيانات:", error);
    });
  } else {
    window.location.href = "index.html";
  }
});

// زر تسجيل الخروج
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("تم تسجيل الخروج ✅");
    window.location.href = "index.html";
  }).catch((error) => {
    alert("خطأ: " + error.message);
  });
});

// زر إضافة الرصيد (للتجربة)
document.getElementById("addBalanceBtn").addEventListener("click", () => {
  const amount = prompt("أدخل المبلغ الذي تريد إضافته:");
  if (amount && !isNaN(amount)) {
    const user = auth.currentUser;
    const userRef = ref(database, 'users/' + user.uid);
    
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        let currentBalance = snapshot.val().balance || 0;
        let newBalance = currentBalance + parseFloat(amount);
        update(userRef, { balance: newBalance }).then(() => {
          document.getElementById("userBalance").innerText = newBalance + " جنيه";
          alert("تمت إضافة الرصيد بنجاح ✅");
        });
      }
    });
  } else {
    alert("الرجاء إدخال مبلغ صحيح!");
  }
});