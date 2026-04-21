import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0d1117] min-h-screen flex items-center justify-center text-[#e8edf5] font-['Inter']">
      <div className="bg-[#161c26] p-8 border border-[#1e90ff]/20 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 font-['Rajdhani']">RECUPERAR ACCESO</h2>
        <p className="text-[#7a8a9e] mb-6 text-sm leading-relaxed">
          Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña.
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#7a8a9e]">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              className="w-full p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-[#1e90ff] text-white" 
            />
          </div>
          
          <button className="bg-[#1e90ff] w-full py-3 font-bold rounded-lg hover:bg-[#1c81e6] transition-all">
            ENVIAR INSTRUCCIONES
          </button>
          
          <button 
            onClick={() => navigate('/login')} 
            className="w-full text-center mt-4 text-xs text-[#7a8a9e] hover:text-white transition-colors"
          >
            ← Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}