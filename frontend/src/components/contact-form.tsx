import { useState } from "react";
import type { FormDataState } from "../types/main.types";
import { ArrowRight, Briefcase, Check, Monitor, Send, Smartphone, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrutalButton } from "./button";
import { SelectChip } from "./select";
import { BrutalInput } from "./input";

export const EnhancedContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    type: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = [
    { id: 'web', label: 'Web App', icon: Monitor },
    { id: 'mobile', label: 'Mobile App', icon: Smartphone },
    { id: 'corp', label: 'Sistema Corp', icon: Briefcase },
    { id: 'other', label: 'Outro', icon: Zap },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-4 border-black p-12 text-center shadow-[12px_12px_0px_0px_#CCFF00]"
      >
        <div className="w-20 h-20 bg-[#CCFF00] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-black" />
        </div>
        <h3 className="text-3xl font-black uppercase mb-4">Mensagem Recebida!</h3>
        <p className="text-gray-600 mb-8 font-medium">
          A equipa Softwise já recebeu o teu briefing. <br/>Vamos analisar e entrar em contacto em até 24h.
        </p>
        <BrutalButton onClick={() => setIsSuccess(false)} variant="outline">Nova Mensagem</BrutalButton>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-6 md:p-12 shadow-[16px_16px_0px_0px_#006C93] relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
        <motion.div 
          className="h-full bg-[#FF4D00]"
          animate={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      <div className="mt-6 mb-8">
        <span className="font-mono text-xs font-bold text-gray-400 uppercase">Passo 0{step} / 02</span>
        <h3 className="text-3xl font-black uppercase mt-2">
          {step === 1 ? 'Que tipo de projecto?' : 'Conta-nos os detalhes'}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <SelectChip 
                  key={type.id}
                  label={type.label}
                  icon={type.icon}
                  selected={formData.type === type.id}
                  onClick={() => setFormData({...formData, type: type.id})}
                />
              ))}
            </div>

            <div className="space-y-4">
               <label className="font-mono text-xs uppercase font-bold text-gray-500">Estimativa de Orçamento (AKZ)</label>
               <div className="flex gap-4 overflow-x-auto pb-2">
                 {['< 500k', '500k - 2M', '2M - 5M', '> 5M'].map(budget => (
                   <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({...formData, budget})}
                    className={`whitespace-nowrap px-4 py-2 border-b-2 font-bold text-sm transition-colors ${formData.budget === budget ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-gray-300 text-gray-400 hover:text-black'}`}
                   >
                     {budget}
                   </button>
                 ))}
               </div>
            </div>

            <div className="flex justify-end pt-4">
              <BrutalButton 
                onClick={() => {
                  setFormData(prev => ({...prev, type: prev.type || 'other'}));
                  setStep(2);
                }} 
                icon={ArrowRight}
              >
                Próximo
              </BrutalButton>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <BrutalInput 
                id="name" 
                label="Nome / Empresa" 
                placeholder="Ex: João Silva" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <BrutalInput 
                id="email" 
                label="Email Corporativo" 
                type="email" 
                placeholder="joao@empresa.ao"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase font-bold tracking-wider text-gray-500">Descrição do Desafio</label>
              <BrutalInput
                id="message"
                label=""
                placeholder="Preciso de um sistema que..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                multiline={true}
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-500 font-bold text-sm hover:text-black underline underline-offset-4"
              >
                Voltar
              </button>
              <BrutalButton 
                type="submit" 
                variant="primary" 
                icon={isSubmitting ? undefined : Send}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'A Enviar...' : 'Enviar Proposta'}
              </BrutalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
