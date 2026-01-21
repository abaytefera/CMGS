import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Mail, Lock, Leaf, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from '../../Redux/auth'; 

import LoginBg from '../../Component/CitizenComponent/LoginPageComponent/LoginBg';
import AuthInput from '../../Component/CitizenComponent/LoginPageComponent/AuthInput';
import Footer from '../../Component/CitizenComponent/Footer';
import Header from '../../Component/CitizenComponent/Header';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing auth state and language state
  const { isloading,user, error } = useSelector((state) => state.auth);
  const { Language } = useSelector((state) => state.webState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Dispatching the createAsyncThunk
    const resultAction = await dispatch(LoginUser({ email, password }));

    // Checking if the thunk was successful
    if (LoginUser.fulfilled.match(resultAction)) {
      localStorage.setItem('authToken', resultAction.payload.token);
      if(user.role==="officer"){

   

      navigate('/Dashboard1');
         }else if(user.role==="supervisor"){
     navigate('/Dashboard2');

         } else if(user.role==="admin"){
     navigate('/Dashboard3');

         }
         else if(user.role==="manager"){
     navigate('/Dashboard4a');

         }
    }
  };
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const t = {
    title: Language === "AMH" ? "ግባ" : "Login Page",
    userLabel: Language === "AMH" ? "ኢሜይል ወይም መለያ ስም" : "Email / Username",
    passLabel: Language === "AMH" ? "የይለፍ ቃል" : "Password",
    loginBtn: Language === "AMH" ? "ግባ" : "Login",
    forgotPass: Language === "AMH" ? "የይለፍ ቃል ረስተዋል?" : "Forgot Password?"
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-20 flex items-center justify-center px-6 relative">
        <LoginBg />

    
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center">
          
          <div className="bg-emerald-600 p-4 rounded-full text-white shadow-lg mb-4">
            <Leaf size={32} />
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter">
            {t.title}
          </h1>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full">
            <AuthInput 
              icon={Mail} 
              type="text" 
              placeholder={t.userLabel} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <div className="mt-4">
              <AuthInput 
                icon={Lock} 
                type="password" 
                placeholder={t.passLabel} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

       
            {error && (
              <p className="mt-4 text-red-500 text-[10px] font-black uppercase text-center tracking-widest">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isloading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-6 shadow-xl shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isloading ? <Loader2 className="animate-spin" size={20} /> : t.loginBtn}
            </button>
          </form>

          <button className="mt-6 text-slate-400 text-[10px] font-bold hover:text-emerald-600 transition-colors uppercase tracking-widest">
            {t.forgotPass}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;