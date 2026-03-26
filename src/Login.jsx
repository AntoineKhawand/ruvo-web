import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Checkbox, Divider } from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate an API call for login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); // Redirect to home page after login
    }, 1500);
  };

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh] flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#dfff00]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Card className="bg-[#0a0a0a] border border-[#222] rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            
            <div className="text-center mb-10">
              <img src="/Ruvo Logo Original.png" alt="Ruvo Logo" className="h-16 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(223,255,0,0.3)]" />
              <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Log in to continue your journey.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input isRequired type="email" label="Email Address" placeholder="runner@example.com" value={email} onValueChange={setEmail} classNames={{ inputWrapper: "bg-[#161616] border border-[#333] hover:border-[#555] group-data-[focus=true]:bg-[#222] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
              <Input isRequired type="password" label="Password" placeholder="••••••••" value={password} onValueChange={setPassword} classNames={{ inputWrapper: "bg-[#161616] border border-[#333] hover:border-[#555] group-data-[focus=true]:bg-[#222] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
              
              <div className="flex justify-between items-center text-xs">
                <Checkbox color="success" size="sm" classNames={{ label: "text-gray-400" }}>Remember me</Checkbox>
                <RouterLink to="/forgot-password" className="text-white hover:underline font-bold">Forgot password?</RouterLink>
              </div>

              <Button type="submit" isLoading={isLoading} radius="full" size="lg" className="w-full bg-[#dfff00] text-black font-bold mt-4 shadow-[0_0_20px_rgba(223,255,0,0.2)] hover:scale-[1.02] transition-transform">
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-8">
              Don't have an account? <RouterLink to="/signup" className="font-bold text-white hover:underline">Sign up now</RouterLink>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}