// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// تنفيذ الكود بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
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
  const auth = getAuth(app);
  const database = getDatabase(app);
  const provider = new GoogleAuthProvider();
  
  // الحصول على عناصر HTML
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const googleBtn = document.getElementById("googleBtn");
  
  // تسجيل مستخدم جديد وحفظ بياناته في قاعدة البيانات
  registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // حفظ بيانات المستخدم في قاعدة البيانات
        set(ref(database, 'users/' + user.uid), {
          email: user.email,
          uid: user.uid,
          joinedAt: new Date().toISOString()
        });
        
        alert("تم إنشاء الحساب وتخزين البيانات بنجاح 🎉");
        console.log(user);
      })
      .catch((error) => {
        alert("خطأ: " + error.message);
      });
  });
  
  // تسجيل الدخول بالبريد وكلمة المرور
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("تم تسجيل الدخول بنجاح ✅");
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert("خطأ: " + error.message);
      });
  });
  
  // تسجيل الدخول باستخدام Google وحفظ بيانات المستخدم
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        
        // حفظ بيانات المستخدم إذا كان جديدًا
        set(ref(database, 'users/' + user.uid), {
          email: user.email,
          uid: user.uid,
          joinedAt: new Date().toISOString(),
          provider: "Google"
        });
        
        alert("تم تسجيل الدخول بحساب Google وحفظ البيانات 🎉");
        console.log(user);
      })
      .catch((error) => {
        alert("خطأ: " + error.message);
      });
  });
});
registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // حفظ بيانات المستخدم
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                uid: user.uid,
                joinedAt: new Date().toISOString()
            });

            alert("تم إنشاء الحساب بنجاح 🎉");
            console.log(user);

            // توجيه المستخدم بعد التسجيل
            window.location.href = "dashboard.html"; // استبدلها بصفحتك الفعلية
        })
        .catch((error) => {
            alert("خطأ: " + error.message);
        });
});