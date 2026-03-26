import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Checkbox, Divider } from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (!agreed) newErrors.agreed = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate an API call for account creation
    setTimeout(() => {
      setIsLoading(false);
      navigate('/challenges'); // Redirect to challenges page
    }, 1500);
  };

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh] flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#dfff00]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Card className="bg-[#0a0a0a] border border-[#222] rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            
            <div className="text-center mb-10">
              <img src="/Ruvo Logo Original.png" alt="Ruvo Logo" className="h-16 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(223,255,0,0.3)]" />
              <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm">Join the community and start your first challenge.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input 
                isRequired 
                label="Full Name" 
                placeholder="e.g. Sarah Jenkins" 
                value={name}
                onValueChange={setName}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                classNames={{ inputWrapper: "bg-[#161616] border border-[#333] hover:border-[#555] group-data-[focus=true]:bg-[#222] group-data-[focus=true]:border-[#dfff00] transition-colors" }} 
              />
              <Input 
                isRequired 
                type="email" 
                label="Email Address" 
                placeholder="runner@example.com" 
                value={email}
                onValueChange={setEmail}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                classNames={{ inputWrapper: "bg-[#161616] border border-[#333] hover:border-[#555] group-data-[focus=true]:bg-[#222] group-data-[focus=true]:border-[#dfff00] transition-colors" }} 
              />
              <Input 
                isRequired 
                type="password" 
                label="Password" 
                placeholder="8+ characters" 
                value={password}
                onValueChange={setPassword}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                classNames={{ inputWrapper: "bg-[#161616] border border-[#333] hover:border-[#555] group-data-[focus=true]:bg-[#222] group-data-[focus=true]:border-[#dfff00] transition-colors" }} 
              />
              
              <div>
                <Checkbox 
                  color="success" 
                  size="sm" 
                  isSelected={agreed}
                  onValueChange={setAgreed}
                  isInvalid={!!errors.agreed}
                  classNames={{ label: "text-gray-400 text-xs" }}
                >
                  I agree to the <RouterLink to="/terms" className="text-white hover:underline">Terms of Service</RouterLink> and <RouterLink to="/privacy" className="text-white hover:underline">Privacy Policy</RouterLink>.
                </Checkbox>
                {errors.agreed && <p className="text-tiny text-danger mt-1">{errors.agreed}</p>}
              </div>

              <Button type="submit" isLoading={isLoading} radius="full" size="lg" className="w-full bg-[#dfff00] text-black font-bold mt-4 shadow-[0_0_20px_rgba(223,255,0,0.2)] hover:scale-[1.02] transition-transform">
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-8">
              Already have an account? <RouterLink to="/login" className="font-bold text-white hover:underline">Log In</RouterLink>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}