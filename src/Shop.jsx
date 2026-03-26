import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Chip, Input } from "@heroui/react";
import hoodieImg from './RUVO x Healing Makers Hoodie.png';
import teeImg from './RUVO Elite Tech Tee.png';
import emailjs from '@emailjs/browser';

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'details', 'payment', 'success'
  const [paymentMethod, setPaymentMethod] = useState('pod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [selections, setSelections] = useState({});
  const [orderNumber, setOrderNumber] = useState('');

  const updateSelection = (idx, type, value) => {
    setSelections(prev => ({
      ...prev,
      [idx]: { ...prev[idx], [type]: value }
    }));
  };

  const handleAddToCart = (product, idx = null) => {
    const selectedSize = idx !== null ? (selections[idx]?.size || (product.sizes ? product.sizes[0] : null)) : (product.sizes ? product.sizes[0] : null);
    const selectedColor = idx !== null ? (selections[idx]?.color || (product.colors ? product.colors[0] : null)) : (product.colors ? product.colors[0] : null);
    
    setCart([...cart, { ...product, size: selectedSize, color: selectedColor }]);
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((total, item) => total + parseInt(item.price.replace('$', '')), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderDetails = cart.map(item => {
      let details = `- ${item.name} (${item.price})`;
      const extras = [];
      if (item.size) extras.push(`Size: ${item.size}`);
      if (item.color) extras.push(`Color: ${item.color}`);
      if (extras.length > 0) details += ` [${extras.join(', ')}]`;
      return details;
    }).join('\n');
    const paymentMethodText = paymentMethod === 'pod' ? 'Cash on Delivery' : 'Internal Delivery';
    
    const generatedOrderNumber = `RV-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNumber);

    const fullMessage = `Order Number: ${generatedOrderNumber}

Shipping Details:
Address: ${formData.address}
City: ${formData.city}
ZIP: ${formData.zip}

Payment Method: ${paymentMethodText}

Order Summary:
${orderDetails}

Total: $${cartTotal}`;

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      category: 'New Merchandise Order',
      message: fullMessage,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
        setIsProcessing(false);
        setCheckoutStep('success');
        setCart([]);
        setFormData({ name: '', email: '', address: '', city: '', zip: '' });
    }).catch((error) => {
        console.error('EmailJS Error:', error);
        setIsProcessing(false);
        alert("Failed to place order. Error: " + (error.text || error.message || "Please check console for details."));
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const products = [
    { name: "Aerodynamic Running Cap", price: "$15", img: "/Aerodynamic Running Cap.png", badge: "Best Seller", imgClass: "mix-blend-normal", colors: ["Black", "White"] },
    { name: "RUVO Elite Tech Tee", price: "$25", img: teeImg, badge: "New", imgClass: "saturate-[0.8]", sizes: ["S", "M", "L", "XL"], colors: ["Black", "White"] },
    { name: "RUVO x Healing Makers Hoodie", price: "$45", img: hoodieImg, badge: "Collab", sizes: ["S", "M", "L", "XL"], colors: ["Black"] }
  ];

  return (
    <div className="relative px-4 md:px-6 pb-16 md:pb-24 pt-8 md:pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Slide-out Cart & Checkout Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#0a0a0a] border-l border-[#333] h-full relative z-10 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b border-[#222] flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-20">
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  {checkoutStep === 'cart' ? 'Your Cart' : checkoutStep === 'details' ? 'Shipping Details' : checkoutStep === 'payment' ? 'Payment' : 'Order Complete'}
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {checkoutStep === 'cart' && (
                  <div className="flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <p>Your cart is currently empty.</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 flex-grow">
                          {cart.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-[#111] p-3 rounded-2xl border border-[#222]">
                              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-[#333]" />
                              <div className="flex-grow">
                                <h4 className="text-white font-bold text-sm leading-tight mb-1">{item.name}</h4>
                                <p className="text-[#dfff00] font-mono text-sm mb-1">{item.price}</p>
                                <div className="flex gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                  {item.size && <span>Size: {item.size}</span>}
                                  {item.size && item.color && <span>|</span>}
                                  {item.color && <span>Color: {item.color}</span>}
                                </div>
                              </div>
                              <button type="button" onClick={() => handleRemoveFromCart(i)} className="p-2 text-gray-500 hover:text-red-500 transition-colors" title="Remove Item">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-[#222]">
                          <div className="flex justify-between items-center mb-4 md:mb-6">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                            <span className="text-2xl font-black text-white">${cartTotal}</span>
                          </div>
                          <Button onPress={() => setCheckoutStep('details')} radius="full" size="lg" className="w-full bg-[#dfff00] text-black font-bold text-base shadow-[0_0_20px_rgba(223,255,0,0.15)]">
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {checkoutStep === 'details' && (
                  <form className="flex flex-col h-full" onSubmit={(e) => { e.preventDefault(); setCheckoutStep('payment'); }}>
                    <div className="space-y-5 flex-grow">
                      <Input isRequired label="Full Name" value={formData.name} onValueChange={(val) => setFormData({...formData, name: val})} placeholder="e.g. Sarah Jenkins" classNames={{ inputWrapper: "bg-[#161616] border-[#333] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
                      <Input isRequired type="email" label="Email" value={formData.email} onValueChange={(val) => setFormData({...formData, email: val})} placeholder="runner@example.com" classNames={{ inputWrapper: "bg-[#161616] border-[#333] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
                      <Input isRequired label="Shipping Address" value={formData.address} onValueChange={(val) => setFormData({...formData, address: val})} placeholder="123 Trail Route St." classNames={{ inputWrapper: "bg-[#161616] border-[#333] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input isRequired label="City" value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})} placeholder="Beirut" classNames={{ inputWrapper: "bg-[#161616] border-[#333] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
                        <Input isRequired label="ZIP Code" value={formData.zip} onValueChange={(val) => setFormData({...formData, zip: val})} placeholder="0000" classNames={{ inputWrapper: "bg-[#161616] border-[#333] group-data-[focus=true]:border-[#dfff00] transition-colors" }} />
                      </div>
                    </div>
                    <div className="mt-8 flex gap-3">
                      <Button onPress={() => setCheckoutStep('cart')} variant="flat" radius="full" size="lg" className="bg-[#222] text-white font-bold px-6">Back</Button>
                      <Button type="submit" radius="full" size="lg" className="flex-grow bg-[#dfff00] text-black font-bold text-base">Continue to Payment</Button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'payment' && (
                  <form className="flex flex-col h-full" onSubmit={handleCheckoutSubmit}>
                    <div className="space-y-4 mb-8 flex-grow">

                      <div 
                        onClick={() => setPaymentMethod('pod')}
                        className={`p-5 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'pod' ? 'border-[#dfff00] bg-[#dfff00]/5' : 'border-[#333] hover:border-[#555] bg-[#111]'}`}
                      >
                        <div className="flex items-center gap-3 font-bold text-white mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pod' ? 'border-[#dfff00]' : 'border-gray-500'}`}>
                            {paymentMethod === 'pod' && <div className="w-2 h-2 bg-[#dfff00] rounded-full"></div>}
                          </div>
                          Cash on Delivery
                        </div>
                        {paymentMethod === 'pod' && (
                          <p className="text-sm text-gray-400 pl-7 mt-2 leading-relaxed">You will pay in cash or via POS terminal when the courier arrives at your location.</p>
                        )}
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('internal')}
                        className={`p-5 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'internal' ? 'border-[#dfff00] bg-[#dfff00]/5' : 'border-[#333] hover:border-[#555] bg-[#111]'}`}
                      >
                        <div className="flex items-center gap-3 font-bold text-white mb-1">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'internal' ? 'border-[#dfff00]' : 'border-gray-500'}`}>
                            {paymentMethod === 'internal' && <div className="w-2 h-2 bg-[#dfff00] rounded-full"></div>}
                          </div>
                          Internal Delivery Order
                        </div>
                        {paymentMethod === 'internal' && (
                          <p className="text-sm text-gray-400 pl-7 mt-2 leading-relaxed">Our internal delivery team will contact you to arrange drop-off and payment collection.</p>
                        )}
                      </div>

                    </div>
                    
                    <div className="mt-auto border-t border-[#222] pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total to Pay</span>
                        <span className="text-2xl font-black text-white">${cartTotal}</span>
                      </div>
                      <div className="flex gap-3">
                        <Button onPress={() => setCheckoutStep('details')} variant="flat" radius="full" size="lg" className="bg-[#222] text-white font-bold px-6">Back</Button>
                        <Button type="submit" isLoading={isProcessing} radius="full" size="lg" className="flex-grow bg-[#dfff00] text-black font-bold text-base shadow-[0_0_20px_rgba(223,255,0,0.15)]">
                          {isProcessing ? 'Processing...' : 'Place Order'}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-[#dfff00]/20 text-[#dfff00] rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Order Placed!</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">Thank you for gearing up with RUVO. Your order <span className="text-white font-bold">#{orderNumber}</span> is being processed.</p>
                    <Button onPress={() => setIsCartOpen(false)} radius="full" size="lg" className="bg-[#222] text-white hover:bg-[#333] font-bold w-full">
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-8">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4">
            Official Merch
          </Chip>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Gear <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Up.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Premium running apparel designed for performance. Represent the RUVO community on the streets and trails.
          </p>
        </motion.div>

        {/* Healing Makers Collaboration Banner */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#333] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 mb-16 md:mb-24 relative overflow-hidden group flex flex-col md:flex-row items-center gap-8 md:gap-10 shadow-2xl text-center md:text-left">
          <div className="absolute inset-0 bg-[#dfff00]/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors duration-700"></div>
          <div className="md:w-1/2 relative z-10">
             <Chip className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-4 border border-[#dfff00]/20">Limited Edition</Chip>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">RUVO <span className="text-gray-500">x</span> Healing Makers</h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
               We've partnered with Healing Makers to create a capsule collection designed for recovery and mindfulness. Experience ultra-premium fabrics crafted specifically for your rest days.
             </p>
             <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center md:justify-start">
               <Button onPress={() => {
                 const grid = document.getElementById('merch-grid');
                 if (grid) {
                   window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
                 }
               }} radius="full" size="lg" className="bg-[#dfff00] text-black font-bold shadow-[0_0_20px_rgba(223,255,0,0.15)] hover:scale-105 transition-transform w-full sm:w-auto">
                 Shop the Collab
               </Button>
               <Button as="a" href="https://www.instagram.com/healingmakerslb/" target="_blank" rel="noopener noreferrer" variant="bordered" radius="full" size="lg" className="text-white border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                healingmakerslb
              </Button>
            </div>
         </div>
         <div className="md:w-1/2 relative z-10 w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
           <img src={hoodieImg} alt="Healing Makers Collab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
         </div>
       </motion.div>

       <motion.div id="merch-grid" variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
         {products.map((product, idx) => (
           <motion.div key={idx} variants={fadeInUp} className="group">
             <Card className="bg-[#111] border border-[#222] rounded-[2rem] overflow-hidden hover:border-[#dfff00]/40 transition-colors h-full flex flex-col">
               <div className="relative h-64 w-full bg-[#1a1a1a] overflow-hidden">
                <img src={product.img} alt={product.name} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${product.imgClass || 'mix-blend-luminosity'}`} />
                 {product.badge && (
                   <Chip size="sm" className="absolute top-4 left-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] z-10 border-none shadow-md">
                     {product.badge}
                   </Chip>
                 )}
               </div>
               <div className="p-6 flex flex-col flex-grow">
                 <h3 className="text-lg font-bold text-white mb-2 leading-tight">{product.name}</h3>
                 <p className="text-gray-400 font-mono mb-4">{product.price}</p>
                 
                 <div className="flex gap-2 mb-6 mt-auto">
                   {product.sizes && (
                     <select 
                       className="bg-[#222] text-xs text-white border border-[#333] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#dfff00] w-full"
                       value={selections[idx]?.size || product.sizes[0]}
                       onChange={(e) => updateSelection(idx, 'size', e.target.value)}
                     >
                       {product.sizes.map(s => <option key={s} value={s}>Size: {s}</option>)}
                     </select>
                   )}
                   {product.colors && (
                     <select 
                       className="bg-[#222] text-xs text-white border border-[#333] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#dfff00] w-full"
                       value={selections[idx]?.color || product.colors[0]}
                       onChange={(e) => updateSelection(idx, 'color', e.target.value)}
                     >
                       {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                   )}
                 </div>

                 <Button onPress={() => handleAddToCart(product, idx)} radius="full" className="w-full bg-[#222] text-white font-bold group-hover:bg-[#dfff00] group-hover:text-black transition-colors">
                   Add to Cart
                 </Button>
               </div>
             </Card>
           </motion.div>
         ))}
       </motion.div>

     </div>
   </div>
 );
}
